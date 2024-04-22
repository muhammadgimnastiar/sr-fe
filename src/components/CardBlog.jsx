import React from "react";
import { Avatar, List, Space, Card } from "antd";
const { Meta } = Card;
import PropTypes from "prop-types";

export default function CardBlog() {
  const data = [
    {
      id: 1,
      title: "Kota Ramah Lingkungan",
      description: "Inisiatif dan Kerjasama Masyarakat, Pemerintah, dan Industri untuk Mewujudkan Kota Bersih dan Sehat",
      coverImage: "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/radarmalang/2023/05/ONLINE-Sampah-Suharto-Copy.jpg",
      avatarImage: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    },
    {
      id: 2,
      title: "Aksi Gotong Royong Masyarakat",
      description: "Peran Aktif Warga Malang dalam Menciptakan Kota Sehat dan Ramah Lingkungan",
      coverImage: "https://asset-2.tstatic.net/suryamalang/foto/bank/images/tumpukan-sampah-yang-berada-di-jalan-muharto-kota-malang.jpg",
      avatarImage: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    },
    {
      id: 3,
      title: "Program Inovatif Pemerintah",
      description: "Sampah Tanpa Tumpukan dan Langkah-Langkah Holistik Menuju Kota Hijau",
      coverImage: "https://static.gatra.com/foldershared/images/2019/fatikhin/11-Nov/IMG_20191102_183308.jpg",
      avatarImage: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=3",
    },
    {
      id: 4,
      title: "Kesadaran Lingkungan di Malang",
      description: "Edukasi Sosial dan Potensi Ekonomi dari Pengelolaan Sampah yang Bijak",
      coverImage: "https://static.republika.co.id/uploads/images/inpicture_slide/pemerintah-kota-pemkot-malang-bersama-sejumlah-instansi-melakukan-bersih-bersih-_191227143207-599.jpg",
      avatarImage: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=4",
    },
    {
      id: 5,
      title: "Melangkah Bersama Malang",
      description: "Dari Inisiatif Gotong Royong Hingga Pembentukan Kebijakan Berkelanjutan, Masyarakat Malang Membangun Fondasi Perubahan Positif",
      coverImage: "https://asset-2.tstatic.net/jogja/foto/bank/images/rahasia-kota-malang-sukses-kelola-sampah-lewat-sistem-yang-diadopsi-dari-warga-bantul.jpg",
      avatarImage: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=5",
    },
  ];

  const cardComponents = data.map((item) => (
    <Card
      className="flex flex-col items-center justify-center justify-items-center justify-self-center hover:shadow-md transition-transform transform-gpu hover:translate-y-1"
      key={item.id}
      cover={<img className="rounded-xl" alt="example" src={item.coverImage} />}
    >
      <Meta avatar={<Avatar src={item.avatarImage} />} title={item.title} description={item.description} />
    </Card>
  ));

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
        dataSource={cardComponents}
        renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
      />
    </>
  );
}
