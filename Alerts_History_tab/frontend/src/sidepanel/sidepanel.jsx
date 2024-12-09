import React from "react";
import { Nav } from "@fluentui/react";
import { useNavigate, useLocation } from "react-router-dom";

const SidePanel = () => {
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
        },
        {
          name: "Alert History",
          url: "/alerts",
          key: "alertHistory",
        },
        {
          name: "Upadted Alert History",
          url: "/upadted_alerts",
          key: "upadtedAlertHistory",
        },
      ],
    },
  ];

  const selectedKey = navLinkGroups[0].links.find(
    (link) => location.pathname === link.url
  )?.key;

  const handleNavClick = (event, link) => {
    event.preventDefault();
    navigate(link.url);
  };

  return (
    <Nav
      groups={navLinkGroups}
      selectedKey={selectedKey}
      styles={navStyles}
      onLinkClick={handleNavClick}
      ariaLabel="Side Navigation Panel"
    />
  );
};

export default SidePanel;
