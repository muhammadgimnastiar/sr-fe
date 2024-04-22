import { Tabs, Table, Spin, Form, Input, Button, message } from "antd";
import { useGetEventsQuery, usePostEventsMutation } from "../../../redux/api/eventApi";
import { useGetUserQuery } from "../../../redux/api/userApi";
import formatDate from "../../../components/utils/formatDate";
import PropTypes from "prop-types";

const ManageEventsContent = () => {
  const { data: eventData, isLoading: eventLoading } = useGetEventsQuery();
  const { data: userData, isLoading: userLoading } = useGetUserQuery();
  const [postEvent] = usePostEventsMutation();

  const eventsLoading = eventLoading;

  if (eventsLoading || userLoading) {
    return <Spin size="large" className="flex justify-center items-center" />;
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["lg"],
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      responsive: ["xs", "sm"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["xs", "sm", "lg"],
    },
    {
      title: "Path Image",
      dataIndex: "path_image",
      key: "path_image",
      responsive: ["lg"],
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      responsive: ["lg"],
      render: (created_at) => formatDate(created_at),
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
      responsive: ["lg"],
    },
  ];
  return (
    <>
      <p className="font-bold text-3xl text-textColor mt-3 mb-10">Manage Events</p>
      <Tabs defaultActiveKey="1" onChange={(key) => handleTabChange(key)} indicator={{ size: (origin) => origin - 16 }}>
        <Tabs.Item key="1" tab="All Events">
          <Spin spinning={eventsLoading}>
            <Table columns={columns} dataSource={eventData ? eventData.data[0].flatMap((item) => ({ ...item, key: item.id })) : []} />
          </Spin>
        </Tabs.Item>
        <Tabs.Item key="2" tab="Input Events">
          <EventForm postEvent={postEvent} userData={userData} />
        </Tabs.Item>
      </Tabs>
    </>
  );
};

const EventForm = ({ postEvent, userData }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      console.log(values);
      console.log(userData?.user?.uuid);
      const result = await postEvent({ ...values, user_id: userData?.user?.uuid });
      console.log(result);
      if (result.data) {
        message.success("Event submitted successfully");
        form.resetFields();
      } else {
        message.error("Failed to submit event");
      }
    } catch (error) {
      console.error("Error posting event:", error);
      message.error("Failed to submit event");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the event title" }]}>
        <Input placeholder="Enter the event title" />
      </Form.Item>
      <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter the event description" }]}>
        <Input.TextArea placeholder="Enter the event description" />
      </Form.Item>
      <Form.Item label="Path Image" name="path_image" rules={[{ required: true, message: "Please enter the path to the event image" }]}>
        <Input placeholder="Enter the path to the event image" />
      </Form.Item>
      <Form.Item>
        <Button className="bg-primary text-white" type="text" htmlType="submit">
          Submit Event
        </Button>
      </Form.Item>
    </Form>
  );
};

EventForm.propTypes = {
  postEvent: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default ManageEventsContent;
