import { Button } from "antd";
import ApiInfoRow from "./ApiInfoRow";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/lib/user";
import APIModal from "@/components/SignIn/APIModal";
import { useState } from "react";
import Image from "next/image";

const ApiInfo = ({ data }) => {
  const { user } = useAuth();
  const [apiModal, setApiModal] = useState(false);
  const [apiData, setApiData] = useState(null);
  const queryClient = useQueryClient();
  const updateStatusMutation = useMutation(
    ["settings"],
    async (data) => {
      await userApi.switchAPIStatus(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["settings"]);
      },
    }
  );
  const handleChangeStatus = (active, id) => {
    console.log("data", {
      user: user?.uid,
      active: !active,
      id,
    });
    updateStatusMutation.mutate({
      user: user?.uid,
      active: !active,
      id,
    });
  };
  return (
    <div className="bg-white shadow-lg rounded-sm flex flex-col space-y-8 p-5 md:p-20 relative">
      <Button
        className="btn-primay p-3 flex items-center justify-center border-none outline-none text-white text-sm md:text-base bg-[#F7B614] w-fit absolute top-10 right-10"
        onClick={() => setApiModal(true)}
      >
        Add New API
      </Button>
      <span className="text-2xl font-bold">Takealot APIs</span>
      {data?.message &&
        data?.message === "Permission denied, your account is not active." && (
          <p className="text-red-400">
            Seems like your takealot api key is not correct, please check
          </p>
        )}
      <div className="flex flex-col space-y-8">
        {data?.map((d) => {
          return (
            <>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-col space-y-2">
                  <ApiInfoRow label={"Seller Name"} value={d?.display_name} />
                  <ApiInfoRow label={"Seller ID"} value={d?.seller_id} />
                  {d?.merchant_warehouses &&
                  d?.merchant_warehouses?.length > 0 ? (
                    <ApiInfoRow
                      label={"Address"}
                      value={d?.merchant_warehouses[0]?.address?.address}
                    />
                  ) : null}
                  {d?.merchant_warehouses &&
                  d?.merchant_warehouses?.length > 0 ? (
                    <ApiInfoRow
                      label={"Phone No"}
                      value={
                        d?.merchant_warehouses[0]?.address?.telephone_number
                          ?.country_code +
                        d?.merchant_warehouses[0]?.address?.telephone_number
                          ?.telephone_number
                      }
                    />
                  ) : null}
                  <ApiInfoRow
                    label={"API Key"}
                    value={
                      d?.apiKey?.slice(0, 4) +
                      "*".repeat(d?.apiKey?.length - 2 * 4) +
                      d?.apiKey?.slice(-4)
                    }
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    className="btn-primay p-3 flex items-center justify-center border-none outline-none text-white text-sm md:text-base w-fit"
                    style={{
                      background: d?.active
                        ? "rgb(239 68 68)"
                        : "rgb(34 197 94)",
                    }}
                    onClick={() => handleChangeStatus(d?.active, d?.fbId)}
                  >
                    {d?.active && !updateStatusMutation.isLoading
                      ? "Disconnect"
                      : !d?.active && !updateStatusMutation.isLoading
                      ? "Connect"
                      : updateStatusMutation.isLoading && d?.active
                      ? "Disconnecting..."
                      : updateStatusMutation.isLoading && !d?.active
                      ? "Connecting..."
                      : ""}
                  </Button>
                  <Button
                    className="btn-primay p-2 flex items-center justify-center border-none outline-none text-[#5C5C5C] text-sm md:text-base bg-white w-fit"
                    style={{
                      border: "2px solid #D3D3D3",
                    }}
                    onClick={() => {
                      setApiData(d);
                      setApiModal(true);
                    }}
                  >
                    Edit API Key
                  </Button>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
      {apiModal && (
        <APIModal
          show={apiModal}
          close={() => {
            setApiModal(false);
          }}
          showMessage={false}
          data={apiData}
          setData={setApiData}
        />
      )}
    </div>
  );
};

export default ApiInfo;
