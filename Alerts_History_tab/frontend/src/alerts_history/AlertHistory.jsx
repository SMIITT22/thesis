import React from "react";
import Header from "./header/Header";
import AlertTable from "./table/AlertTable";

const AlertsPanel = () => {
  return (
    <>
      <Header title="Alert History" description="All the alerts history" />
      <AlertTable totalLimit={50000} />
    </>
  );
};

export default AlertsPanel;
