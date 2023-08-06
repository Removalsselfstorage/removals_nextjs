import React from "react";

const MenuLink = ({pathname}) => {
  return (
    <div
      className={`${
        pathname === "/mover-profile" ? "bg-primary/10 text-primary" : ""
      } flex btn-nav py-[15px]`}
    >
      <span className="text-[20px] mr-[10px]">
        <CgProfile />
      </span>
      <a className="">Dashboard</a>
    </div>
  );
};

export default MenuLink;
