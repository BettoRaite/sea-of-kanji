import type { Metadata } from "next";
import "../globals.css";

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
          {children}
        </div>
      </body>
    </html>
  );
}
