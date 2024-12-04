import React, { useState, useMemo } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  CheckboxVisibility,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  ScrollbarVisibility,
} from "@fluentui/react";

const Table = () => {
  const items = useMemo(
    () => [
      {
        key: 1,
        alertType: "CPU usage",
        status: "Detected",
        description: "CPU usage was above 5%",
        device: "TVDPF4PC2",
        duration: "2 days",
        foundAt: "Sep 13, 2024, 5:00 PM",
        acknowledgeAt: "Sep 14, 2024, 5:00 PM",
        group: "Group A",
      },
      {
        key: 2,
        alertType: "System update",
        status: "Resolved",
        description: "System updates were available",
        device: "DFGRTD3PC9",
        duration: "2 minutes",
        foundAt: "Sep 10, 2024, 4:00 PM",
        acknowledgeAt: "Sep 11, 2024, 4:00 PM",
        group: "Group B",
      },
      {
        key: 3,
        alertType: "Network adapter traffic",
        status: "Acknowledged",
        description: "Available memory is below 64000 MB",
        device: "KLOPMT7GQ3",
        duration: "100 days",
        foundAt: "Aug 30, 2024, 6:00 PM",
        acknowledgeAt: "Sep 1, 2024, 6:00 PM",
        group: "Group C",
      },
    ],
    []
  );

  const [sortedItems, setSortedItems] = useState(items);
  const [sortColumnKey, setSortColumnKey] = useState(null);
  const [isSortedDescending, setIsSortedDescending] = useState(false);

  const onColumnClick = (_, column) => {
    const newIsSortedDescending =
      sortColumnKey === column.key ? !isSortedDescending : false;

    const sorted = copyAndSort(
      sortedItems,
      column.fieldName,
      newIsSortedDescending
    );

    setSortedItems(sorted);
    setSortColumnKey(column.key);
    setIsSortedDescending(newIsSortedDescending);
  };

  const copyAndSort = (items, fieldName, isDescending) => {
    return [...items].sort((a, b) => {
      let aValue = a[fieldName];
      let bValue = b[fieldName];

      switch (fieldName) {
        case "status":
          const statusOrder = ["Detected", "Acknowledged", "Resolved"];
          aValue = statusOrder.indexOf(aValue);
          bValue = statusOrder.indexOf(bValue);
          break;
        case "duration":
          aValue = parseDuration(aValue);
          bValue = parseDuration(bValue);
          break;
        case "foundAt":
        case "acknowledgeAt":
          aValue = new Date(aValue);
          bValue = new Date(bValue);
          break;
        default:
          break;
      }

      if (aValue < bValue) return isDescending ? 1 : -1;
      if (aValue > bValue) return isDescending ? -1 : 1;
      return 0;
    });
  };

  const parseDuration = (duration) => {
    const durationMap = { days: 1440, hours: 60, minutes: 1 };
    const [value, unit] = duration.split(" ");
    return parseInt(value) * (durationMap[unit] || 1);
  };

  const columns = [
    {
      key: "alertType",
      name: "ALERT TYPE",
      fieldName: "alertType",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "alertType",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "status",
      name: "STATUS",
      fieldName: "status",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      isSorted: sortColumnKey === "status",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "description",
      name: "DESCRIPTION",
      fieldName: "description",
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
      isSorted: sortColumnKey === "description",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "device",
      name: "DEVICE",
      fieldName: "device",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "device",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "duration",
      name: "DURATION",
      fieldName: "duration",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      isSorted: sortColumnKey === "duration",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "foundAt",
      name: "FOUND AT",
      fieldName: "foundAt",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "foundAt",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "acknowledgeAt",
      name: "ACKNOWLEDGE AT",
      fieldName: "acknowledgeAt",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "acknowledgeAt",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
    {
      key: "group",
      name: "GROUP",
      fieldName: "group",
      minWidth: 150,
      maxWidth: 200,
      isResizable: true,
      isSorted: sortColumnKey === "group",
      isSortedDescending: isSortedDescending,
      onColumnClick: onColumnClick,
    },
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 100px)",
        position: "relative",
      }}
    >
      <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
        <DetailsList
          items={sortedItems}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          checkboxVisibility={CheckboxVisibility.hidden}
          onRenderDetailsHeader={(props, defaultRender) => (
            <Sticky stickyPosition={StickyPositionType.Header}>
              {defaultRender(props)}
            </Sticky>
          )}
        />
      </ScrollablePane>
    </div>
  );
};

export default Table;
