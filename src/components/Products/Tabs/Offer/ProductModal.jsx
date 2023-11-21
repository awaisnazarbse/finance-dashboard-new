import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, message } from "antd";
import Image from "next/image";

const ProductModal = (props) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateMutation = useMutation(
    ["offers"],
    async (values) => {
      return await fetch(`/api/offers/update/${values?.id}`, {
        body: JSON.stringify({ apiKey: user?.apiKey, data: values?.data }),
        method: "PATCH",
      });
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        message.success({
          content: "Offer updated successfully",
        });
        queryClient.invalidateQueries(["offers"]);
        props.close();
      },
    }
  );

  const handleSubmit = (values) => {
    updateMutation.mutate({
      id: props?.data?.offer_id,
      data: {
        ...props?.data,
        selling_price: Number(values?.selling_price),
        rrp: Number(values?.rrp),
      },
    });
  };
  return (
    <Modal
      title={<span className="text-2xl">Update</span>}
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
    >
      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold">{props?.data?.title}</h1>
        <div className="flex space-x-2">
          <div className="flex items-center justify-center relative h-52 w-[90%]">
            <Image alt="alt text" src={props?.data?.image_url} fill={true} />
          </div>
          <Form
            size="large"
            name="basic"
            initialValues={{
              selling_price: props?.data?.selling_price
                ? props.data.selling_price
                : "",
              rrp: props?.data?.rrp ? props.data.rrp : null,
            }}
            onFinish={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="selling_price"
              >
                Selling Price
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="selling_price"
                rules={[
                  {
                    required: true,
                    message: "Please input selling price!",
                  },
                ]}
              >
                <Input placeholder="Selling Price" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="rrp"
              >
                Recommended Retail Price (RRP)
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="rrp"
                rules={[
                  {
                    required: true,
                    message: "Please select rrp!",
                  },
                ]}
              >
                <Input
                  placeholder="Recommended Retail Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <Form.Item className="flex items-center justify-end">
              <Button
                className="bg-primary focus:bg-primary"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={updateMutation.isLoading}
              >
                {updateMutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
