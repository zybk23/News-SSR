"use client";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { Navigation } from "@/components";
import store from "../../store";

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
