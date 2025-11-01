import React from "react";
import { Station } from "../data/stations";
import "./MapCanvas.css";

interface MapCanvasProps {
  stations: Station[];
}

export default function MapCanvas({ stations }: MapCanvasProps) {
  return (
    <div className="map-container">
      <svg className="map-svg" width="100%" height="100%">
        {stations.map((st) => (
          <g key={st.id}>
            <circle
              cx={st.x}
              cy={st.y}
              r="6"
              fill="#ffd700"
              stroke="#222"
              strokeWidth="1.5"
            />
            <text
              x={st.x + 10}
              y={st.y + 5}
              fill="white"
              fontSize="14"
              fontFamily="sans-serif"
            >
              {st.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
