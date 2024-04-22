import {
  AppstoreAddOutlined,
  FileDoneOutlined,
  CalendarOutlined,
  ContainerOutlined,
  UsergroupDeleteOutlined,
  CarryOutOutlined,
  FileTextOutlined,
  BarsOutlined,
  PictureOutlined,
  ScheduleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Spin } from "antd";
import { useGetAllUsersQuery } from "../../../redux/api/userApi";
import { useGetReportsQuery } from "../../../redux/api/reportApi";
import { useGetItemQuery } from "../../../redux/api/itemApi";
import { useGetEventsQuery } from "../../../redux/api/eventApi";

export default function DashboardContent() {
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: reportsData, isLoading: reportsLoading } = useGetReportsQuery();
  const { data: itemsData, isLoading: itemsLoading } = useGetItemQuery();
  const { data: eventsData, isLoading: eventLoading } = useGetEventsQuery();

  if (usersLoading || reportsLoading || itemsLoading || eventLoading) {
    return <Spin size="large" className="flex justify-center items-center" />;
  }

  const countByRole = (role) => usersData.data.reduce((count, user) => count + (user.role === role ? 1 : 0), 0);

  const uniqueLocationsInMalang = reportsData.data
    .filter((report) => report.location.toLowerCase() === "malang")
    .map((report) => report.location)
    .filter((value, index, self) => self.indexOf(value) === index);
  const totalUniqueLocationsInMalang = uniqueLocationsInMalang.length;

  const calculateTotalForEachItem = (itemsData) => {
    const totals = {
      Kaos: 0,
      Totebag: 0,
      Bottle: 0,
      Cutlery: 0,
    };
    itemsData.data.forEach((item) => {
      switch (item.name.toLowerCase()) {
        case "t-shirt":
          totals.Kaos += item.total;
          break;
        case "totebag":
          totals.Totebag += item.total;
          break;
        case "bottle":
          totals.Bottle += item.total;
          break;
        case "cutlery":
          totals.Cutlery += item.total;
          break;
        default:
          break;
      }
    });
    return totals;
  };
  const itemsTotals = calculateTotalForEachItem(itemsData);

  const calculateTotalEventsPerDay = (eventsData) => {
    if (!eventsData?.data || !Array.isArray(eventsData.data)) {
      return "";
    }
    const eventCountsPerDay = {};
    eventsData.data.forEach((event) => {
      if (event?.created_at) {
        const eventDay = new Date(event.created_at).toLocaleDateString();
        eventCountsPerDay[eventDay] = (eventCountsPerDay[eventDay] || 0) + 1;
      }
    });
    const filteredEventCountsPerDay = Object.fromEntries(Object.entries(eventCountsPerDay).filter(([count]) => count > 0));
    const resultString = Object.entries(filteredEventCountsPerDay)
      .map(([date, count]) => `${date}: ${count}`)
      .join(", ");
    return resultString;
  };
  const totalEventsPerDay = calculateTotalEventsPerDay(eventsData);

  const calculateTotalReportsPerDay = (reportsData) => {
    if (!reportsData?.data || !Array.isArray(reportsData.data)) {
      return "";
    }
    const reportCountsPerDay = {};
    reportsData.data.forEach((report) => {
      if (report?.created_at) {
        const reportDay = new Date(report.created_at).toLocaleDateString();
        reportCountsPerDay[reportDay] = (reportCountsPerDay[reportDay] || 0) + 1;
      }
    });
    const filteredReportCountsPerDay = Object.fromEntries(Object.entries(reportCountsPerDay).filter(([count]) => count > 0));
    const resultString = Object.entries(filteredReportCountsPerDay)
      .map(([date, count]) => `${date}: ${count}`)
      .join(", ");
    return resultString;
  };

  const totalReportsPerDay = calculateTotalReportsPerDay(reportsData);

  const renderStatisticCard = (title, value, prefix, suffix) => (
    <Col xs={24} sm={12} md={6} lg={6}>
      <Card bordered={false} className="hover:shadow-md transition-transform transform-gpu hover:translate-y-1 hover:bg-slate-50">
        <Statistic title={title} value={value} prefix={prefix} suffix={suffix} />
      </Card>
    </Col>
  );

  return (
    <>
      <p className="font-bold text-3xl text-textColor mt-3 mb-10">Dashboard Admin Smart Recycling</p>

      <p className="font-semibold text-xl text-textColor mb-2">Overview Users Data</p>
      <Card bordered={true}>
        <Row gutter={[16, 16]}>
          {renderStatisticCard("Total Records", usersData.data.length, <UsergroupDeleteOutlined />, "records")}
          {renderStatisticCard("Total Users", countByRole("USER"), <UsergroupDeleteOutlined />, "users")}
          {renderStatisticCard("Total Pengepul", countByRole("PENGEPUL"), <UsergroupDeleteOutlined />, "pengepul")}
          {renderStatisticCard("Total Admin", countByRole("ADMIN"), <UsergroupDeleteOutlined />, "admin")}
        </Row>
      </Card>

      <p className="font-semibold text-xl text-textColor my-2">Overview Reports Data</p>
      <Card bordered={true}>
        <Row gutter={[16, 16]}>
          {renderStatisticCard("Total Reports", reportsData.data.length, <CarryOutOutlined />, "reports")}
          {renderStatisticCard("Total Location In Malang", totalUniqueLocationsInMalang, <PictureOutlined />, "on Malang")}
          {renderStatisticCard("Total Location In Malang", totalReportsPerDay, <CalendarOutlined />, "per day")}
          {renderStatisticCard("Total Location In Malang", totalUniqueLocationsInMalang, <PictureOutlined />, "on Malang")}
        </Row>
      </Card>

      <p className="font-semibold text-xl text-textColor my-2">Overview Events Data</p>
      <Card bordered={true}>
        <Row gutter={[16, 16]}>
          {renderStatisticCard("Total Events", eventsData.data.length, <FileTextOutlined />, "events")}
          {renderStatisticCard("Total Events", totalEventsPerDay, <CalendarOutlined />, "per day")}
          {renderStatisticCard("Total Events", totalEventsPerDay, <ScheduleOutlined />, "latest")}
          {renderStatisticCard("Total Events", totalEventsPerDay, <ScheduleOutlined />, "latest")}
        </Row>
      </Card>

      <p className="font-semibold text-xl text-textColor my-2">Overview Items Data</p>
      <Card bordered={true}>
        <Row gutter={[16, 16]}>
          {renderStatisticCard("Total Items", itemsData.data.length, <BarsOutlined />, "items")}
          {renderStatisticCard("Total T-Shirt", itemsTotals.Kaos, <FileDoneOutlined />, "T-Shirts")}
          {renderStatisticCard("Total Totebag", itemsTotals.Totebag, <ContainerOutlined />, "Totebags")}
          {renderStatisticCard("Total Bottle", itemsTotals.Bottle, <AppstoreAddOutlined />, "Bottles")}
          {renderStatisticCard("Total Cutlery", itemsTotals.Cutlery, <CheckCircleOutlined />, "Cutleries")}
        </Row>
      </Card>
    </>
  );
}
