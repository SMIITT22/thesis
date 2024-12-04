import React, { useState, useEffect } from "react";
import { Nav } from "@fluentui/react";
import { useNavigate, useLocation } from "react-router-dom";

const SidePanel = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  const navStyles = {
    root: {
      width: 250,
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#f3f2f1",
      overflow: "hidden",
    },
  };

  const navLinkGroups = [
    {
      links: [
        {
          name: "Dashboard",
          url: "/dashboard",
          key: "dashboard",
          onClick: () => handleNavClick("dashboard"),
        },
        {
          name: "Alert History",
          url: "/alerts",
          key: "alertHistory",
          onClick: () => handleNavClick("alertHistory"),
        },
      ],
    },
  ];

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelectedKey("dashboard");
    } else if (location.pathname === "/alerts") {
      setSelectedKey("alertHistory");
    }
  }, [location.pathname]);

  const handleNavClick = (key) => {
    setSelectedKey(key);
    navigate(navLinkGroups[0].links.find((link) => link.key === key).url);
  };

  return (
    <Nav
      groups={navLinkGroups}
      selectedKey={selectedKey}
      styles={navStyles}
      ariaLabel="Side Navigation Panel"
    />
  );
};

export default SidePanel;
