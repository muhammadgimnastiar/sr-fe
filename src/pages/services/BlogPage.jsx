"use client";

import { useState } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import CardBlog from "../../components/CardBlog";
import CardEvent from "../../components/CardEvent";
import { Card, FloatButton } from "antd";

const tabListNoTitle = [
  {
    key: "blog",
    label: "Blogs",
  },
  {
    key: "event",
    label: "Events",
  },
];

const contentListNoTitle = {
  blog: <CardBlog />,
  event: <CardEvent />,
};

export default function BlogPage() {
  const [activeTabKey, setActiveTabKey] = useState("blog");
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };
  return (
    <>
      <NavbarComponent />

      <div className="container mt-20 mb-10 mx-auto">
        <p className="font-extrabold text-6xl text-center text-primary max-[640px]:text-4xl">Blogs and Events</p>
        <p className="font-normal text-center mt-5 text-gray-500 text-xl max-[640px]:text-lg">Here at Smart Recycling a collection of the latest news from us.</p>
      </div>
      <div className="container mx-auto py-5 px-5 flex justify-evenly">
        <Card
          style={{
            width: "100%",
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: "middle",
          }}
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
      </div>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
