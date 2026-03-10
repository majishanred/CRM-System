import { Button, Modal, Select, Tooltip, Typography } from 'antd';
import { Roles, type User } from '../../types/admin.ts';

type Props = {
  chosenUser: User;
  setChosenUser: (user: User | null) => void;
  onSubmit: () => Promise<void>;
};

const mappedRoles = Object.values(Roles).map(value => {
  return {
    value: value,
    label: value,
  };
});

export const UserRolesModal = ({ chosenUser, setChosenUser, onSubmit }: Props) => {
  const handleChangeRoles = (value: Roles[]): void => {
    setChosenUser({ ...chosenUser, roles: value });
  };

  return (
    <Modal
      open={!!chosenUser}
      onCancel={() => setChosenUser(null)}
      footer={[
        <Tooltip
          title={chosenUser.roles.length < 1 && 'У пользователя должна быть минимум одна роль'}
        >
          <Button
            key="submit"
            type="primary"
            disabled={chosenUser.roles.length < 1}
            onClick={onSubmit}
          >
            Ок
          </Button>
        </Tooltip>,
        <Button onClick={() => setChosenUser(null)}>Отменить</Button>,
      ]}
    >
      <Typography.Paragraph>
        Вы уверены, что хотите изменить роли пользователя?
      </Typography.Paragraph>
      <Select
        mode="multiple"
        allowClear={chosenUser.roles.length > 1}
        placeholder="Выберите роли пользователя"
        defaultValue={chosenUser.roles}
        options={mappedRoles}
        style={{ width: '100%' }}
        onChange={handleChangeRoles}
      />
    </Modal>
  );
};
