import { Col, Row, Card } from "antd";
const { Meta } = Card;

export default function CardTeamMobile() {
  return (
    <>
      <Row justify={"center"} className="my-5 container mx-auto px-5 text-center">
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2 pb-5">
          <Card hoverable cover={<img alt="profile" src="/team/mobile1.jpeg" />}>
            <Meta title="Aldio Yohanes" description="Hacker" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2 pb-5">
          <Card hoverable cover={<img alt="profile" src="/team/default.png" />}>
            <Meta title="Cakra Wira Bumi Putra" description="Hacker / Scrum Master" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2 pb-5">
          <Card hoverable cover={<img alt="profile" src="/team/default.png" />}>
            <Meta title="Choirul Huda" description="Hacker" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2 pb-5">
          <Card hoverable cover={<img alt="profile" src="/team/default.png" />}>
            <Meta title="Cindy Putri Az Zahra" description="Hipster" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2 pb-5">
          <Card hoverable cover={<img alt="profile" src="/team/default.png" />}>
            <Meta title="Raihanah Tsabitah" description="Hipster" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4} className="pr-2">
          <Card hoverable cover={<img alt="profile" src="/team/default.png" />}>
            <Meta title="Raden Ayu Alfirah Aliyah" description="Hipster" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
