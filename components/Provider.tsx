"use client";

import { SessionProvider } from "next-auth/react";

// export default function Provider({
//   children,
//   session,
// }: {
//   children: React.ReactNode;
//   session: any;
// }) {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }

const Provider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => <SessionProvider session={session}>{children}</SessionProvider>;

export default Provider;
