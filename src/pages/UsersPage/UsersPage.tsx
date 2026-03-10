import { type ChangeEvent, useEffect, useState } from 'react';
import { type User, type UserFilters } from '../../types/admin.ts';
import {
  Button,
  Flex,
  Input,
  List,
  Modal,
  Space,
  Table,
  type TableColumnType,
  type TablePaginationConfig,
  Tag,
  Typography,
} from 'antd';
import { NavLink } from 'react-router';
import { useNotification } from '../../hooks/useNotification.ts';
import type { FilterValue, SorterResult, SortOrder } from 'antd/es/table/interface';
import { FilterFilled } from '@ant-design/icons';
import Dropdown from 'antd/es/dropdown/dropdown';
import { useSelector } from 'react-redux';
import {
  blockUserSelector,
  changeUserRightsSelector,
  deleteUserSelector,
  getUsersSelector,
  unblockUserSelector,
} from '../../store/api/selectors/admin.ts';
import { useAppDispatch } from '../../store/rootStore.ts';
import {
  blockUserAction,
  changeUserRightsAction,
  deleteUserAction,
  getUsersAction,
  unblockUserAction,
} from '../../store/admin/actions.ts';
import { UserRolesModal } from '../../components/UserRolesModal/UserRolesModal.tsx';

const PAGINATION_CAPACITY = 20;

const sortingOrderFormatter = (order: SortOrder | undefined): 'asc' | 'desc' | undefined => {
  switch (order) {
    case 'ascend':
      return 'asc';
    case 'descend':
      return 'desc';
    case null:
    case undefined:
      return undefined;
  }
};

export const UsersPage = () => {
  const { data: usersData, error: getUsersError } = useSelector(getUsersSelector);
  const { error: deleteUserError } = useSelector(deleteUserSelector);
  const { error: changeUserRightsError } = useSelector(changeUserRightsSelector);
  const { error: blockUserError } = useSelector(blockUserSelector);
  const { error: unblockUserError } = useSelector(unblockUserSelector);

  const dispatch = useAppDispatch();

  const notificationApi = useNotification();

  const [filters, setFilters] = useState<UserFilters>(() => {
    return { page: 0, limit: PAGINATION_CAPACITY };
  });

  const [modal, contextHolder] = Modal.useModal();

  const [chosenUser, setChosenUser] = useState<User | null>(null);

  const handleSearchUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(() => {
      return { ...filters, page: 0, search: e.target.value };
    });
  };

  const updateUsers = async () => {
    await dispatch(getUsersAction(filters));
  };

  useEffect(() => {
    [
      getUsersError,
      unblockUserError,
      changeUserRightsError,
      blockUserError,
      deleteUserError,
    ].forEach(error => {
      if (!error) return;
      notificationApi.error({
        title: 'Ошибка',
        description: 'Попробуйте позже',
        placement: 'bottomRight',
      });
    });
  }, [getUsersError, unblockUserError, changeUserRightsError, blockUserError, deleteUserError]);

  const colDefs: TableColumnType<User>[] = [
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Дата регистрации',
      dataIndex: 'date',
      render: (_, user) => <>{new Date(user.date).toLocaleDateString()}</>,
    },
    {
      title: 'Статус блокировки',
      dataIndex: 'isBlocked',
      render: (_, user) => {
        return user.isBlocked ? 'Заблокирован' : 'Не заблокирован';
      },
    },
    {
      title: 'Роли',
      render: (_, user) => {
        return (
          <List itemLayout="horizontal">
            {user.roles.map(role => (
              <List.Item>
                <Tag>{role}</Tag>
              </List.Item>
            ))}
          </List>
        );
      },
      dataIndex: 'roles',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, user) => {
        const handleDeleteUser = async () => {
          await modal.confirm({
            title: 'Ожидание подтверждения',
            content: (
              <>
                <Typography.Paragraph>
                  Вы уверены, что хотите удалить пользователя?
                </Typography.Paragraph>
              </>
            ),
          });

          await dispatch(deleteUserAction(user.id));
          await updateUsers();
        };

        const handleChooseUser = async () => {
          setChosenUser(user);
        };

        const handleBlockUser = async () => {
          await modal.confirm({
            title: 'Ожидание подтверждения',
            content: (
              <>
                <Typography.Paragraph>
                  Вы уверены, что хотите {user.isBlocked ? 'разблокировать' : 'заблокирвать'}{' '}
                  пользователя?
                </Typography.Paragraph>
              </>
            ),
          });

          if (user.isBlocked) {
            await dispatch(unblockUserAction(user.id));
          } else {
            await dispatch(blockUserAction(user.id));
          }

          await updateUsers();
        };

        return (
          <List itemLayout="vertical">
            <List.Item>
              <NavLink to={`/admin/user/${user.id}`}>
                <Button type="text">Перейти к профилю</Button>
              </NavLink>
            </List.Item>
            <List.Item>
              <Button type="text" onClick={handleDeleteUser}>
                Удалить пользователя
              </Button>
            </List.Item>
            <List.Item>
              <Button type="text" onClick={handleChooseUser}>
                Управление ролями пользователя
              </Button>
            </List.Item>
            <List.Item>
              <Button type="text" onClick={handleBlockUser}>
                {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
              </Button>
            </List.Item>
          </List>
        );
      },
    },
  ];

  const handleTableStateChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
    extra: { action: string }
  ) => {
    // NOTE: в случае, когда у таблицы включен только один сортер надо сузить тип данных
    if (Array.isArray(sorter)) return;
    setFilters(staleFilters => {
      return {
        ...staleFilters,
        page: (pagination.current || 1) - 1,
        sortOrder: sortingOrderFormatter(sorter.order),
        sortBy: sorter.field?.toString(),
      };
    });

    if (extra.action === 'sort') {
      setFilters(staleFilters => {
        return {
          ...staleFilters,
          page: 0,
        };
      });
    }
  };

  const handleIsBlockedStatusChange = (value: boolean | undefined) => {
    setFilters(staleFilters => {
      return {
        ...staleFilters,
        isBlocked: value,
      };
    });
  };

  const handleUserRolesUpdate = async () => {
    if (!chosenUser) return;

    await dispatch(
      changeUserRightsAction({
        userId: chosenUser.id,
        userRolesData: { roles: chosenUser.roles },
      })
    );

    setChosenUser(null);

    await updateUsers();
  };

  useEffect(() => {
    updateUsers();
  }, [filters]);

  return (
    <>
      <Flex orientation="vertical" style={{ padding: '24px' }} gap={16}>
        <Flex orientation="horizontal" gap={8} align="center">
          <Typography.Title level={2}>Пользователи</Typography.Title>
          <Input
            value={filters.search}
            styles={{ input: { width: '256px', marginLeft: 'auto' } }}
            onChange={handleSearchUpdate}
            placeholder="Поиск по имени или email"
            width="256px"
            size="middle"
          />
          <Dropdown
            styles={{ root: { width: '256px' } }}
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: '0',
                  label: 'Все',
                  onClick: () => handleIsBlockedStatusChange(undefined),
                },
                {
                  key: '1',
                  label: 'Заблокированные',
                  onClick: () => handleIsBlockedStatusChange(true),
                },
                {
                  key: '2',
                  label: 'Незаблокированные',
                  onClick: () => handleIsBlockedStatusChange(false),
                },
              ],
              selectable: true,
              defaultSelectedKeys: ['0'],
            }}
          >
            <Button>
              <Space>
                <FilterFilled />
                Фильтры
              </Space>
            </Button>
          </Dropdown>
        </Flex>
        <Table
          dataSource={usersData?.data}
          pagination={
            Number(usersData?.meta.totalAmount) < 20
              ? false
              : {
                  align: 'end',
                  current: (filters.page || 0) + 1,
                  total: usersData?.meta.totalAmount,
                  pageSize: PAGINATION_CAPACITY,
                  showSizeChanger: false,
                }
          }
          columns={colDefs}
          onChange={handleTableStateChange}
        />
      </Flex>
      {contextHolder}
      {chosenUser && (
        <UserRolesModal
          chosenUser={chosenUser}
          setChosenUser={setChosenUser}
          onSubmit={handleUserRolesUpdate}
        />
      )}
    </>
  );
};
