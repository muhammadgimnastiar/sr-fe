import { useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import { useGetUserQuery } from "../../redux/api/userApi";
import CardExchange from "../../components/CardExchange";
import { FloatButton, Spin } from "antd";

export default function ExchangePage() {
  const { data: userData, isError, isLoading, isFetching } = useGetUserQuery();

  useEffect(() => {
    console.log(isLoading);
  }, [userData, isError, isLoading, isFetching]);

  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto mt-20 mb-10">
        {isLoading && <Spin className="flex justify-center items-center" size="large" />}

        {isError && <div>Error loading user data</div>}

        {!isLoading && !isError && (
          <>
            <div className="text-center font-extrabold text-6xl text-primary max-[640px]:text-4xl">Exchange</div>
            <div className="text-center font-normal text-xl text-textColor mt-5 max-[640px]:text-lg">Information points to exchange good items</div>
            <div className="grid max-w-screen-xl mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 my-10 lg:pt-8 xl:pt-24 items-center justify-center justify-items-center justify-self-center ">
              <div className="lg:col-span-6 sm:text-center md:text-center lg:text-start xl:text-start max-[640px]:px-12">
                <div className="flex gap-3 mt-8 text-textColor font-normal sm:text-xl md:text-xl lg:text-xl xl:text-xl xl:px-0 lg:px-0 md:px-0 sm:px-12 max-[640px]:text-center max-[640px]:text-lg">
                  <span>
                    <img src="./icons/coin.png" alt="Illustration Coin" />
                  </span>
                  <p className="font-bold text-4xl text-primary">{userData.user.points ? userData.user.points : "0"} Points</p>
                </div>
              </div>

              <div className=" md:my-12 sm:mx-12 sm:my-12 md:mx-12 lg:mx-12 xl:mx-12 lg:mt-0 lg:col-span-5 max-[640px]:px-12 max-[640px]:pb-8">
                <img src="/exchange.png" alt="Smart Recycling Logo" width={700} height={700} />
              </div>
            </div>
            <div>
              <div className="text-center mx-4 font-bold text-4xl text-primary max-[640px]:text-4xl">Goods that can be exchanged</div>
              <div className="text-center mx-4 font-normal text-xl text-textColor mt-5 max-[640px]:text-lg">There is a choice of items that can be exchanged for the points that have been collected</div>
            </div>
            <div className="justify-center mt-10">
              <CardExchange />
            </div>
          </>
        )}
      </div>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
