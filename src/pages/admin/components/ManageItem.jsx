import { Button, Modal, Space, Table, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { useGetItemQuery, useInputPointsMutation, useInputQuantityMutation } from "../../../redux/api/itemApi";
import formatDate from "../../../components/utils/formatDate";
import { UnorderedListOutlined } from '@ant-design/icons';


export default function ManageItemContent() {
    const { data: itemsData, isLoading: itemsLoading } = useGetItemQuery();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pointsForm] = Form.useForm();
    const [quantityForm] = Form.useForm();
    const [inputPoints] = useInputPointsMutation();
    const [inputQuantity] = useInputQuantityMutation();

    const showModal = (record) => {
        setSelectedItem(record);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleUpdatePoints = async () => {
        try {
            await pointsForm.validateFields();
            Modal.confirm({
                title: `Update Points for ${selectedItem.name}`,
                content: "Are you sure you want to update points?",
                okButtonProps: { style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } },
                onOk: async () => {
                    const values = pointsForm.getFieldsValue();
                    console.log({
                        points: values.points,
                    });
                    await inputQuantity({
                        itemId: selectedItem.id,
                        name: selectedItem.name,
                        points: values.points,
                        total: selectedItem.total,
                    });
                    setIsModalVisible(false);
                    message.success("Points updated successfully");
                },
            });
        } catch (error) {
            console.error("Error updating points:", error);
        }
    };

    const handleUpdateQuantity = async () => {
        try {
            await quantityForm.validateFields();
            Modal.confirm({
                title: `Update Quantity for ${selectedItem.name}`,
                content: "Are you sure you want to update quantity?",
                okButtonProps: { style: { backgroundColor: "#1890ff", borderColor: "#1890ff" } },
                onOk: async () => {
                    const values = quantityForm.getFieldsValue();
                    console.log({
                        total: values.quantity,
                    });
                    await inputQuantity({
                        itemId: selectedItem.id,
                        name: selectedItem.name,
                        points: selectedItem.points,
                        total: values.quantity,
                    });
                    setIsModalVisible(false);
                    message.success("Quantity updated successfully");
                },
            });
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            responsive: ["lg"],
        },
        {
            title: "Item",
            dataIndex: "name",
            key: "name",
            responsive: ["xs", "sm"],
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            responsive: ["lg"],
            render: (created_at) => formatDate(created_at),
        },
        {
            title: "Points",
            dataIndex: "points",
            key: "points",
            responsive: ["xs", "sm", "md", "lg"],

        },
        {
            title: "Quantity",
            dataIndex: "total",
            key: "total",
            responsive: ["xs", "sm", "md", "lg"],

        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <UnorderedListOutlined onClick={() => showModal(record)} style={{ color: "#1890ff" }} />
                </Space>
            ),
            responsive: ["xs", "sm", "lg"],
        },
    ];

    return (
        <>
            {
                itemsLoading ? (
                    <Spin size="large" className="flex justify-center" />
                ) : (
                    <>
                        <p className="font-bold text-3xl text-textColor mt-3 mb-10">Manage Items</p>
                        <Table
                            columns={columns.map((column) => ({
                                ...column,
                                key: column.dataIndex,
                            }))}
                            dataSource={itemsData ? itemsData.data.map((item) => ({ ...item, key: item.id })) : []}
                        />
                        <Modal
                            title={`Edit Item: ${selectedItem?.name}`}
                            open={isModalVisible}
                            onCancel={handleCancel}
                            footer={[

                                <Button key="cancel" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button className="bg-blue-500" key="delete" type="primary" onClick={handleUpdatePoints}>
                                    Update Points
                                </Button>,
                                <Button className="bg-blue-500" key="update" type="primary" onClick={handleUpdateQuantity}>
                                    Update Quantity
                                </Button>,
                            ]}
                        >
                            <Form form={pointsForm} name="updatePointsForm">
                                <Form.Item label="Points" name="points" rules={[{ required: true, message: "Please input points!" }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Form>
                            <Form form={quantityForm} name="updateQuantityForm">
                                <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Please input quantity!" }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                )
            }
        </>
    );
};