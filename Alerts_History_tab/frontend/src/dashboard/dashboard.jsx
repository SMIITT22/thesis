import React from "react";
import { Stack, Text } from "@fluentui/react";

const Dashboard = () => {
  return (
    <Stack
      styles={{
        root: {
          padding: 16,
          height: "100%",
        },
      }}
    >
      <Text variant="xxLarge">Dashboard</Text>
      <Text>Welcome to the Dashboard!</Text>
    </Stack>
  );
};

export default Dashboard;
