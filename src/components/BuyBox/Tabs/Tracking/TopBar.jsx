import { Button, Input, Select } from "antd";
import Image from "next/image";

const TopBar = () => {
  return (
    <div className="bg-white flex flex-col md:flex-row space-y-4 md:space-y-0 md:items-center md:justify-between w-full p-5">
      <div className="flex items-center space-x-2">
        <Input
          prefix={<Image alt="search" src="/icons/search.svg" width={15} height={15} />}
          placeholder="Search here"
          className="py-3 px-5 text-[#777777] text-base outline-none focus:outline-none border-none focus:border-none"
          style={{
            background: "rgba(21, 105, 189, 0.06)",
          }}
          styles={{
            input: {
              border: "none",
              background: "transparent",
            },
          }}
        />
        <div className="cursor-pointer flex items-center justify-center rounded-[5px] bg-opacity-10 bg-[#F7B614]">
          <svg
            className="cursor-pointer"
            width="57"
            height="50"
            viewBox="0 0 57 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36 18.6C36 18.04 36 17.76 35.89 17.546C35.7945 17.3579 35.6419 17.2049 35.454 17.109C35.24 17 34.96 17 34.4 17H21.6C21.04 17 20.76 17 20.546 17.109C20.3578 17.2049 20.2049 17.3578 20.109 17.546C20 17.76 20 18.04 20 18.6V19.337C20 19.582 20 19.704 20.028 19.819C20.0525 19.9214 20.093 20.0193 20.148 20.109C20.209 20.209 20.296 20.296 20.468 20.469L25.531 25.531C25.704 25.704 25.791 25.791 25.852 25.891C25.907 25.981 25.948 26.079 25.972 26.181C26 26.295 26 26.416 26 26.655V31.411C26 32.268 26 32.697 26.18 32.955C26.2581 33.0666 26.3582 33.161 26.4741 33.2326C26.59 33.3041 26.7192 33.3512 26.854 33.371C27.165 33.417 27.549 33.226 28.315 32.842L29.115 32.442C29.437 32.282 29.597 32.202 29.714 32.082C29.8178 31.976 29.8967 31.8483 29.945 31.708C30 31.55 30 31.37 30 31.011V26.663C30 26.418 30 26.296 30.028 26.181C30.0525 26.0786 30.093 25.9807 30.148 25.891C30.208 25.791 30.295 25.705 30.465 25.535L30.469 25.531L35.532 20.469C35.704 20.296 35.79 20.209 35.852 20.109C35.9071 20.0193 35.9476 19.9214 35.972 19.819C36 19.706 36 19.584 36 19.345V18.6Z"
              stroke="#F7B614"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {/* </div> */}
        <div className="cursor-pointer flex items-center justify-center px-4 py-3  rounded-[5px] bg-opacity-10 bg-[#F7B614]">
          {/* <Image src="/icons/sort.svg" width={23} height={23} /> */}

          <svg
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.94826 0.857143C7.94826 0.629814 8.03835 0.411797 8.1987 0.251051C8.35905 0.0903058 8.57653 0 8.8033 0C9.03007 0 9.24756 0.0903058 9.40791 0.251051C9.56826 0.411797 9.65834 0.629814 9.65834 0.857143V21.9309C9.65831 22.1003 9.6082 22.2658 9.51435 22.4067C9.4205 22.5476 9.28712 22.6574 9.13105 22.7224C8.97497 22.7873 8.8032 22.8044 8.63743 22.7715C8.47166 22.7387 8.31932 22.6573 8.19965 22.5377L0.2512 14.5714C0.171573 14.4918 0.108398 14.3972 0.065293 14.2931C0.022188 14.189 0 14.0773 0 13.9646C0 13.8518 0.022188 13.7402 0.065293 13.6361C0.108398 13.5319 0.171573 13.4373 0.2512 13.3577H0.25462C0.414894 13.1975 0.631971 13.1076 0.858278 13.1076C1.08458 13.1076 1.30166 13.1975 1.46194 13.3577L7.94826 19.8651V0.857143ZM13.0785 2.06914C13.0789 1.89989 13.1292 1.73454 13.2232 1.59393C13.3172 1.45332 13.4506 1.34375 13.6066 1.27903C13.7626 1.21431 13.9342 1.19734 14.0998 1.23026C14.2654 1.26318 14.4176 1.34451 14.5372 1.464L22.4856 9.42857C22.5653 9.50819 22.6284 9.60278 22.6715 9.70691C22.7147 9.81105 22.7368 9.92268 22.7368 10.0354C22.7368 10.1482 22.7147 10.2598 22.6715 10.3639C22.6284 10.4681 22.5653 10.5627 22.4856 10.6423H22.4822C22.3219 10.8025 22.1049 10.8924 21.8786 10.8924C21.6523 10.8924 21.4352 10.8025 21.2749 10.6423L14.7886 4.13829V23.1429C14.7886 23.3702 14.6985 23.5882 14.5381 23.7489C14.3778 23.9097 14.1603 24 13.9335 24C13.7068 24 13.4893 23.9097 13.3289 23.7489C13.1686 23.5882 13.0785 23.3702 13.0785 23.1429V2.06914Z"
              fill="#F7B614"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:items-center md:space-x-4">
        <Select
          placeholder="Icons"
          suffixIcon={
            <Image src="/icons/downarrow-black.svg" width={15} height={15} />
          }
          bordered={false}
          style={{
            background: "rgba(21, 105, 189, 0.22)",
            padding: "10px",
            borderRadius: "5px",
          }}
        />
        <Select
          placeholder="Title"
          suffixIcon={
            <Image alt="downarrow" src="/icons/downarrow-black.svg" width={15} height={15} />
          }
          bordered={false}
          style={{
            background: "rgba(21, 105, 189, 0.22)",
            padding: "10px",
            borderRadius: "5px",
          }}
        />
        <div
          className="flex items-center justify-between space-x-5 rounded-[5px] p-2"
          style={{
            background: "rgba(21, 105, 189, 0.06)",
          }}
        >
          <span className="text-[0.8rem] md:text-base">Tracking: 8/10</span>
          <Button className="btn-primay md:px-5 md:py-[1.2rem] flex items-center justify-center border-none outline-none text-white text-sm md:text-base bg-[#1569BD] w-fit">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
