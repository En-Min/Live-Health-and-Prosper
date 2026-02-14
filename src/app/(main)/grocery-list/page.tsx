import type { Metadata } from "next";
import { GroceryListClient } from "./grocery-list-client";

export const metadata: Metadata = {
  title: "Grocery List",
};

export default function GroceryListPage() {
  return <GroceryListClient />;
}
