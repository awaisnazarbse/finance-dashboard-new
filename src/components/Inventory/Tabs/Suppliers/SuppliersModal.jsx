import TextSkeleton from "@/components/utils/TextSkeleton";
import { useAuth } from "@/context/AuthContext";
import suppliersApi from "@/lib/suppliers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select, message } from "antd";
import axios from "axios";
import { serverTimestamp } from "firebase/firestore";

const SuppliersModal = (props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const addMutation = useMutation(
    ["suppliers"],
    async (data) => {
      return await suppliersApi.addSupplier(data);
    },
    {
      onSuccess: () => {
        message.success({
          content: "Supplier added successfully",
        });
        queryClient.invalidateQueries(["suppliers"]);
        props.close();
      },
    }
  );
  const updateMutation = useMutation(
    ["suppliers"],
    async (values) => {
      return await suppliersApi.updateSupplier(values.id, values.data);
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        message.success({
          content: "Supplier updated successfully",
        });
        queryClient.invalidateQueries(["suppliers"]);
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
          user: user?.uid,
          updatedAt: serverTimestamp(),
        },
      });
    } else {
      addMutation.mutate({
        ...values,
        user: user?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  };

  return (
    <Modal
      title={props?.data ? "Update Supplier" : "New Supplier"}
      open={props.show}
      footer={null}
      onCancel={() => {
        props?.setData(null);
        props.close();
      }}
    >
      <Form
        size="large"
        name="basic"
        initialValues={{
          supplierName: props?.data?.supplierName
            ? props.data.supplierName
            : "",
          contactName: props?.data?.contactName ? props.data.contactName : "",
          website: props?.data?.website ? props.data.website : "",
          address: props?.data?.address ? props.data.address : "",
          skype: props?.data?.skype ? props.data.skype : "",
          phone: props?.data?.phone ? props.data.phone : "",
          email: props?.data?.email ? props.data.email : "",
          skype: props?.data?.skype ? props.data.skype : "",
          comments: props?.data?.comments ? props.data.comments : "",
          currency: props?.data?.currency ? props.data.currency : null,
        }}
        onFinish={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="grid w-full grid-cols-3 space-x-2">
          <Form.Item
            name="supplierName"
            rules={[
              {
                required: true,
                message: "Please input supplier name!",
              },
            ]}
          >
            <Input placeholder="Supplier name" className="w-full" />
          </Form.Item>
          <Form.Item name="contactName">
            <Input placeholder="Contact name" className="w-full" />
          </Form.Item>
          <Form.Item name="currency">
            <Select
              options={[
                { label: "USD", value: "USD" },
                { label: "Rand", value: "Rand" },
                { label: "Euro", value: "Euro" },
                { label: "AED", value: "AED" },
                { label: "INR", value: "INR" },
              ]}
              placeholder="Currency"
              className="w-full"
            />
          </Form.Item>
        </div>
        <Form.Item className="w-full" name="address">
          <Input placeholder="Address" className="w-full" />
        </Form.Item>
        <div className="grid w-full grid-cols-2 space-x-2">
          <Form.Item className="w-full" name="skype">
            <Input placeholder="Skype" className="w-full" />
          </Form.Item>
          <Form.Item className="w-full" name="phone">
            <Input placeholder="Phone number" className="w-full" />
          </Form.Item>
        </div>
        <div className="grid w-full grid-cols-2 space-x-2">
          <Form.Item className="w-full" name="email">
            <Input placeholder="Email" className="w-full" />
          </Form.Item>
          <Form.Item className="w-full" name="website">
            <Input placeholder="Website" className="w-full" />
          </Form.Item>
        </div>
        <Form.Item className="w-full" name="comments">
          <Input.TextArea
            style={{ resize: "none" }}
            placeholder="Comments"
            className="w-full"
          />
        </Form.Item>
        <Form.Item className="flex items-center justify-end w-full">
          <Button
            className="bg-primary focus:bg-primary"
            size="large"
            type="primary"
            htmlType="submit"
            disabled={addMutation.isLoading || updateMutation.isLoading}
          >
            {addMutation.isLoading || updateMutation.isLoading
              ? "Saving..."
              : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SuppliersModal;
