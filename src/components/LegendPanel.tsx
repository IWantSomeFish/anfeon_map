import React, { useState } from "react";
import "./LegendPanel.css";

export default function LegendPanel() {
  const [open, setOpen] = useState(true);

  return (
    <div className={`legend-container ${open ? "open" : "closed"}`}>
      {/* Панель */}
      <aside className="legend-panel">
        <h3 className="legend-title">Легенда карты</h3>
        <ul className="legend-list">
          <li><span className="color-swatch gold"></span> Золотой — обычные рельсы</li>
          <li><span className="color-swatch cyan"></span> Бирюзовый — монорельс</li>
          <li><span className="color-swatch purple"></span> Фиолетовый — грузовые пути</li>
        </ul>
      </aside>

      {/* Кнопка, следящая за панелью */}
      <button className="legend-toggle" onClick={() => setOpen(!open)}>
        {open ? "⮟" : "⮝"}
      </button>
    </div>
  );
}
