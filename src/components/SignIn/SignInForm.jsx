import { useAuth } from "@/context/AuthContext";
import { Divider, Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle, signInWithYahoo } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      router.push("/");
    } catch (error) {
      console.error("Login error: ", error);
      message.error({
        content:
          error.code === "auth/user-not-found"
            ? "User is not registered"
            : error.code === "auth/wrong-password"
            ? "Wrong password entered"
            : "Something went wrong, please try again",
      });
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex items-center justify-center md:h-screen">
      <div
        className="bg-black bg-opacity-[2%] w-full h-full p-5 items-center justify-center flex flex-col md:space-y-8"
        style={
          {
            // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }
        }
      >
        <h2 className="text-xl md:text-4xl leading-[2.75rem] text-center font-semibold mb-4">
          Sign In
        </h2>
        <Form
          onFinish={handleSubmit}
          className="mx-auto w-full flex flex-col space-y-2 md:px-12"
        >
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-base"
              htmlFor="name"
            >
              Email*
            </label>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="email"
                type="email"
                placeholder="Enter your email.."
              />
            </Form.Item>
          </div>
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-xl"
              htmlFor="email"
            >
              Password*
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="password"
                type="password"
                placeholder="Enter your password.."
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-end">
            <Link
              href={"#"}
              className="text-orange text-sm md:text-base font-normal"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <button
              className="text-sm md:text-lg rounded-full text-white font-medium py-3 lg:py-2 px-8 focus:outline-none focus:shadow-outline w-fit flex items-center justify-center bg-[#F7B614] mt-5"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div
            className="flex items-center space-x-4 justify-end w-full md:absolute md:bottom-10 md:right-20"
            style={{
              marginTop: "2rem",
            }}
          >
            <Link href={"#"}>
              <FaFacebookF size={20} color="#172B4D" />
            </Link>
            <Link href={"#"}>
              <BsTwitter size={20} color="#172B4D" />
            </Link>
            <Link href={"#"}>
              <FaInstagramSquare size={20} color="#172B4D" />
            </Link>
            <Link href={"#"}>
              <FaLinkedinIn size={20} color="#172B4D" />
            </Link>
          </div>
        </Form>
        <Divider rootClassName="text-blue-500">
          <span className="text-red-500">Or continue with</span>
        </Divider>
        <div className="flex space-x-4 items-center">
          <button type="link" onClick={() => signInWithGoogle()}>
            <Image
              alt="alt text"
              src="/icons/google.svg"
              width={40}
              height={40}
            />
          </button>
          <button type="link" onClick={() => signInWithYahoo()}>
            <Image
              alt="alt text"
              src="/icons/yahoo.svg"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
