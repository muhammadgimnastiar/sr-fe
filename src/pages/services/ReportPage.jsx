"use client";

import NavbarComponent from "../../components/NavbarComponent";
import FooterComponent from "../../components/FooterComponent";
import { useForm } from "react-hook-form";
import RHFProvider from "../../components/hook-form/RHFProvider";
import RHFTextField from "../../components/hook-form/RHFTextField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FloatButton, notification, Spin } from "antd";
import { useState } from "react";
import { usePostReportsMutation } from "../../redux/api/reportApi";
import { useGetUserQuery } from "../../redux/api/userApi";

export default function ReportPage() {
  const { data: userData, loading: userLoading } = useGetUserQuery();
  const [reportMutation] = usePostReportsMutation();

  const [buttonLoading, setButtonLoading] = useState(false);

  const defaultValues = {
    email: "",
    subject: "",
    location: "",
  };

  const reportSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    location: Yup.string().required("Location is required"),
  });

  const methods = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues,
  });

  let uuid;

  if (userLoading) {
    return (
      <>
        <Spin size="large" className="flex justify-center" />
      </>
    );
  } else if (!userData || !userData.user) {
    return (
      <>
        <Spin size="large" className="flex justify-center" />
      </>
    );
  } else {
    uuid = userData.user.uuid;
  }

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log("Form submitted", data);
    setButtonLoading(true);

    try {
      const dataWithUserId = {
        ...data,
        user_id: uuid,
      };

      const res = await reportMutation({ data: dataWithUserId }).unwrap();
      console.log(res);

      if (res.status === 200 || res.status === 201) {
        notification.success({
          message: "Report submitted successfully!",
          duration: 3,
        });
      } else {
        notification.error({
          message: "Failed to submit report. Please try again later.",
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Failed to submit report. Please try again later.",
        duration: 3,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto mt-20 mb-10">
        <p className="font-extrabold text-6xl text-center text-primary max-[640px]:text-4xl">Report Trash</p>
        <p className="font-normal text-center mt-5 text-gray-500 text-xl max-[640px]:text-lg">Report trash in the area around you</p>
      </div>
      <div className="container mx-auto max-[640px]:my-10 sm:my-10 md:my-10 lg:my-10 xl:my-10">
        <div className="max-w-screen-xl px-4 mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63219.15529081213!2d112.59058335914676!3d-7.978558312115017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1702127997647!5m2!1sen!2sid"
            width="100%"
            height="600"
            loading="lazy"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="pt-5 mx-auto max-w-screen-xl">
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField name="email" label="Your email" type="email" helperText="name@gmail.com" />
              <RHFTextField name="subject" label="Your subject" type="text" helperText="I would like to pick up trash" />
              <RHFTextField name="location" label="Your location" type="text" helperText="https://www.google.com/maps/place/example" />
              <button type="submit" className="w-60 px-5 py-3 text-base font-medium bg-primary hover:bg-green-700 text-white rounded-lg" disabled={buttonLoading}>
                {buttonLoading ? "Sending your report..." : "Send Reports"}
              </button>
            </RHFProvider>
          </div>
        </div>
      </div>
      <FloatButton.BackTop />
      <FooterComponent />
    </>
  );
}
