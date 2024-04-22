import { Space, Table, Modal, Button, Form, Input, Spin, message, Select } from "antd";
const { Option } = Select;
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import formatDate from "../../../components/utils/formatDate";
import { useGetAllUsersQuery, useChangeRoleUserMutation, useInputPointsMutation } from "../../../redux/api/userApi";

export default function ManageUsersContent() {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pointsForm] = Form.useForm();
  const [changeRole] = useChangeRoleUserMutation();
  const [inputPoints] = useInputPointsMutation();

  const roles = ["ADMIN", "USER", "PENGEPUL"];

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdatePoints = async () => {
    try {
      await pointsForm.validateFields();
      Modal.confirm({
        title: `Update Points for ${selectedUser.name}`,
        content: "Are you sure you want to update points?",
        okButtonProps: { style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } },
        onOk: async () => {
          const values = pointsForm.getFieldsValue();
          console.log({
            uuid: selectedUser.id,
            points: values.points,
          });
          await inputPoints({
            uuid: selectedUser.id,
            points: values.points,
          });
          setIsModalVisible(false);
          message.success("Points updated successfully");
        },
      });
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  const handleUpdateRole = async () => {
    try {
      await form.validateFields();
      Modal.confirm({
        title: `Update Role for ${selectedUser.name}`,
        content: "Are you sure you want to update the role?",
        okButtonProps: { style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } },
        onOk: async () => {
          const values = form.getFieldsValue();
          console.log({
            uuid: selectedUser.id,
            newRole: values.role,
          });
          await changeRole({
            uuid: selectedUser.id,
            role: values.role,
          });
          setIsModalVisible(false);
          message.success("Role updated successfully");
        },
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      responsive: ["sm", "md", "lg"],
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      responsive: ["xl"],
      render: (created_at) => formatDate(created_at),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      responsive: ["xl"],
      render: (updated_at) => formatDate(updated_at),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <UnorderedListOutlined onClick={() => showModal(record)} style={{ color: "#1890ff" }} />
        </Space>
      ),
      responsive: ["xs", "sm"],
    },
  ];

  return (
    <>
      {usersLoading ? (
        <Spin size="large" className="flex justify-center" />
      ) : (
        <>
          <p className="font-bold text-3xl text-textColor mt-3 mb-10">Manage Users</p>
          <Table
            columns={columns.map((column) => ({
              ...column,
              key: column.dataIndex,
            }))}
            dataSource={usersData ? usersData.data.map((user) => ({ ...user, key: user.id })) : []}
          />

          <Modal
            title={`Edit User: ${selectedUser?.name}`}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button className="bg-blue-500" key="delete" type="primary" onClick={handleUpdatePoints}>
                Update Points
              </Button>,
              <Button className="bg-blue-500" key="update" type="primary" onClick={handleUpdateRole}>
                Update Role
              </Button>,
            ]}
          >
            <Form form={form} name="editUserForm">
              <Form.Item label="Name" name="name">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Role" name="role">
                <Select>
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>

            <Form form={pointsForm} name="updatePointsForm">
              <Form.Item label="Points" name="points" rules={[{ required: true, message: "Please input points!" }]}>
                <Input type="number" />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}
