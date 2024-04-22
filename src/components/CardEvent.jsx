import React from "react";
import { Avatar, List, Space, Card } from "antd";
import PropTypes from "prop-types";
import { useGetEventsQuery } from "../redux/api/eventApi";
import formatDate from "./utils/formatDate";

export default function CardEvent() {
  const { data: eventData } = useGetEventsQuery();

  const validEvents = eventData?.data[0] || [];

  console.log(validEvents);

  const data = validEvents.map((item, i) => ({
    id: item.id,
    href: `event/${item.id}`,
    title: item.title,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description: item.description,
    content: item.description,
    image: item.path_image,
    created_at: item.created_at,
  }));

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  IconText.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    text: PropTypes.string.isRequired,
  };

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <a className="font-semibold text-lg" href={item.href}>
                  {item.title}
                </a>
              }
            />
            <Card className="hover:shadow-md transition-transform transform-gpu hover:translate-y-1">
              <img src={item.image} alt="Event Image" className="container mb-5 rounded-xl" style={{ maxWidth: "100%" }} />
              <p className="font-medium text-base text-textColor mb-5">{item.content}</p>
              <p className="font-bold text-base text-textColor">Tanggal dan Waktu: {formatDate(item.created_at)}</p>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}
