import React from "react";
import { Stack, Text } from "@fluentui/react";

const Header = () => {
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
      <Text variant="xxLarge">Alert History</Text>
      <Text>All the alerts history</Text>
    </Stack>
  );
};

export default Header;
