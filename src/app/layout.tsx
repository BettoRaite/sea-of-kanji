import type { Metadata } from "next";
import "../globals.css";
import { BottomMenu } from "@/components/BottomMenu/BottomMenu";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root" className="">
          {/* <Provider store={store}> */}
          {children}
          <BottomMenu />
          {/* </Provider> */}
        </div>
      </body>
    </html>
  );
}
