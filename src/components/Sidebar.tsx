import React, { useState } from "react";
import { Station } from "../data/stations";
import "./Sidebar.css";

interface Props {
  stations: Station[];
}

export default function SlidingSidebar({ stations }: Props) {
  const [open, setOpen] = useState(true);

  // Группируем станции по регионам
  const grouped = stations.reduce<Record<string, Station[]>>((acc, st) => {
    if (!acc[st.region]) acc[st.region] = [];
    acc[st.region].push(st);
    return acc;
  }, {});

  return (
    <div className={`sidebar-container ${open ? "open" : "closed"}`}>
      <aside className="sidebar">
        <h2 className="sidebar-title">Станции по регионам</h2>

        <div className="sidebar-regions">
          {Object.entries(grouped).map(([region, items]) => (
            <div key={region} className="region-group">
              <h3>{region}</h3>
              <ul>
                {items.map((st) => (
                  <li key={st.id}>{st.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="sidebar-footer">© 2025 Городтранс</footer>
      </aside>

      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? "⮜" : "⮞"}
      </button>
    </div>
  );
}
