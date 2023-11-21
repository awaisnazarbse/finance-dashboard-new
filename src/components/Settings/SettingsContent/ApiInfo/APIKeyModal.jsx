import { useAuth } from "@/context/AuthContext";
import expensesApi from "@/lib/expense";
import userApi from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";

const APIKeyModal = (props) => {
  console.log("prop.offers", props);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const addMutation = useMutation(
    ["settings"],
    async (data) => {
      return await userApi.a(data);
    },
    {
      onSuccess: () => {
        message.success({
          content: "Expense added successfully",
        });
        queryClient.invalidateQueries(["expenses"]);
        props.close();
      },
    }
  );
  const updateMutation = useMutation(
    ["expenses"],
    async (values) => {
      return await expensesApi.updateExpense(values.id, values.data);
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        message.success({
          content: "Expense updated successfully",
        });
        queryClient.invalidateQueries(["expenses"]);
        props.close();
      },
    }
  );

  const handleSubmit = (values) => {
    if (props?.data) {
      updateMutation.mutate({
        id: props?.data?.id,
        data: {
          ...values,
          date: dayjs(values?.date).format("DD MMM YYYY"),
          amount: Number(values.amount),
          updatedAt: serverTimestamp(),
        },
      });
    } else {
      addMutation.mutate({
        ...values,
        user: user?.uid,
        active: true,
      });
    }
  };
  return (
    <Modal
      title={props?.data ? "Edit API Key" : "Add API Key"}
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Form
          size="large"
          name="basic"
          initialValues={{
            apiKey: props?.data?.apiKey ? props.data.apiKey : "",
          }}
          onFinish={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Form.Item style={{ width: "100%" }} name="apiKey">
            <Input placeholder="Enter api key" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-primary focus:bg-primary"
              size="large"
              type="primary"
              htmlType="submit"
              disabled={addMutation.isLoading || updateMutation.isLoading}
            >
              {addMutation.isLoading || updateMutation.isLoading
                ? "Submiting..."
                : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default APIKeyModal;
