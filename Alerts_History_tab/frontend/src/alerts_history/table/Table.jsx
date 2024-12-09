import React, { useEffect, useState } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  ScrollbarVisibility,
} from "@fluentui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlerts } from "../../redux/slices/alertsSlice";
import { orderBy } from "lodash";

const Table = ({ totalLimit }) => {
  const dispatch = useDispatch();
  const {
    alerts = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.alerts);
  const [sortedAlerts, setSortedAlerts] = useState([]);
  const [sortColumnKey, setSortColumnKey] = useState(null);
  const [isSortedDescending, setIsSortedDescending] = useState(false);

  useEffect(() => {
    if (!alerts.length) {
      dispatch(fetchAlerts({ totalLimit }));
    } else {
      setSortedAlerts(alerts);
    }
  }, [dispatch, alerts, totalLimit]);

  const getIteratee = (colName) => {
    switch (colName) {
      case "checkdata.type":
        return (alert) => alert.checkdata.type.toLowerCase();
      case "details":
        return (alert) => alert.details.toLowerCase();
      case "state":
        return (alert) => alert.state.toLowerCase();
      case "devicename":
        return (alert) => alert.devicename.toLowerCase();
      case "foundat":
      case "resolvedat":
        return (alert) => new Date(alert[colName]);
      case "teamviewerid":
        return (alert) => alert.teamviewerid;
      default:
        return (alert) => alert[colName];
    }
  };

  const onColumnClick = (_, column) => {
    const columnKey = column.key;

    const newIsSortedDescending =
      sortColumnKey === columnKey ? !isSortedDescending : false;

    const order = transformSortOrder(columnKey, newIsSortedDescending);

    const startTime = Date.now();

    const sorted = orderBy(sortedAlerts, [getIteratee(columnKey)], [order]);

    const endTime = Date.now();
    console.log(
      `Sorting on column "${column.name}" took ${
        endTime - startTime
      } ms with order "${order}".`
    );

    setSortedAlerts(sorted);
    setSortColumnKey(columnKey);
    setIsSortedDescending(newIsSortedDescending);
  };

  const transformSortOrder = (colName, isDescending) => {
    if (colName === "state") {
      return isDescending ? "asc" : "desc";
    }
    return isDescending ? "desc" : "asc";
  };

  const columns = [
    {
      key: "checkdata.type",
      name: "ALERT TYPE",
      fieldName: "checkdata.type",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "checkdata.type",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => item.checkdata.type,
    },
    {
      key: "state",
      name: "STATUS",
      fieldName: "state",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      isSorted: sortColumnKey === "state",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => item.state,
    },
    {
      key: "details",
      name: "DESCRIPTION",
      fieldName: "details",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
      isSorted: sortColumnKey === "details",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => item.details,
    },
    {
      key: "devicename",
      name: "DEVICE",
      fieldName: "devicename",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "devicename",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => item.devicename,
    },
    {
      key: "foundat",
      name: "FOUND AT",
      fieldName: "foundat",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "foundat",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => new Date(item.foundat).toLocaleString(),
    },
    {
      key: "resolvedat",
      name: "RESOLVED AT",
      fieldName: "resolvedat",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "resolvedat",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) =>
        item.resolvedat ? new Date(item.resolvedat).toLocaleString() : "",
    },
    {
      key: "teamviewerid",
      name: "TEAMVIEWER ID",
      fieldName: "teamviewerid",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "teamviewerid",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
      onRender: (item) => item.teamviewerid,
    },
  ];

  return (
    <div style={{ height: "calc(100vh - 100px)", position: "relative" }}>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <DetailsList
            items={sortedAlerts}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            checkboxVisibility={0}
            onRenderDetailsHeader={(props, defaultRender) => (
              <Sticky stickyPosition={StickyPositionType.Header}>
                {defaultRender(props)}
              </Sticky>
            )}
          />
        </ScrollablePane>
      )}
    </div>
  );
};

export default Table;
