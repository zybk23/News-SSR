"use client";
import { Provider } from "react-redux";
import { Navigation } from "@/components";
import store from "../../store";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <Navigation />
          {children}
        </body>
      </Provider>
    </html>
  );
}
