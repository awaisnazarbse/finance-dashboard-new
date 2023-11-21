import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import userApi from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, message } from "antd";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const APIModal = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    ["settings"],
    async (data) => {
      const response = await axios.post("/api/is-key-valid", {
        apiKey: data?.apiKey,
      });
      const userRef = doc(db, "takealot-apis", uuidv4());
      await setDoc(
        userRef,
        {
          user: user?.uid,
          apiKey: data?.apiKey,
          seller_name: response.data?.display_name,
          active: true,
        },
        { merge: true }
      );

      return true;
    },
    {
      onError: (data) => {
        message.error({
          content: "API key is invalid",
        });
      },
      onSuccess: () => {
        message.success({
          content: "API key added successfully",
        });
        if (router.pathname === "/") {
          router.reload();
        }
        queryClient.invalidateQueries(["settings"]);
        props.close();
      },
    }
  );

  const updateMutation = useMutation(
    ["settings"],
    async (values) => {
      return true;
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        message.success({
          content: "API key updated successfully",
        });
        queryClient.invalidateQueries(["settings"]);
        props.close();
      },
    }
  );

  const handleSubmit = (values) => {
    if (props?.data) {
      updateMutation.mutate({ id: props?.data?.fbId, apiKey: values?.apiKey });
    } else {
      addMutation.mutate({
        ...values,
      });
    }
  };
  return (
    <Modal
      title={
        <span className="text-xl">
          {props?.data ? "Edit API Key" : "Add API Key"}
        </span>
      }
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
    >
      {props?.showMessage ? (
        <span className="text-base text-red-500">
          You do not have any takealot api key saved, please provide one
        </span>
      ) : null}
      <div
        style={{ display: "flex", alignItems: "center", width: "100%" }}
        className="mt-5"
      >
        <Form
          size="large"
          name="basic"
          onFinish={handleSubmit}
          initialValues={{
            apiKey: props?.data?.apiKey ? props?.data?.apiKey : "",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Form.Item
            style={{ width: "100%" }}
            name="apiKey"
            rules={[
              {
                required: true,
                message: "Please input takealot api key!",
              },
            ]}
          >
            <Input
              placeholder="Your Takealot API Key"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-primary focus:bg-primary"
              size="large"
              type="primary"
              htmlType="submit"
              disabled={addMutation.isLoading}
            >
              {addMutation.isLoading ? "Submiting..." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default APIModal;
