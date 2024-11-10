import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation("sidebar");

  const menuItems = [
    { text: t("playLocal"), route: "/" },
    { text: t("playAI"), route: "/play-ai" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.route}
            sx={{
              color: "white",
              "&.active": {
                backgroundColor: "#1976d2",
                color: "#fff",
              },
              textDecoration: "none",
              width: "100%",
              padding: "8px 16px",
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
