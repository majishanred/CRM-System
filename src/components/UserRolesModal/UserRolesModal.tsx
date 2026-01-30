import { Button, Modal, Select, Tooltip, Typography } from 'antd';
import { Roles, type User } from '../../types/admin.ts';

type Props = {
  chosenUser: User;
  setChosenUser: (user: User | null) => void;
  onOk: () => Promise<void>;
};

export const UserRolesModal = ({ chosenUser, setChosenUser, onOk }: Props) => {
  return (
    <Modal
      open={!!chosenUser}
      onCancel={() => setChosenUser(null)}
      footer={[
        <Tooltip
          title={chosenUser.roles.length < 1 && 'У пользователя должна быть минимум одна роль'}
        >
          <Button key="submit" type="primary" disabled={chosenUser.roles.length < 1} onClick={onOk}>
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
        options={Object.values(Roles).map(value => {
          return {
            value: value,
            label: value,
          };
        })}
        style={{ width: '100%' }}
        onChange={(value: Roles[]) => setChosenUser({ ...chosenUser, roles: value })}
      />
    </Modal>
  );
};
