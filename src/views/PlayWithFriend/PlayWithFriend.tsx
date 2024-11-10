import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

const PlayWithFriend: React.FC = () => {
  const { t } = useTranslation("playWithFriend");

  return (
    <Box p={2}>
      <Typography variant="h4">{t("title")}</Typography>
      <Typography variant="body1">{t("description")}</Typography>
    </Box>
  );
};

export default PlayWithFriend;
