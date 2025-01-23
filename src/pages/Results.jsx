//import { useEffect, useState } from "react";
import { AllRecordsTable } from "@/components/AllRecordsTable";
import { NavBar } from "@/components/ui/NavBar";

export function Results() {
  return (
    <div>
      <NavBar />
      <br />
      <h2>All Submitted Runs:</h2>
      <AllRecordsTable />
    </div>
  );
}
