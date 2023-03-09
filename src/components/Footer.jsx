import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Link className="logo logo_small" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 132 132"
          version="1.0"
        >
          <path d="m51.40301,2.13697c-0.8,1.3 -12.8,21.8 -26.6,45.7c-15.2,26.4 -25,44.3 -24.8,45.5c0.3,2 1,2.1 14.8,2.4c8,0.1 15.4,0.1 16.5,-0.2c1.3,-0.3 5.2,-6.1 11.5,-17c5.2,-9.1 10.1,-16.8 10.8,-17.1c0.8,-0.3 2,-0.1 2.8,0.3c2.3,1.3 21.5,35.4 21.2,37.6c-0.3,2 -1.1,2.1 -19.4,2.6c-13.2,0.3 -19.6,0.9 -20.6,1.8c-1.9,1.6 -14.8,23.8 -14.8,25.5c0,3.6 1.3,3.7 54.7,3.7c50.2,0 52.3,-0.1 53.2,-1.9c1.1,-2 3.8,2.8 -49.4,-89.6c-12,-20.9 -22.5,-38.8 -23.3,-39.8c-2.1,-2.4 -4.9,-2.1 -6.6,0.5z" />
        </svg>
        <span>Crypto app</span>
      </Link>
      <span>All rights reserved</span>
      <span>Provided by Dmytro Nediev</span>
      <div className="footer__nav">
        <Link to="/">Home</Link>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/news">News</Link>
      </div>
    </footer>
  );
};

export default Footer;
