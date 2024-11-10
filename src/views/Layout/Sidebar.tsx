import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar: React.FC = () => {
  const { t } = useTranslation("sidebar");

  const menuItems = [
    { text: t("playLocal"), route: "/play-local" },
    { text: t("playAI"), route: "/play-ai" },
  ];

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={NavLink} to={item.route}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
