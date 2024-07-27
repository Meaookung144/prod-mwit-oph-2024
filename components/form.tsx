"use client";

import React from 'react';
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function Form() {
    // const router = useRouter();
    // const { data: session, status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
        //         return router.push('/register');
        //     },
        // });
        
    return (
        <form
            className={FormStyle}
        >
            {/* {InputData.map((Data) => (
                <div className="flex flex-col mb-4 sm:flex-row">
                    <label
                        htmlFor={Data.id}
                        className={LabelStyle}
                    >
                        {Data.name}:
                    </label>
                    <input
                        type={Data.type}
                        id={Data.id}
                        placeholder={Data.placeholder}
                        name={Data.id}
                        autoComplete={Data.autoComplete}
                        className={InputStyle}
                        // value={session?.user.Data.id}
                    />
                </div>
            ))} */}
            <div className="flex flex-col mb-4 sm:flex-row">
                <label
                    htmlFor={InputData[0].id}
                    className={LabelStyle}
                >
                    {InputData[0].name}:
                </label>
                <input
                    type={InputData[0].type}
                    id={InputData[0].id}
                    placeholder={InputData[0].placeholder}
                    name={InputData[0].id}
                    autoComplete={InputData[0].autoComplete}
                    className={InputStyle}
                />
            </div>

            <div className="flex flex-col mb-4 sm:flex-row">
                <label
                    htmlFor={InputData[1].id}
                    className={LabelStyle}
                >
                    {InputData[1].name}:
                </label>
                <input
                    type={InputData[1].type}
                    id={InputData[1].id}
                    placeholder={InputData[1].placeholder}
                    name={InputData[1].id}
                    autoComplete={InputData[1].autoComplete}
                    className={InputStyle}
                />
            </div>

            <div className="flex flex-col mb-4 sm:flex-row">
                <label
                    htmlFor={InputData[2].id}
                    className={LabelStyle}
                >
                    {InputData[2].name}:
                </label>
                <input
                    type={InputData[2].type}
                    id={InputData[2].id}
                    placeholder={InputData[2].placeholder}
                    name={InputData[2].id}
                    autoComplete={InputData[2].autoComplete}
                    className={InputStyle}
                />
            </div>

            {/* <div className="flex flex-col mb-4 sm:flex-row">
                <label
                    htmlFor={InputData[3].id}
                    className={LabelStyle}
                >
                    {InputData[3].name}:
                </label>
                <input
                    type={InputData[3].type}
                    id={InputData[3].id}
                    placeholder={InputData[3].placeholder}
                    name={InputData[3].id}
                    autoComplete={InputData[3].autoComplete}
                    className={CheckboxStyle}
                />
            </div> */}
            <div content-center item-center text-center place-items-center justify-center>
                <button
                    className={SubmitStyle}
                >
                    Save change
                </button>
            </div>
        </form>
    );
}


const FormStyle = "flex flex-col item-start justify-start w-full mx-auto p-5 border border-gray-300 rounded-md bg-white bg-opacity-50 shadow-lg font-IBMPlex font-semibold text-gray-500 place-items-center";
const SubmitStyle = "flex text-center place-items-center justify-center item-center mt-5 px-4 py-2 border-none rounded-md text-lg cursor-pointer disabled:cursor-not-allowed text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 transform transition-transform duration-300 ease-in-out hover:scale-105 shadow-md w-1/2";
const InputStyle = "input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";
const LabelStyle = "label text-lg font-semibold text-gray-700 w-2/3 w-min-50 p-2 pr-2 text-left";
// const CheckboxStyle = "checkbox w-5 h-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent";

const InputData : {
    id: string,
    name: string,
    type: string,
    placeholder: string,
    autoComplete: string,
}[] = [
    {
        id: "name",
        name: "ชื่อ-นามสกุล",
        type: "text",
        placeholder: "ไม่ต้องใส่คำนำหน้านาม",
        autoComplete: "name",
    },
    {
        id: "tel",
        name: "เบอร์โทรศัพท์",
        type: "tel",
        placeholder: "XXXXXXXXXX",
        autoComplete: "tel",
    },
    {
        id: "age",
        name: "อายุ (ปี)",
        type: "number",
        placeholder: "",
        autoComplete: "age",
    },
    // {
    //     id: "pdpa",
    //     name: "PDPA",
    //     type: "checkbox",
    //     placeholder: "",
    //     autoComplete: "off",
    // },
];