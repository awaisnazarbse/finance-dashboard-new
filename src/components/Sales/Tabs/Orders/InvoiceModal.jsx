import { useAuth } from "@/context/AuthContext";
import offersApi from "@/lib/offers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Select, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import easyinvoice from "easyinvoice";
import dayjs from "dayjs";
import { Country } from "country-state-city";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const InvoiceModal = (props) => {
  let countriesOptions = Country.getAllCountries();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("values", values);
    const data = {
      images: {
        logo: "",
        // background: "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
      },
      
      sender: {
        company: props?.data?.seller_detail?.display_name,
        // address: "Sample Street 123",
        // zip: "1234 AB",
        // city: "Sampletown",
        // country: "Samplecountry",
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      client: {
        company: values?.customerName,
        address: values?.address,
        zip: values?.zip,
        city: values?.city,
        country: values?.country,
        "phone": values?.phone,
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
      },
      information: {
        number: props?.data?.order_id,
        date: dayjs().format("DD MMM YYYY"),
        // "due-date": dayjs().format("DD MMM YYYY"),
      },
      products: [
        {
          quantity: props?.data?.quantity,
          description: props?.data?.product_title,
          "tax-rate": 15,
          price: props?.data?.selling_price,
        },
        // {
        //   quantity: 4.1,
        //   description: "Product 2",
        //   "tax-rate": 6,
        //   price: 12.34,
        // },
        // {
        //   quantity: 4.5678,
        //   description: "Product 3",
        //   "tax-rate": 21,
        //   price: 6324.453456,
        // },
      ],
      //   "bottom-notice": "Kindly pay your invoice within 15 days.",
      settings: {
        currency: "ZAR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        locale: "en-ZA", // Defaults to en-US, used for number formatting (see docs)
        "tax-notation": "vat",
        // "margin-top": 25, // Default to 25
        // "margin-right": 25, // Default to 25
        // "margin-left": 25, // Default to 25
        // "margin-bottom": 25, // Default to 25
        // "format": "Letter", // Defaults to A4,
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
      },
      // Used for translating the headers to your preferred language
      // Defaults to English. Below example is translated to Dutch
      translate: {
        //     "invoice": "FACTUUR",
        //     "number": "Nummer",
        //     "date": "Datum",
        //     "due-date": "Verloopdatum",
        //     "subtotal": "Subtotaal",
        //     "products": "Producten",
        //     "quantity": "Aantal",
        //     "price": "Prijs",
        //     "product-total": "Totaal",
        //     "total": "Totaal"
        //		 "vat": "btw"
      },
    };
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download("myInvoice.pdf", result.pdf);
    setLoading(false);
  };
  return (
    <Modal
      title={<span className="text-2xl">Download Invoice</span>}
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
        <div className="flex space-x-2">
          <Form
            size="large"
            name="basic"
            initialValues={{
              customerName: props?.data?.customer ? props?.data?.customer : "",
              amount: props?.data?.selling_price
                ? props?.data?.selling_price
                : "",
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
                htmlFor="customerName"
              >
                Customer Name
              </label>
              <Form.Item style={{ width: "100%" }} name="customerName">
                <Input placeholder="Customer name" style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
              <div>
                <label
                  className="block font-medium mb-2 text-sm md:text-base"
                  htmlFor="company"
                >
                  Company Name
                </label>
                <Form.Item style={{ width: "100%" }} name="company">
                  <Input placeholder="Company Name" style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <div className="">
                <label
                  className="block font-medium mb-2 text-sm md:text-base"
                  htmlFor="vatNo"
                >
                  Vat No.
                </label>
                <Form.Item style={{ width: "100%" }} name="vatNo">
                  <Input placeholder="Vat No." style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="phone"
              >
                Customer Phone
              </label>
              <Form.Item style={{ width: "100%" }} name="phone">
                <PhoneInput
                  defaultCountry="ZA"
                  placeholder="Customer phone"
                  className="py-3 border px-2 font-normal placeholder:font-normal rounded-md bg-white"
                  // onChange={(value) => {
                  //   formik.setFieldValue("phone", value);
                  // }}
                />
              </Form.Item>
            </div>
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="address"
              >
                Customer Address
              </label>
              <Form.Item style={{ width: "100%" }} name="address">
                <Input
                  placeholder="Customer address"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-3">
              <div>
                <label
                  className="block font-medium mb-2 text-sm md:text-base"
                  htmlFor="zip"
                >
                  Zip Code
                </label>
                <Form.Item style={{ width: "100%" }} name="zip">
                  <Input placeholder="Zip Code" style={{ width: "100%" }} />
                </Form.Item>
              </div>
              <div className="">
                <label
                  className="block font-medium mb-2 text-sm md:text-base"
                  htmlFor="city"
                >
                  City
                </label>
                <Form.Item style={{ width: "100%" }} name="city">
                  <Input placeholder="City" style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </div>

            {/* <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="country"
              >
                Country
              </label>
              <Form.Item style={{ width: "100%" }} name="country">
                <Select
                  options={countriesOptions?.map((country) => {
                    return {
                      label: country?.name,
                      value: country?.name,
                    };
                  })}
                  placeholder="Country"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div> */}
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="amount"
              >
                Amount
              </label>
              <Form.Item style={{ width: "100%" }} name="amount">
                <Input
                  readOnly
                  prefix="R"
                  placeholder="Amount"
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
                disabled={loading}
                style={{
                  fontStyle: loading ? "italic" : "normal",
                }}
              >
                {/* {addMutation.isLoading ? "Saving..." : "Save"} */}
                {loading ? "Generating Invoice..." : "Download Invoice"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
