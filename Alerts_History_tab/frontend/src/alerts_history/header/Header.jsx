import React from "react";
import { Stack, Text } from "@fluentui/react";

const Header = ({ title, description }) => {
  return (
    <Stack
      styles={{
        root: {
          padding: "16px 16px 0 16px",
          overflow: "hidden",
          height: 100,
          boxSizing: "border-box",
        },
      }}
    >
      <Text variant="xxLarge">{title}</Text>
      <Text>{description}</Text>
    </Stack>
  );
};

export default Header;
