import type { Metadata } from "next";
import SupplementsClient from "./supplements-client";

export const metadata: Metadata = {
  title: "Supplement Protocol | Live Health & Prosper",
  description:
    "Bryan Johnson's Blueprint supplement protocol — morning, noon, and night schedule with dosages and purposes.",
};

export default function SupplementsPage() {
  return <SupplementsClient />;
}
