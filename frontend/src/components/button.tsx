import React from "react";
export default function  Button({onClick,children} : {onClick: ()=> void,children: React.ReactNode}){
    return <>
    <button className="bg-green rounded-lg p-3 shadow-lg mb-10 w-96" onClick={onClick}>
                            {children}
                    </button >
    </>
}