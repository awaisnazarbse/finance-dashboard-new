import { useAuth } from "@/context/AuthContext";
import { Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );

    if (
      hasCapitalLetter &&
      hasSmallLetter &&
      hasNumber &&
      hasSpecialCharacter &&
      password.length >= 8
    ) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must contain at least one capital letter, one small letter, one number, one special character, and be at least 8 characters long."
      );
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await signUp(values);
      router.push("/signin");
    } catch (error) {
      console.error("Signup error: ", error);
      message.error({
        content: "Something went wrong, please try again",
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
          Sign Up
        </h2>
        <Form
          onFinish={handleSubmit}
          className="mx-auto w-full flex flex-col md:px-12"
        >
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-base"
              htmlFor="firstName"
            >
              First Name*
            </label>
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your first name",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black"
                placeholder="Enter your first name.."
              />
            </Form.Item>
          </div>
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-base"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Form.Item name="lastName">
              <input
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black"
                placeholder="Enter your last name.."
              />
            </Form.Item>
          </div>
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
              validateStatus={passwordError ? "error" : ""}
              help={passwordError}
            >
              <Input.Password
                onChange={handlePasswordChange}
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black focus:border-black hover:border-black active:border-black"
                id="password"
                type="password"
                placeholder="Enter your password.."
              />
            </Form.Item>
          </div>
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-xl"
              htmlFor="email"
            >
              Takealot API Key*
            </label>
            <Form.Item
              name="apiKey"
              rules={[
                {
                  required: true,
                  message: "Please input your takealot api key!",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-black opacity-40 rounded-full w-full py-2 px-3 leading-tight focus:outline-none text-black"
                placeholder="Enter your api key.."
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-end">
            <button
              className="text-sm md:text-lg rounded-full text-white font-medium py-3 lg:py-2 px-8 focus:outline-none focus:shadow-outline w-fit flex items-center justify-center bg-[#F7B614]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
