import { useMemo, useState } from "react";

const Hierarchy = ({ rawData }) => {
  // -----------------------------
  // 1. Collect Unique SubZones For Dropdown (સર સંવાહક only)
  // -----------------------------
  const zones = useMemo(() => {
    const items = rawData
      .filter((item) => item.role === "સર સંવાહક")
      .map((item) => ({
        zone: item.subzone2,
        name: item.name,
      }));
    const unique = Array.from(new Map(items.map((obj) => [obj.zone, obj])).values());

    return unique.sort((a, b) => {
      const prefixA = a.zone[0];
      const prefixB = b.zone[0];

      if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);

      return parseInt(a.zone.slice(1)) - parseInt(b.zone.slice(1));
    });
  }, [rawData]);

  const [selectedZone, setSelectedZone] = useState();

  // -----------------------------
  // 2. Main Leader
  // -----------------------------
  const mainLeader = rawData.find(
    (item) => item.role === "સર સંવાહક" && item.subzone2 === selectedZone
  );
  const activeZone = mainLeader?.zone;

  // -----------------------------
  // 3. Filter Members inside the SAME ZONE
  // -----------------------------
  const filteredMembers = rawData.filter((x) => x.zone === activeZone);
  const sanvahak = filteredMembers.filter((x) => x.role === "સંવાહક");
  const vahak = filteredMembers.filter((x) => x.role === "વાહક");

  return (
    <div className="p-10 text-center">
      {/* Search Bar */}
      <select
        defaultValue={""}
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
        <option value="" disabled sx={{ display: "none" }}>
          -- સરસંવાહક કોડ સિલેક્ટ કરો. --
        </option>
        {zones.map((item, index) => (
          <option key={index} value={item.zone}>
            {item.zone} – {item.name}
          </option>
        ))}
      </select>

      {selectedZone ? (
        <>
          {filteredMembers.length === 0 ? (
            <h3 style={{ textAlign: "center" }}>No data available.</h3>
          ) : (
            <>
              {/* MAIN LEADER */}
              <h2 className="font-semibold" style={{ fontSize: 28 }}>
                સર સંવાહક
              </h2>

              {mainLeader ? (
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
                    {mainLeader.subzone2} – {mainLeader.name}
                  </div>
                  <div>{mainLeader.mobile}</div>
                </div>
              ) : (
                <p className="bg-gray-200 px-5 py-3 rounded-full">કોઈ સર સંવાહક મળેલ નથી</p>
              )}

              {/* સંવાહક */}
              <h3 className="font-semibold" style={{ fontSize: 24, marginTop: 20 }}>
                સંવાહક
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 40,
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                {sanvahak.length === 0 ? (
                  <p className="bg-gray-200 px-5 py-3 rounded-full">કોઈ સંવાહક મળેલ નથી</p>
                ) : (
                  <>
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
                          {item.subzone1} – {item.name}
                        </div>
                        <div>{item.mobile}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* વાહક */}
              <h3 className="font-semibold" style={{ fontSize: 24, marginTop: 10 }}>
                વાહક
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 40,
                  marginTop: 10,
                  flexWrap: "wrap",
                }}
              >
                {vahak.length === 0 ? (
                  <p className="bg-gray-200 px-5 py-3 rounded-full">કોઈ વાહક મળેલ નથી</p>
                ) : (
                  <>
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
                          {item.subzone1} – {item.name}
                        </div>
                        <div>{item.mobile}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Hierarchy;
