import { Card, Table } from "antd";
import PropTypes from "prop-types";
import formatDate from "../../../../components/utils/formatDate";

const PaymentAdmin = ({ paymentData }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Payment Method ID",
      dataIndex: "payment_method_id",
      key: "payment_method_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <span>{formatDate(record.created_at)}</span>,
    },
    {
      title: "Items ID",
      dataIndex: "items_id",
      key: "items_id",
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "Method Type",
      dataIndex: "method_type",
      key: "method_type",
    },
    {
      title: "Card Number",
      dataIndex: "card_number",
      key: "card_number",
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (text, record) => <span>{formatDate(record.expiration_date)}</span>,
    },
    {
      title: "CVV",
      dataIndex: "cvv",
      key: "cvv",
    },
  ];

  const data = Array.isArray(paymentData.data) ? paymentData.data.map((item) => ({ ...item, key: item.id })) : [];

  return (
    <Card className="my-5">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

PaymentAdmin.propTypes = {
  paymentData: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        transaction_id: PropTypes.number.isRequired,
        payment_method_id: PropTypes.number.isRequired,
        amount: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        items_id: PropTypes.number.isRequired,
        user_id: PropTypes.string.isRequired,
        method_type: PropTypes.string.isRequired,
        card_number: PropTypes.string.isRequired,
        expiration_date: PropTypes.string.isRequired,
        cvv: PropTypes.string.isRequired,
      })
    ),
    PropTypes.object,
  ]).isRequired,
};

export default PaymentAdmin;
