"use client";

import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import { Col, Row, FloatButton } from "antd";
import { BsAndroid } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function MobilePage() {
  return (
    <>
      <NavbarComponent />
      <Row className="container mx-auto mt-20 mb-10" align="middle" justify={"center"}>
        <Col span={14}>
          <div className="font-extrabold text-primary xl:text-start lg:text-start md:text-start sm:text-center max-[640px]:text-center xl:text-5xl lg:text-3xl md:text-3xl sm:text-5xl max-[640px]:text-4xl">Integrated Apps System</div>
          <div className="font-normal xl:text-xl lg:text-xl md:text-xl sm:text-base max-[640px]:text-lg text-textColor mt-10">
            The Smart Recycling app is designed to offer practical and innovative solutions for promoting a sustainable environment. A User-friendly interface and a wide range of services make waste management easy and convenient. Users can
            actively participate in waste reduction and proper disposal efforts, leading to a healthier and sustainable environment.
          </div>

          <Link to={"#"}>
            <button className="my-5 flex gap-2 justify-center items-center rounded-full bg-primary px-7 py-3 text-white font-medium text-base hover:bg-green-500">
              PlayStore <BsAndroid size={20} />
            </button>
          </Link>
        </Col>
        <div span={12}>
          <img src="/mobile.png" />
        </div>
      </Row>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
