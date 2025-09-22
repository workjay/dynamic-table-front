"use client";

import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getTableDataAction } from "../redux/reducers/common";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const PrimaryTable = ({ selectedTable = "" }) => {
  const { tableData } = useSelector((state) => state.common);
  const { tables } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 10,
    sort: "desc",
    order: "createdAt",
  });

  const columns = useMemo(() => {
    return (tables?.data ?? [])
      .find((table) => table.tableName === selectedTable)
      ?.columns?.map((column, index) => ({
        field: column?.name,
        headerName: column?.label,
        flex: 1,
        ...(column?.name === "createdAt" && {
          renderCell: (params) => {
            return moment(params.value).format("lll");
          },
        }),
      }));
  }, [tables.data, selectedTable]);

  const fetchData = useCallback(async () => {
    dispatch(
      getTableDataAction({
        tableName: selectedTable,
        order: filters?.order,
        sort: filters?.sort,
        page: filters?.page,
        limit: filters?.pageSize,
      })
    );
  }, [dispatch, selectedTable, filters]);

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedTable,
    filters?.order,
    filters?.sort,
    filters?.page,
    filters?.pageSize,
  ]);

  return (
    <div>
      <DataGrid
        loading={tableData?.isLoading || tables?.isLoading}
        rows={tableData?.data ?? []}
        columns={columns ?? []}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: filters.pageSize,
            },
          },
          sorting: {
            sortModel: [{ field: filters?.order, sort: filters?.sort }],
          },
        }}
        onPaginationModelChange={(paginationModel) => {
          console.log(paginationModel);
          setFilters({
            ...filters,
            page: paginationModel.page + 1,
            pageSize: paginationModel.pageSize,
          });
        }}
        onSortModelChange={(sortModel) => {
          setFilters({
            ...filters,
            order: sortModel[0]?.field || "createdAt",
            sort: sortModel[0]?.sort || "desc",
          });
        }}
        paginationMode="server"
        disableColumnFilter
        rowCount={tableData?.pagination?.totalItems ?? 0}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default PrimaryTable;
