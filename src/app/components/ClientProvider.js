"use client";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
}
