import React from "react";
import { Stack } from "@fluentui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SidePanel from "./sidepanel/sidepanel";
import Dashboard from "./dashboard/dashboard";
import AlertHistory from "./alerts_history/AlertHistory";
import UpdatedAlertHistory from "./alerts_history/UpdatedAlertHistory";

const App = () => {
  return (
    <Router>
      <Stack horizontal>
        <SidePanel />
        <Stack
          styles={{
            root: {
              marginLeft: 250,
              width: "calc(100% - 250px)",
              height: "100vh",
              overflow: "hidden",
            },
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alerts" element={<AlertHistory />} />
            <Route path="/upadted_alerts" element={<UpdatedAlertHistory />} />
          </Routes>
        </Stack>
      </Stack>
    </Router>
  );
};

export default App;
