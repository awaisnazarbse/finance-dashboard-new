import { Button, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/lib/user";

const DetailsForm = ({ data }) => {
  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    ["user-details"],
    async (values) => {
      return await userApi.updateUser(user.id, values);
    },
    {
      onError: (data) => {},
      onSuccess: () => {
        message.success({
          content: "Details updated successfully!",
        });
        queryClient.invalidateQueries(["user-details"]);
      },
    }
  );

  const handleSubmit = (values) => {
    updateMutation.mutate(values);
  };

  return (
    <Form
      className="p-5 flex flex-col space-y-4"
      initialValues={{
        firstName: data?.firstName ? data?.firstName : "",
        lastName: data?.lastName ? data?.lastName : "",
        email: data?.email ? data?.email : "",
        phone: data?.phone ? data?.phone : "",
      }}
      onFinish={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col space-y-2">
          <span className="text-base text-black">First Name</span>
          <Form.Item name="firstName">
            <Input
              placeholder="First name"
              className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
              style={{
                background: "rgba(21, 105, 189, 0.06)",
              }}
            />
          </Form.Item>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-base text-black">Last Name</span>
          <Form.Item name="lastName">
            <Input
              placeholder="Last name"
              className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
              style={{
                background: "rgba(21, 105, 189, 0.06)",
              }}
            />
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-base text-black">Email</span>
        <Form.Item name="email">
          <Input
            placeholder="Email"
            className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
            style={{
              background: "rgba(21, 105, 189, 0.06)",
            }}
            disabled
          />
        </Form.Item>
      </div>
      <div className="flex flex-col space-y-2">
        <span className="text-base text-black">Phone</span>
        <Form.Item name="phone">
          <Input
            placeholder="Phone"
            className="p-3 border placeholder:text-base placeholder:text-[#777777] border-[#1569BD] rounded-[5px] text-[#777777]"
            style={{
              background: "rgba(21, 105, 189, 0.06)",
            }}
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button
          htmlType="submit"
          className="btn-primay px-7 py-6 flex items-center justify-center border-none outline-none text-white text-base bg-[#F7B614] w-fit"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? "Updating..." : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailsForm;
