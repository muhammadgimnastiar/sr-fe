import { Table, Spin, Button, Modal } from "antd";
import {
  useGetExchangeQuery,
  useDeleteExchangeMutation,
} from "../../../redux/api/exchangeApi";
import formatDate from "../../../components/utils/formatDate";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ManageExchangeContent = () => {
  const { data: exchangeData, isLoading: exchangeLoading } =
    useGetExchangeQuery();
  const [deleteExchange] = useDeleteExchangeMutation(); // Menggunakan fungsi deleteExchangeMutation

  console.log(exchangeData);

  const getItemName = (itemId) => {
    const itemMappings = {
      1: "T-Shirt",
      2: "Totebag",
      3: "Bottle",
      4: "Cutlery",
    };

    return itemMappings[itemId] || "Unknown Item";
  };

  const handleDelete = async (record) => {
    console.log("Deleting exchange:", record.id);

    confirm({
      title: "Delete Confirmation",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete ${getItemName(
        record.items_id
      )}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await deleteExchange(record.id);
          if (response.error) {
            console.error("Error deleting exchange:", response.error);
          } else {
            console.log("Exchange deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting exchange:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["lg"],
    },
    {
      title: "Item",
      dataIndex: "items_id",
      key: "items_id",
      render: (itemsId) => getItemName(itemsId),
      responsive: ["xs", "sm"],
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
      responsive: ["xs", "sm", "lg"],
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
  return (
    <div className="">
      <p className="font-bold text-3xl text-textColor mt-3 mb-10">
        Manage Exchanges
      </p>
      <Spin spinning={exchangeLoading}>
        <Table
          columns={columns}
          dataSource={
            exchangeData
              ? exchangeData.data.map((item) => ({ ...item, key: item.id }))
              : []
          }
        />
      </Spin>
    </div>
  );
};

export default ManageExchangeContent;
