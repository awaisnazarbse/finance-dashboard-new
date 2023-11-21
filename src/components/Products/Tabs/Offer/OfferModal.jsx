import { useAuth } from "@/context/AuthContext";
import offersApi from "@/lib/offers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select, message } from "antd";
import Image from "next/image";
import { useState } from "react";

const OfferModal = (props) => {
  const queryClient = useQueryClient();
  const [offer_id, setOfferId] = useState("");
  const addMutation = useMutation(
    ["offers"],
    async (data) => {
      return await offersApi.addOfferCOG(data);
    },
    {
      onSuccess: () => {
        message.success({
          content: "COG added successfully",
        });
        queryClient.invalidateQueries(["offers"]);
        props.close();
      },
    }
  );

  const handleSubmit = (values) => {
    addMutation.mutate({
      ...values,
      offer_id,
      cog: Number(values?.cog),
    });
  };

  return (
    <Modal
      title={<span className="text-2xl">Add COG</span>}
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
          <Form
            size="large"
            name="basic"
            // initialValues={{
            //   title: props?.data?.selling_price
            //     ? props.data.selling_price
            //     : "",
            // }}
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
                htmlFor="title"
              >
                Select Product
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please Select product!",
                  },
                ]}
              >
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
                      value: offer?.title,
                    };
                  })}
                  showSearch
                  onSelect={(e) => {
                    const offer = props?.offers?.find(
                      (off) => off?.title === e
                    );
                    setOfferId(offer?.offer_id);
                  }}
                  className="w-full"
                />
              </Form.Item>
            </div>
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="cog"
              >
                Cost of Good (COG)
              </label>
              <Form.Item
                style={{ width: "100%" }}
                name="cog"
                rules={[
                  {
                    required: true,
                    message: "Please input cost of good!",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Cost of Good (COG)"
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
                disabled={addMutation.isLoading}
              >
                {addMutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default OfferModal;
