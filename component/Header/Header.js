import React, { useEffect } from "react";
import "./Header.scss";
import Link from "next/link";
import Logo from "../Logo/Logo";
import FancyButton from "../FancyButton/FancyButton";

function Header({ currentItem }) {
  return (
    <div className="HeaderWrapper">
      <div className="Header">
        <Logo />
        <ul className="Header__menu">
          <li className="Header__menu--item">
            <Link href="/">Home</Link>
          </li>

          <li className="Header__menu--item">
            <Link href="/about">About Us</Link>
          </li>
          <li className="Header__menu--item">
            <Link href="/contact">Team</Link>
          </li>
          <li className="Header__menu--item">
            <Link href="/contact">Events</Link>
          </li>
        </ul>
        <div className="Header__actions">
          <FancyButton
            noHover
            isLink
            href="/market"
            style={{
              height: "50px",
              color: "#00FFA3",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: "25px",
            }}
          >
            The Market Blog
          </FancyButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
