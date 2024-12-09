import React from "react";
import Header from "./header/Header";
import Table from "./table/Table";

const AlertsPanel = () => {
  return (
    <>
      <Header />
      <Table totalLimit={400} />
    </>
  );
};

export default AlertsPanel;
