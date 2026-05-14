import { useState } from "react";
import { getHealthStatus } from "../services/healthService";

function Dashboard() {

  const [status, setStatus] = useState("");
  const [postgresVersion, setPostgresVersion] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [loading, setLoading] = useState(false);

  const loadHealth = async () => {

    try {

      setLoading(true);

      const response = await getHealthStatus();

      console.log("API Response:", response);

      setStatus(response.status || "Unknown");
      setPostgresVersion(response.postgres_version || "N/A");
      setCurrentTime(response.current_time || "N/A");

    } catch (error) {

      console.error("Error fetching health status:", error);

      setStatus("Service Unavailable");
      setPostgresVersion("Service Unavailable");
      setCurrentTime("Service Unavailable");

    } finally {

      setLoading(false);

    }

  };

  return (
<div style={{ padding: "40px" }}>
<h1>Welcome! Check my health</h1>
<button
        onClick={loadHealth}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          opacity: loading ? 0.6 : 1,
        }}
>

        {loading ? "Checking..." : "Check Now"}
</button>

      {status && (
<div style={{ marginTop: "20px" }}>
<h2>Backend Status:</h2> {status}
<h2>Postgres Version:</h2> {postgresVersion}
<h2>Current Time:</h2> {currentTime}
</div>

      )}
</div>

  );

}

export default Dashboard;