import { useState } from "react";

const Hierarchy = ({ rawData }) => {
  const zones = [...new Set(rawData.map((item) => item.zone))].sort((a, b) => {
    const numA = parseInt(a.replace("Z", ""));
    const numB = parseInt(b.replace("Z", ""));
    return numA - numB;
  });
  const [selectedZone, setSelectedZone] = useState(zones[0]);

  // Filter by Zone
  const filtered = rawData.filter((x) => x.zone === selectedZone);

  if (filtered.length === 0) {
    return <h3 style={{ textAlign: "center" }}>No data available.</h3>;
  }

  const mainLeader = filtered.find((item) => item.role_gujarati === "સર સંવાહક");

  // Grouping
  const sanvahak = filtered.filter((x) => x.subzone1.startsWith("S"));
  const vahak = filtered.filter((x) => x.subzone1.startsWith("V"));

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      {/* Search Bar */}
      <select
        value={selectedZone}
        onChange={(e) => setSelectedZone(e.target.value)}
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid black",
        }}
      >
        {zones.map((zone, index) => (
          <option key={index} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      {/* Top Leader */}
      <h2 style={{ fontSize: 28 }}>સર સંવાહક</h2>

      <div
        style={{
          border: "2px solid black",
          borderRadius: 20,
          padding: 20,
          display: "inline-block",
          minWidth: 300,
          fontSize: 18,
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          {mainLeader.zone} – {mainLeader.reporting_to}
        </div>
        <div>{mainLeader.mobile}</div>
      </div>

      {/* સંવાહક */}
      <h3 style={{ fontSize: 24, marginTop: 20 }}>સંવાહક</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 20,
          flexWrap: "wrap",
        }}
      >
        {sanvahak.map((item) => (
          <div
            key={item.id}
            style={{
              border: "2px solid black",
              borderRadius: "50%",
              padding: 20,
              width: 220,
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {item.subzone1} – {item.name_gujarati}
            </div>
            <div>{item.mobile}</div>
          </div>
        ))}
      </div>

      {/* વાહક */}
      <h3 style={{ fontSize: 24, marginTop: 10 }}>વાહક</h3>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
          marginTop: 10,
          flexWrap: "wrap",
        }}
      >
        {vahak.map((item) => (
          <div
            key={item.id}
            style={{
              border: "2px solid black",
              borderRadius: "50%",
              padding: 20,
              width: 220,
              height: 120,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              {item.subzone1} – {item.name_gujarati}
            </div>
            <div>{item.mobile}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hierarchy;
