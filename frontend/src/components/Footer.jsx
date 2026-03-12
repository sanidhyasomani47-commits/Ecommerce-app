import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
function Footer() {
  const { navigate } = useContext(ShopContext);
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            ratione autem impedit voluptatem eaque? Ad numquam eos libero esse
            rem.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </li>

            <li onClick={() => navigate("/about")} className="cursor-pointer">
              About us
            </li>

            <li onClick={() => navigate("/#policy")} className="cursor-pointer">
              Policy
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-121-444-7176</li>
            <li>contact@foraveryou.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-4 text-sm text-center">
          Copyright {new Date().getFullYear()} forever.com - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
