// import ReduxProvider from "@/src/providers/ReduxProvider";
// // @ts-ignore
// import "./globals.css";
// import Counter from "@/src/components/Counter";
// Counter

// export const metadata = {
//   title: "My App",
//   description: "Next.js + Redux Toolkit"
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>
//            {/* <AuthStatus /> */}
//           {children}
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }




// src/app/layout.tsx
"use client"; // needed because ReduxProvider uses hooks

import React from "react";
import ReduxProvider from "@/src/providers/ReduxProvider";
//@ts-ignore
import "./globals.css";
import { store } from "@/src/lib/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
