import { Image, Modal } from "antd";

const SelectedProductsModal = (props) => {
  return (
    <Modal
      title={"Selected products"}
      open={props.show}
      footer={null}
      onCancel={() => {
        if (props?.data) {
          props?.setData(null);
        }
        props.close();
      }}
    >
      <div className="flex flex-col space-y-4 mt-10">
        {props?.data?.map((e) => {
          return (
            <div className="flex w-full items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Image src={e?.product?.image_url} width={50} height={50} />
                <div>
                  <span className="text-gray-500">SKU {e?.product?.sku}</span>
                  <span
                    title={e?.product?.title}
                    className="line-clamp-1 max-w-[20rem]"
                  >
                    {e?.product?.title}
                  </span>
                </div>
              </div>
              <span>{e?.unitsOrdered}</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default SelectedProductsModal;
