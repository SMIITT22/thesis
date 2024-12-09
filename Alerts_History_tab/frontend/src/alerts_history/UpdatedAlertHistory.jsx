import React from "react";
import Header from "./header/Header";
import UpdatedAlertTable from "./table/UpdatedAlertTable";

const UpdatedAlertHistory = () => {
  return (
    <>
      <Header
        title="Updated Alert History"
        description="History of updated alerts with enhancements"
      />
      <UpdatedAlertTable />
    </>
  );
};

export default UpdatedAlertHistory;
