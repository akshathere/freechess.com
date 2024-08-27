import React from "react";
export default function  BButton({onClick,children} : {onClick: ()=> void,children: React.ReactNode}){
    return <>
    <button className="bg-lblacki rounded-lg p-2 shadow-lg mb-10 w-52 lg:w-80" onClick={onClick}>
                            {children}
                    </button >
    </>
}