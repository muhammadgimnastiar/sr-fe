import { Card, Table } from "antd";
import PropTypes from "prop-types";
import formatDate from "../../../../components/utils/formatDate";

const TransactionAdmin = ({ transactionData }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <span>{formatDate(record.created_at)}</span>,
    },
  ];

  const data = Array.isArray(transactionData?.data) ? transactionData.data.map((item) => ({ ...item, key: item.id })) : [];

  return (
    <Card className="my-5">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

TransactionAdmin.propTypes = {
  transactionData: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        points: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default TransactionAdmin;
