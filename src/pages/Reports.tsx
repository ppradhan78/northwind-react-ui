import { useState } from "react";
export default function Reports() {
  const [reportName, setReportName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reportName.trim()) {
      return;
    }
    // replace with API call or business logic
    console.log("Submitted report:", reportName);
  };

  const handleClear = () => {
    setReportName("");
  };

  return (
    <div>
      <h1>Reports</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="reportName">Report Name</label>

        <input
          id="reportName"
          type="text"
          value={reportName}
          placeholder="Enter report name"
          onChange={(e) => setReportName(e.target.value)}
        />

        <div style={{ marginTop: "12px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
