import expensesApi from "@/lib/expense";
import calculateTotalExpense from "@/utils/calculateTotalExpense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import dayjs from "dayjs";
import { serverTimestamp } from "firebase/firestore";
import Image from "next/image";

const ExpenseModal = (props) => {
  console.log("prop.offers", props);
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    ["expenses"],
    async (data) => {
      return await expensesApi.addExpense(data);
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
    if (values?.type === "One off") {
      if (props?.data) {
        updateMutation.mutate({
          id: props?.data?.id,
          data: {
            ...values,
            date: dayjs(values?.date).format("DD MMM YYYY"),
            endDate: dayjs(values?.endDate).format("DD MMM YYYY"),
            amount: Number(values.amount),
            totalExpense: Number(values.amount),
            updatedAt: serverTimestamp(),
          },
        });
      } else {
        addMutation.mutate({
          ...values,
          date: dayjs(values?.date).format("DD MMM YYYY"),
          endDate: dayjs(values?.endDate).format("DD MMM YYYY"),
          amount: Number(values.amount),
          totalExpense: Number(values.amount),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } else {
      const totalExpense = calculateTotalExpense({
        ...values,
        amount: Number(values?.amount),
      });
      console.log("totalExpense", totalExpense);
      if (props?.data) {
        updateMutation.mutate({
          id: props?.data?.id,
          data: {
            ...values,
            date: dayjs(values?.date).format("DD MMM YYYY"),
            endDate: dayjs(values?.endDate).format("DD MMM YYYY"),
            amount: Number(values.amount),
            totalExpense,
            updatedAt: serverTimestamp(),
          },
        });
      } else {
        addMutation.mutate({
          ...values,
          date: dayjs(values?.date).format("DD MMM YYYY"),
          endDate: dayjs(values?.endDate).format("DD MMM YYYY"),
          amount: Number(values.amount),
          totalExpense,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }
  };
  return (
    <Modal
      title={props?.data ? "Update Expense" : "Add New Expense"}
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
            name: props?.data?.name ? props.data.name : "",
            type: props?.data?.type ? props.data.type : null,
            category: props?.data?.category ? props.data.category : [],
            offer_id: props?.data?.offer_id ? props.data.offer_id : null,
            amount: props?.data?.amount ? props.data.amount : null,
            date: props?.data?.date ? dayjs(props.data.date, "DD/MM/YY") : null,
            endDate: props?.data?.endDate
              ? dayjs(props.data.endDate, "DD/MM/YY")
              : null,
            // email: props?.data?.email ? props.data.email : "",
            // role: props?.data?.role ? props.data.role : null,
          }}
          onFinish={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div className="grid w-full grid-cols-2 space-x-2">
            <Form.Item
              style={{ width: "100%" }}
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input date!",
                },
              ]}
            >
              <DatePicker
                format={"DD/MM/YY"}
                placeholder="Expense date"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              name="endDate"
              rules={[
                {
                  required: true,
                  message: "Please input date!",
                },
              ]}
            >
              <DatePicker
                format={"DD/MM/YY"}
                placeholder="Expense end date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <Form.Item style={{ width: "100%" }} name="name">
            <Input placeholder="Expense name" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="type"
            rules={[
              {
                required: true,
                message: "Please select type!",
              },
            ]}
          >
            <Select
              placeholder="Expense type"
              options={[
                { label: "One off", value: "One off" },
                { label: "Daily", value: "Daily" },
                { label: "Weekly", value: "Weekly" },
                { label: "Monthly", value: "Monthly" },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }} name="category">
            <Select
              placeholder="Expense category"
              mode="tags"
              // options={[
              //   { label: "Toy", value: "Toy" },
              //   { label: "Electronics", value: "Electronics" },
              // ]}
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }} name="offer_id">
            <Select
              placeholder="Select Product"
              options={props?.offers?.map((offer) => {
                return {
                  label: (
                    <div className="flex items-center space-x-2">
                      <Image
                        alt="alt text"
                        src={offer?.image_url}
                        width={20}
                        height={20}
                      />
                      <span>{offer?.title}</span>
                    </div>
                  ),
                  value: offer?.offer_id,
                };
              })}
              showSearch
              className="w-full"
            />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input amount!",
              },
            ]}
          >
            <Input
              prefix="R "
              type="number"
              placeholder="Expense amount"
              style={{ width: "100%" }}
            />
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

export default ExpenseModal;
