import "./globals.css";
import ClientProvider from "./components/ClientProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = {
  title: "Dynamic Table",
  description: "Dynamic Table",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ClientProvider>{children}</ClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
