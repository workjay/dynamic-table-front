import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/app/axiosInstance";
import { ENDPOINTS } from "@/app/constants/endpoints";
import { API_INITIAL_STATE } from "@/app/constants";

const initialState = {
  tables: API_INITIAL_STATE,
  tableData: API_INITIAL_STATE,
};

export const getTablesAction = createAsyncThunk(
  "common/getTables",
  async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.GET_TABLES);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTableDataAction = createAsyncThunk(
  "common/getTableData",
  async (params) => {
    try {
      const { tableName, ...rest } = params;
      const response = await axiosInstance.get(
        ENDPOINTS.GET_TABLE_DATA(tableName),
        {
          params: rest,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTablesAction.pending, (state) => {
        return {
          ...state,
          tables: {
            ...state.tables,
            isLoading: true,
          },
        };
      })
      .addCase(getTablesAction.fulfilled, (state, action) => {
        return {
          ...state,
          tables: {
            isLoading: false,
            ...action.payload,
          },
        };
      })
      .addCase(getTablesAction.rejected, (state, action) => {
        return {
          ...state,
          tables: {
            isLoading: false,
            ...action.payload,
          },
        };
      })
      .addCase(getTableDataAction.pending, (state) => {
        return {
          ...state,
          tableData: {
            ...state.tableData,
            isLoading: true,
          },
        };
      })
      .addCase(getTableDataAction.fulfilled, (state, action) => {
        return {
          ...state,
          tableData: {
            isLoading: false,
            ...action.payload,
          },
        };
      })
      .addCase(getTableDataAction.rejected, (state, action) => {
        return {
          ...state,
          tableData: {
            isLoading: false,
            ...action.payload,
          },
        };
      });
  },
});
export const {} = commonSlice.actions;

export default commonSlice.reducer;
