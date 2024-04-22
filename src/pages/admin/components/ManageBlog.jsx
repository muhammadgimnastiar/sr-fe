import { Tabs, Table, Spin, Form, Input, Button, message, Modal } from "antd";
import {
  useGetBlogsQuery,
  usePostBlogsMutation,
  useDeleteBlogsMutation,
} from "../../../redux/api/blogApi";
import { useGetUserQuery } from "../../../redux/api/userApi";
import formatDate from "../../../components/utils/formatDate";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";
const { confirm } = Modal;

const ManageBlogsContent = () => {
  const { data: blogData, isLoading: blogLoading } = useGetBlogsQuery();
  const { data: userData, isLoading: userLoading } = useGetUserQuery();
  const [postBlog] = usePostBlogsMutation();
  const [deleteBlog] = useDeleteBlogsMutation();
  const [messageApi, contextHolder] = message.useMessage();

  const blogsLoading = blogLoading;

  if (blogsLoading || userLoading) {
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
      responsive: ["xs", "sm", "lg"],
    },
  ];

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Blog deleted successfully",
      duration: 3,
    });
  };

  const handleDelete = async (record) => {
    console.log("Deleting blog:", record.id);

    confirm({
      title: "Delete Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await deleteBlog(record.id);
          if (response.error) {
            console.error("Error deleting blog:", response.error);
          } else {
            // message.alert("Blog submitted successfully");
            success();
            console.log("Blog deleted successfully");
            // Introduce a one-second delay using setTimeout
            setTimeout(() => {
              window.location.reload(); // Reload after delay
            }, 1000);
          }
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      },
    });
  };

  return (
    <>
      {contextHolder}
      <p className="font-bold text-3xl text-textColor mt-3 mb-10">
        Manage Blogs
      </p>

      <Tabs
        defaultActiveKey="1"
        onChange={(key) => handleTabChange(key)}
        indicator={{ size: (origin) => origin - 16 }}
      >
        <Tabs.Item key="1" tab="All Blogs">
          <Spin spinning={blogsLoading}>
            <Table
              columns={columns}
              dataSource={
                blogData
                  ? blogData.data[0].flatMap((item) => ({
                      ...item,
                      key: item.id,
                    }))
                  : []
              }
            />
          </Spin>
        </Tabs.Item>
        <Tabs.Item key="2" tab="Input Blogs">
          <BlogForm postBlog={postBlog} userData={userData} />
        </Tabs.Item>
      </Tabs>
    </>
  );
};

const BlogForm = ({ postBlog, userData }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      console.log(values);
      console.log(userData?.user?.uuid);
      const result = await postBlog({
        ...values,
        user_id: userData?.user?.uuid,
      });
      console.log(result);
      if (result.data) {
        message.success("Blog submitted successfully");
        form.resetFields();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        message.error("Failed to submit blog");
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      message.error("Failed to submit blog");
    }
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter the blog title" }]}
      >
        <Input placeholder="Enter the blog title" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please enter the blog description" },
        ]}
      >
        <Input.TextArea placeholder="Enter the blog description" />
      </Form.Item>
      <Form.Item
        label="Path Image"
        name="path_image"
        rules={[
          {
            required: true,
            message: "Please enter the path to the blog image",
          },
        ]}
      >
        <Input placeholder="Enter the path to the blog image" />
      </Form.Item>
      <Form.Item>
        <Button className="bg-primary text-white" type="text" htmlType="submit">
          Submit Blog
        </Button>
      </Form.Item>
    </Form>
  );
};

BlogForm.propTypes = {
  postBlog: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default ManageBlogsContent;
