import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../../../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";
import { setCredentials } from "../../../redux/authSlice";
import RHFProvider from "../../../components/hook-form/RHFProvider";
import RHFTextField from "../../../components/hook-form/RHFTextField";
import { Alert } from "antd";

const SigninSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

const cookies = new Cookies();

export default function SignInPage() {
  const [signinMutation] = useSigninMutation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    setButtonLoading(true);
    try {
      const res = await signinMutation({ data }).unwrap();
      dispatch(
        setCredentials({
          ACCESS_TOKEN: res.access_token,
          REFRESH_TOKEN: res.refresh_token,
        })
      );
      cookies.set("access_token", res.access_token);
      cookies.set("refresh_token", res.refresh_token);
      navigate("/");
      setShowSuccessAlert(true);
    } catch (error) {
      console.log(error);
      setShowAlert(true);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container py-8 px-4 mx-auto max-w-screen lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-5 items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              <img src="/logo.png" alt="Logo" width={40} height={40} />
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-textColor md:text-5xl lg:text-6xl">Welcome Back!</h1>
            </div>
            <p className="mb-4 mt-2 text-lg font-normal text-gray-500 lg:text-xl xl:text-start lg:text-start md:text-center sm:text-center max-[640px]:text-center">Let us sign you in</p>
            <Link to={"/"} className="text-textColor hover:underline font-medium text-lg inline-flex items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              Back to Home
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-textColor">Sign In Your Account</h2>
              {showAlert && <Alert message="Error" description="There was an issue with the login. Please check your email and password." type="error" showIcon closable onClose={() => setShowAlert(false)} />}
              {showSuccessAlert && <Alert message="Success" description="You have successfully logged in." type="success" showIcon closable onClose={() => setShowSuccessAlert(false)} />}
              <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField name="email" label="Your email" type="email" helperText="name@gmail.com" />
                <RHFTextField name="password" label="Your password" type="password" helperText="••••••••" />
                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center bg-primary hover:bg-green-700 text-white rounded-lg" disabled={buttonLoading}>
                  {buttonLoading ? "Signing In..." : "Sign in your account"}
                </button>
                <div className="text-sm font-medium text-gray-900">
                  {`Don't have account? `}
                  <a className="text-primary hover:underline" href="/signup">
                    Sign up your account
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
