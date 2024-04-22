"use client";

import { Card, Layout, Descriptions, Skeleton, Avatar, Tabs, FloatButton } from "antd";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import { useGetUserQuery } from "../../redux/api/userApi";
import { useGetExchangeByIdQuery } from "../../redux/api/exchangeApi";
import { useGetTransactionByIdQuery } from "../../redux/api/transactionApi";
import { useGetPaymentByIdQuery } from "../../redux/api/paymentApi";
import ExchangeUser from "./components/ExchangeUser";
import TransactionUser from "./components/TransactionUser";
import PaymentUser from "./components/PaymentUser";

export default function ProfileUserPage() {
  const { data: userData, isError, isLoading: userLoading, isSuccess } = useGetUserQuery();
  const userUuid = userData?.user?.uuid;
  const { data: exchangeData, isLoading: exchangeLoading } = useGetExchangeByIdQuery(userUuid);
  const { data: transactionData, isLoading: transactionLoading } = useGetTransactionByIdQuery(userUuid);
  const { data: paymentData, isLoading: paymentLoading } = useGetPaymentByIdQuery(userUuid);

  const dataProfile = [
    {
      key: "1",
      label: "Username",
      children: userData?.user?.name || "",
    },
    {
      key: "2",
      label: "Email",
      children: userData?.user?.email || "",
    },
    {
      key: "3",
      label: "Role",
      children: userData?.user?.role || "",
    },
    {
      key: "4",
      label: "Points",
      children: userData?.user?.points || "0",
    },
  ];

  const dataActivities = [
    {
      key: "1",
      label: "Exchange",
      children: <ExchangeUser exchangeData={exchangeData} />,
    },
    {
      key: "2",
      label: "Transaction",
      children: <TransactionUser transactionData={transactionData} />,
    },
    {
      key: "3",
      label: "Payment",
      children: <PaymentUser paymentData={paymentData} />,
    },
  ];

  return (
    <>
      <NavbarComponent />
      <Layout>
        <Card className="mt-28 mx-10 my-10" bordered={true}>
          {(userLoading && <Skeleton />) || (exchangeLoading && <Skeleton />) || (transactionLoading && <Skeleton />) || (paymentLoading && <Skeleton />)}
          {isError && <p>Error loading user data</p>}

          {isSuccess && userData?.user && (
            <>
              <p className="font-bold text-2xl text-center mb-4 text-textColor">My Profile</p>
              <div className="flex items-center justify-center">
                <Avatar size={100} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              </div>
              <Descriptions title="User Info" items={dataProfile} />
            </>
          )}
        </Card>
        <Card className="mx-10 mb-10" bordered={true}>
          {userLoading && <Skeleton />}
          {exchangeLoading && <Skeleton />}
          {isError && <p>Error loading user data</p>}
          {isSuccess && userData?.user && (
            <>
              <p className="font-bold text-2xl text-center mb-4 text-textColor">Your Activities</p>
              <Tabs defaultActiveKey="1" items={dataActivities} />
            </>
          )}
        </Card>
      </Layout>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
