import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../redux/api/authApi";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFProvider from "../../../components/hook-form/RHFProvider";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import { Link, useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Nama diperlukan"),
  email: Yup.string().required("Email diperlukan"),
  password: Yup.string().required("Password diperlukan"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const [signupMutation] = useSignupMutation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setButtonLoading(true);
    signupMutation({ data })
      .then(() => {
        navigate("/signin");
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container py-8 px-4 mx-auto max-w-screen lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-5 items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              <img src="/logo.png" alt="Logo" width={40} height={40} />
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-textColor md:text-5xl lg:text-6xl">Join Us!</h1>
            </div>
            <p className="mb-4 mt-2 text-lg font-normal text-gray-500 lg:text-xl xl:text-start lg:text-start md:text-center sm:text-center max-[640px]:text-center">Please register your account first</p>
            <Link to={"/"} className="text-textColor hover:underline font-medium text-lg inline-flex items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              Back to Home
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-textColor">Create Your Account</h2>
              <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField name="name" label="Your name" type="text" helperText="username" />
                <RHFTextField name="email" label="Your email" type="email" helperText="name@gmail.com" />
                <RHFTextField name="password" label="Your password" type="password" helperText="••••••••" />
                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center bg-primary hover:bg-green-700 text-white rounded-lg" disabled={buttonLoading}>
                  {buttonLoading ? "Create your account..." : "Sign up your account"}
                </button>
                <div className="text-sm font-medium text-gray-900">
                  {`Already have account? `}
                  <a className="text-primary hover:underline" href="/signin">
                    Sign in your account
                  </a>
                </div>
              </RHFProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
