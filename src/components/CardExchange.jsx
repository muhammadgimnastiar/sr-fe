import { useEffect, useState } from "react";
import { List, Modal, Spin, Button, Card, notification } from "antd";
import { useGetItemQuery } from "../redux/api/itemApi";
import { useGetUserQuery } from "../redux/api/userApi";
import { usePostExchangeByIdMutation } from "../redux/api/exchangeApi";

export default function CardExchange() {
  const { data: useItem, isError, isLoading } = useGetItemQuery();
  const { data: userData } = useGetUserQuery();
  const [postExchangeMutation] = usePostExchangeByIdMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

  useEffect(() => {
    console.log(useItem);
  });

  if (isLoading) {
    return <Spin size="large" className="flex justify-center items-center" />;
  }

  if (isError) {
    return <div>Error loading exchange data</div>;
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleExchange = async (selectedItem) => {
    const user_id = userData.user.uuid;

    Modal.confirm({
      title: "Confirm Exchange",
      content: `Are you sure you want to exchange ${selectedItem.name}?`,
      okText: "OK",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "#00AF5C", borderColor: "#52c41a", color: "#fffff" },
      },
      async onOk() {
        try {
          const data = {
            items_id: selectedItem.id,
            user_id: user_id,
          };

          console.log(data);

          const res = await postExchangeMutation({ data }).unwrap();
          console.log(res);

          notification.success({ message: "Exchange successful!" });
          closeModal();
        } catch (error) {
          console.log(error);
          notification.error({ message: "Exchange failed!" });
        }
      },
      onCancel() {
        console.log("Exchange canceled");
      },
    });
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
          pageSize: 2,
        }}
        className="mb-5 container mx-auto"
        dataSource={useItem.data}
        renderItem={(item) => (
          <List.Item key={item.id} onClick={() => handleItemClick(item)}>
            <div className="flex flex-row gap-5 items-center cursor-pointer" onClick={() => handleItemClick(item)}>
              <img className="sm:w-40 md:w-56 lg:w-64 xl:w-1/3 max-[640px]:w-32 rounded-xl" src={`/exchange-${item.id}.png`} alt={item.name} />
              <Card className="text-textColor font-medium w-full hover:shadow-md transition-transform transform-gpu hover:translate-y-1">
                <p className="text-2xl">{item.name}</p>
                <p className="text-base mt-4">{`Points: ${item.points}`}</p>
                <p className="text-base">{`Total: ${item.total}`}</p>
              </Card>
            </div>
          </List.Item>
        )}
      />

      <Modal
        title={<div className="text-textColor text-2xl font-bold mb-5">{selectedItem ? selectedItem.name : ""}</div>}
        open={modalOpen}
        onCancel={closeModal}
        footer={[
          <>
            <Button className="gap-5" color="primary" key="close" onClick={closeModal}>
              Close
            </Button>
            <Button className="" color="primary" key="exchange" onClick={() => handleExchange(selectedItem)}>
              Exchange Now
            </Button>
          </>,
        ]}
      >
        {selectedItem && (
          <>
            <img className="rounded-xl" src={`/exchange-${selectedItem.id}.png`} alt={selectedItem.name} />
            <p className="text-textColor text-lg font-medium mt-5">{`Points: ${selectedItem.points}`}</p>
            <p className="text-textColor text-lg font-medium">{`Total: ${selectedItem.total}`}</p>
          </>
        )}
      </Modal>
    </>
  );
}
