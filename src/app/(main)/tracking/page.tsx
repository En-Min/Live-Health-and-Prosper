import type { Metadata } from "next";
import { TrackingClient } from "./tracking-client";

export const metadata: Metadata = {
  title: "Tracking",
};

export default function TrackingPage() {
  return <TrackingClient />;
}
