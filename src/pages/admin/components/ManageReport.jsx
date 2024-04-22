import { Table, Spin, Button, Flex } from "antd";
import { useGetReportsQuery } from "../../../redux/api/reportApi";
import formatDate from "../../../components/utils/formatDate";
import * as XLSX from "xlsx"; // Import for Excel generation

const ManageReportsContent = () => {
  const { data: reportData, isLoading: reportLoading } = useGetReportsQuery();
  console.log(reportData);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      responsive: ["lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["xs", "sm"],
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      responsive: ["xs", "sm", "lg"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData?.data || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "reports.xlsx");
  };

  return (
    <>
      <div className="">
        <p className="font-bold text-3xl text-textColor mt-3 mb-10">
          Manage Reports
        </p>
        <Flex justify="flex-end" align="center">
          <Button
            type="button"
            className=" mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-primary rounded-lg border border-primary hover:bg-green-700 hover:text-white focus:ring-4 focus:ring-gray-200"
            onClick={downloadExcel}
          >
            Download as Excel
          </Button>
        </Flex>
        <Spin spinning={reportLoading}>
          <Table
            columns={columns.map((column) => ({
              ...column,
              key: column.dataIndex,
            }))}
            dataSource={
              reportData
                ? reportData.data
                    .flat()
                    .map((item) => ({ ...item, key: item.id }))
                : []
            }
          />
        </Spin>
      </div>
    </>
  );
};

export default ManageReportsContent;
