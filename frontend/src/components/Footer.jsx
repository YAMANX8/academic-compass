import React from "react";
import Logo from "/logo.svg";
import { FaFacebookF as Facebook } from "react-icons/fa";
import {
  AiOutlineInstagram as Instagram,
  AiOutlineTwitter as Twitter,
  AiOutlineCopyrightCircle as Circle,
} from "react-icons/ai";
import { PiLinkedinLogo as Inloggn } from "react-icons/pi";
import { Link } from "react-router-dom";

function Footer() {
  const social = "w-[25px] h-[25px] text-accent dark:text-accent-dark transition-all duration-1000 ease-in-out-back";
  return (
    <footer>
      <div className="w-full px-[120px] py-[90px] flex items-center justify-between tracking-tight leading-6  bg-secondary dark:bg-secondary-dark transition-all duration-1000 ease-in-out-back whitespace-nowrap">
        <div className="flex flex-col items-center gap-[16px]">
          <img src={Logo} alt="logo" className="w-[203px]" />
          <div className="flex gap-8">
            <Facebook className={`${social}`} />
            <Instagram className={`${social}`} />
            <Inloggn className={`${social}`} />
            <Twitter className={`${social}`} />
          </div>
        </div>

        <div className="font-medium  text-[20px] flex flex-col gap-4 transition-all duration-1000 ease-in-out-back text-dark dark:text-light">
          <Link to="/register-instructor" className="hover:underline">
            Teach on Academic Compass
          </Link>
          <Link to="/roadmaps" className=" hover:underline">
            Roadmaps
          </Link>
          <Link to="/about" className=" hover:underline">
            About us
          </Link>
          <Link to="/contact" className=" hover:underline">
            Contact us
          </Link>
        </div>

        <div className="font-medium text-[20px] gap-4 flex flex-col transition-all duration-1000 ease-in-out-back text-dark dark:text-light">
          <Link to="/term" className="hover:underline">
            Term
          </Link>
          <Link to="/privacy" className=" hover:underline">
            Privacy policy
          </Link>
          <Link to="/cookie" className=" hover:underline">
            Cookie settings
          </Link>
          <Link to="/sitemap" className=" hover:underline">
            Sitemap
          </Link>
        </div>
      </div>
      <div className=" text-light py-[30px] font-semibold  bg-primary flex tracking-tight leading-6  items-center justify-center ">
        <Circle />
        {"\u00A0"} 2023 Academic Compass
      </div>
    </footer>
  );
}

export default Footer;
