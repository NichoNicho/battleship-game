import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "$store";
import { resetLocalGame } from "$slices/localGameSlice";
import { resetAIGame } from "$slices/aiGameSlice";

const Sidebar: React.FC = () => {
  const { t } = useTranslation("sidebar");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { text: t("playLocal"), route: "/", resetAction: resetLocalGame },
    { text: t("playAI"), route: "/play-ai", resetAction: resetAIGame },
  ];

  const handleResetAndNavigate = (route: string) => {
    dispatch(resetLocalGame());
    dispatch(resetAIGame());
    navigate(route);
  };

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
            onClick={() => handleResetAndNavigate(item.route)}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
