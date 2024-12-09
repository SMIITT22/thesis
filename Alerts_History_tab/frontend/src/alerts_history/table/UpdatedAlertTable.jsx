import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import {
  fetchScrollableAlerts,
  resetScrollableAlerts,
} from "../../redux/slices/scrollableAlertsSlice";

const UpdatedAlertTable = ({ totalLimit = 10000 }) => {
  const dispatch = useDispatch();
  const {
    alerts = [],
    loading = false,
    error = null,
    paginationToken,
  } = useSelector((state) => state.scrollableAlerts);

  const [sortColumnKey, setSortColumnKey] = useState(null);
  const [isSortedDescending, setIsSortedDescending] = useState(false);

  const fetchSortedData = useCallback(
    (columnKey, sortOrder) => {
      dispatch(resetScrollableAlerts());
      dispatch(
        fetchScrollableAlerts({
          limit: 50,
          sortColumn: columnKey,
          sortOrder,
          totalLimit,
        })
      );
    },
    [dispatch, totalLimit]
  );

  const onColumnClick = useCallback(
    (_, column) => {
      const columnKey = column.key;
      const newIsSortedDescending =
        sortColumnKey === columnKey ? !isSortedDescending : false;

      setSortColumnKey(columnKey);
      setIsSortedDescending(newIsSortedDescending);

      fetchSortedData(columnKey, newIsSortedDescending ? "desc" : "asc");
    },
    [sortColumnKey, isSortedDescending, fetchSortedData]
  );

  useEffect(() => {
    dispatch(resetScrollableAlerts());
    dispatch(
      fetchScrollableAlerts({
        limit: 50,
        totalLimit,
      })
    );
  }, [dispatch, totalLimit]);

  const loadMoreData = useCallback(() => {
    if (!loading && paginationToken) {
      dispatch(
        fetchScrollableAlerts({
          limit: 50,
          paginationToken,
          sortColumn: sortColumnKey,
          sortOrder: isSortedDescending ? "desc" : "asc",
          totalLimit,
        })
      );
    }
  }, [
    dispatch,
    paginationToken,
    loading,
    sortColumnKey,
    isSortedDescending,
    totalLimit,
  ]);

  const columns = useMemo(
    () => [
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
        onRender: (item) => item.checkdata.type || "",
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
        onRender: (item) => item.state || "",
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
        onRender: (item) => item.details || "",
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
        onRender: (item) => item.devicename || "",
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
        onRender: (item) =>
          item.foundat ? new Date(item.foundat).toLocaleString() : "",
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
        onRender: (item) => item.teamviewerid || "",
      },
    ],
    [sortColumnKey, isSortedDescending, onColumnClick]
  );

  const handleScroll = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    console.log(
      "scrollHeight:",
      scrollHeight,
      "scrollTop:",
      scrollTop,
      "clientHeight:",
      clientHeight
    );

    if (scrollHeight - scrollTop - clientHeight < 10) {
      console.log("Triggering loadMoreData");
      loadMoreData();
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 100px)",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.auto}
          onScroll={handleScroll}
        >
          <DetailsList
            items={alerts}
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

export default UpdatedAlertTable;
