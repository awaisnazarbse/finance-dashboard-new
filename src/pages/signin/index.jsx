import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const SignInForm = dynamic(() => import("../../components/SignIn/SignInForm"));

const Index = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center justify-items-center">
        <div className="flex flex-col items-center justify-center space-y-6 p-10">
          <Image alt="alt text" src="/images/login1.svg" width={400} height={400} />
          <div className="flex items-center justify-end space-x-1">
            <span> Not have an account? </span>
            <Link className="text-blue-600" href={"/signup"}>
              Sign Up
            </Link>
          </div>
        </div>
        <SignInForm />
      </div>
    </>
  );
};

export default Index;
