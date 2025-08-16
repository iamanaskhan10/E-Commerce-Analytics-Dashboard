// src/store/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* -------------------- Async Thunks -------------------- */
export const fetchKPIs = createAsyncThunk(
  'dashboard/fetchKPIs',
  async (filters = {}) => {
    const res = await axios.get('/api/kpis', { params: filters });
    return res.data;
  }
);

export const fetchRevenueOverTime = createAsyncThunk(
  'dashboard/fetchRevenueOverTime',
  async (filters = {}) => {
    const res = await axios.get('/api/revenue', { params: filters });
    return res.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'dashboard/fetchProducts',
  async () => {
    const res = await axios.get('/api/products');
    return res.data;
  }
);

export const fetchMarketing = createAsyncThunk(
  'dashboard/fetchMarketing',
  async () => {
    const res = await axios.get('/api/marketing');
    return res.data;
  }
);

export const fetchStates = createAsyncThunk(
  'dashboard/fetchStates',
  async () => {
    const res = await axios.get('/api/states');
    return res.data;
  }
);

export const fetchDevices = createAsyncThunk(
  'dashboard/fetchDevices',
  async () => {
    const res = await axios.get('/api/devices');
    return res.data;
  }
);

/**
 * Optional helper that (re)fetches everything using current filters.
 * Call: dispatch(refreshAll());
 */
export const refreshAll = createAsyncThunk(
  'dashboard/refreshAll',
  async (_, { dispatch, getState }) => {
    const { filters } = getState().dashboard;
    await Promise.all([
      dispatch(fetchKPIs()),
      dispatch(fetchRevenueOverTime(filters)),
      dispatch(fetchProducts()),
      dispatch(fetchMarketing()),
      dispatch(fetchStates()),
      dispatch(fetchDevices()),
    ]);
    return true;
  }
);

/* -------------------- Initial State -------------------- */
const initialState = {
  loading: false,
  error: null,
  kpis: {
    ecommerceRevenue: 0,
    newCustomers: 0,
    repeatPurchaseRate: 0,
    averageOrderValue: 0,
    ecommerceConversionRate: 0,
  },
  revenueOverTime: [],
  products: [],
  marketing: [],
  states: [],
  devices: [],
  filters: {
    comparisonPeriod: 'All Time',
    startDate: null, // keep ISO e.g. '2020-02-01'
    endDate: null,   // keep ISO e.g. '2020-04-05'
  },
};

/* -------------------- Slice -------------------- */
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const incoming = action.payload || {};
      // Keep dates in ISO (YYYY-MM-DD). Do NOT convert to MM/DD/YYYY.
      const next = {
        startDate: incoming.startDate ?? state.filters.startDate ?? null,
        endDate: incoming.endDate ?? state.filters.endDate ?? null,
        comparisonPeriod:
          incoming.comparisonPeriod ?? state.filters.comparisonPeriod ?? 'All Time',
      };

      const hasChanged =
        state.filters.startDate !== next.startDate ||
        state.filters.endDate !== next.endDate ||
        state.filters.comparisonPeriod !== next.comparisonPeriod;

      if (hasChanged) state.filters = next;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- Fulfilled cases (defensive defaults) -------- */
      .addCase(fetchKPIs.fulfilled, (state, action) => {
        const k = action.payload || {};
        state.kpis = {
          ecommerceRevenue: k.ecommerceRevenue ?? 0,
          newCustomers: k.newCustomers ?? 0,
          repeatPurchaseRate: k.repeatPurchaseRate ?? 0,
          averageOrderValue: k.averageOrderValue ?? 0,
          ecommerceConversionRate: k.ecommerceConversionRate ?? 0,
        };
        state.loading = false;
      })
      .addCase(fetchRevenueOverTime.fulfilled, (state, action) => {
        state.revenueOverTime = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchMarketing.fulfilled, (state, action) => {
        state.marketing = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devices = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })

      /* -------- Pending / Rejected matchers -------- */
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
          // NOTE: We intentionally keep previous data during loading
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error?.message || 'Request failed';
        }
      );
  },
});

export const { setFilters, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
