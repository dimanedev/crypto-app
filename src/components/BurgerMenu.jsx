import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";

const BurgerMenu = ({ navLinks }) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const sidebar = useRef();
  const burgerBtn = useRef();

  const toggleSidebar = () => {
    sidebar.current.classList.toggle("sidebar_active");
    setIsSidebarOpened(!isSidebarOpened);
  };

  const removeSidebar = () => {
    sidebar.current.classList.remove("sidebar_active");
    setIsSidebarOpened(false);
  };

  const handleWindowClick = (e) => {
    if (e.path.includes(burgerBtn.current)) return;

    if (!e.path.includes(sidebar.current)) removeSidebar();
  };

  useEffect(() => {
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      <button ref={burgerBtn} className="burger-btn" onClick={toggleSidebar}>
        {isSidebarOpened ? <CloseOutlined /> : <MenuOutlined />}
      </button>
      <div ref={sidebar} className="sidebar">
        <nav className="sidebar-nav">
          <ul className="sidebar-nav__list">
            {navLinks.map((link) => (
              <li className="sidebar-nav__list-item" key={link.title}>
                <NavLink onClick={removeSidebar} to={link.to}>
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default BurgerMenu;
