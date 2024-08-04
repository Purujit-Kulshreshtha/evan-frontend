import React from "react";

const Avatar = (props: { username: string; color: string }) => {
  return (
    <div
      className="w-[100px] h-[100px] rounded-full flex justify-center items-center"
      style={{
        backgroundColor: props.color,
        boxShadow: `0 0 20px 1px ${props.color}`,
      }}
    >
      <h1 className="text-black text-5xl font-bold">{props.username[0]}</h1>
    </div>
  );
};

export default Avatar;
