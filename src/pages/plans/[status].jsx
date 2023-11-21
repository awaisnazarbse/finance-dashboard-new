import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Plans = () => {
  const router = useRouter();
  const { status } = router.query;
  return (
    <>
      <Head>
        <title>Plans</title>
      </Head>
      <div className="flex items-center justify-center flex-col space-y-4 w-full h-screen">
        <h1 className="text-2xl font-bold">
          Payment {status === "success" ? "successful" : "canceled"}
        </h1>
        {status === "success" ? (
          <FaCheckCircle color="green" size={60} />
        ) : (
          <MdCancel color="red" size={60} />
        )}
      </div>
    </>
  );
};

export default Plans;
