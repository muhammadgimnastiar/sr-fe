"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { notification, Button } from "antd";
import NavbarComponent from "../../../components/NavbarComponent";
import FooterComponent from "../../../components/FooterComponent";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: "topRight",
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = "service_6pv8zsc";
    const templateId = "template_q3jcfdh";
    const userId = "TNBzy6ZKUvJ5YW-wN";

    setLoading(true);

    try {
      const response = await emailjs.send(serviceId, templateId, { to_email: email, subject, message }, userId);
      console.log("Email sent:", response);
      openNotification("success", "Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      openNotification("error", "Error sending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container mx-auto my-10 px-10 sm:pt-14 lg:pt-8 xl:pt-24 max-[640px]:pt-10">
        <p className="font-extrabold text-6xl text-center text-primary max-[640px]:text-4xl">Contact Us</p>
        <p className="font-normal text-center mt-5 text-gray-500 text-xl max-[640px]:text-lg">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      </div>
      <section className="container mx-auto px-5">
        <div className="py-8 px-4 mx-auto max-w-screen-xl">
          <form onSubmit={sendEmail} className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="name@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Leave a comment..."
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <Button type="text" htmlType="submit" loading={loading} className="pb-8 pt-3 px-6 text-sm font-medium text-center text-white bg-primary rounded-lg">
              Send message
            </Button>
          </form>
        </div>
      </section>

      <FooterComponent />
    </>
  );
}
