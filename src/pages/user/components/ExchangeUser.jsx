import { Card, Table } from "antd";
import PropTypes from "prop-types";
import formatDate from "../../../components/utils/formatDate";

const ExchangeUser = ({ exchangeData }) => {
  const getItemNameById = (itemId) => {
    switch (itemId) {
      case 1:
        return "T-Shirt";
      case 2:
        return "Totebag";
      case 3:
        return "Bottle";
      case 4:
        return "Cutlery";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => <p>{record.key}</p>,
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      render: (text, record) => <p>{record.itemName}</p>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => <p>{formatDate(record.createdAt)}</p>,
    },
  ];

  const tableData =
    exchangeData?.data.map((exchangeItem) => ({
      key: exchangeItem.id,
      itemName: getItemNameById(exchangeItem.items_id),
      createdAt: exchangeItem.created_at,
    })) || [];

  return (
    <Card className="my-5">
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </Card>
  );
};

ExchangeUser.propTypes = {
  exchangeData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        items_id: PropTypes.number.isRequired,
        created_at: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default ExchangeUser;
