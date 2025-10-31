import React, { useMemo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { stations as stationsData, stations } from "../data/stations";
import { railTypes } from "../data/railTypes";

interface Connection {
  to: string;
  type?: string;
}

interface Edge {
  from: string;
  to: string;
  type: string;
}

interface EdgeGroup {
  key: string;
  a: string;
  b: string;
  edges: Edge[];
}

interface MetroMapProps {
  width?: number;
  height?: number;
  background?: string;
}

const byId = (arr: Station[]): Map<string, Station> => {
  const m = new Map<string, Station>();
  arr.forEach((s) => m.set(s.id, s));
  return m;
};

const buildEdges = (stations: Station[]): EdgeGroup[] => {
  const nodesById = byId(stations);
  const map = new Map<string, Edge[]>();
  stations.forEach((s) => {
    (s.connections || []).forEach((conn) => {
      const a = s.id;
      const b = conn.to;
      if (!nodesById.has(b)) return;
      const key = a < b ? `${a}__${b}` : `${b}__${a}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ from: a, to: b, type: conn.type || "standard" });
    });
  });
  return Array.from(map.entries()).map(([key, edges]) => {
    const [a, b] = key.split("__");
    return { key, a, b, edges };
  });
};

const perpOffset = (x1: number, y1: number, x2: number, y2: number, offset: number) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = -dy / len;
  const uy = dx / len;
  return { ox: ux * offset, oy: uy * offset };
};

export default function MetroMap({ width = 900, height = 650, background = "/bg-map.png" }: MetroMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const stationMap = useMemo(() => byId(stationsData), []);
  const edgesGroup = useMemo(() => buildEdges(stationsData), []);
  const PARALLEL_OFFSET = 5.5;

  const handleSelectStation = (id: string) => setSelectedId(id);

  const renderLines = () => {
    const lines: Connection[] = [];
    edgesGroup.forEach((group) => {
      const aNode = stationMap.get(group.a);
      const bNode = stationMap.get(group.b);
      if (!aNode || !bNode) return;
      const count = group.edges.length;
      group.edges.forEach((edge, idx) => {
        const middle = (count - 1) / 2;
        const index = idx - middle;
        const offset = index * PARALLEL_OFFSET;
        const { ox, oy } = perpOffset(aNode.x, aNode.y, bNode.x, bNode.y, offset);
        const x1 = aNode.x + ox;
        const y1 = aNode.y + oy;
        const x2 = bNode.x + ox;
        const y2 = bNode.y + oy;
        const color = railTypes[edge.type]?.color || "#999";
        lines.push(
          <line
            key={`${group.key}__${idx}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
          />
        );
      });
    });
    return lines;
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside style={{ width: 300, padding: 10, background: "#0f1724", color: "white" }}>
        <h2>Станции</h2>
        {stationsData.map((s: Station) => (
          <div
            key={s.id}
            onClick={() => handleSelectStation(s.id)}
            style={{
              padding: 8,
              borderRadius: 6,
              background: selectedId === s.id ? "rgba(255,255,255,0.1)" : "transparent",
              cursor: "pointer",
              marginBottom: 6,
            }}
          >
            <b>{s.name}</b>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.desc}</div>
          </div>
        ))}
      </aside>

      <main style={{ flex: 1, position: "relative" }}>
        <TransformWrapper>
          <TransformComponent>
            <div style={{ width, height, position: "relative" }}>
              <img src={background} alt="bg" style={{ position: "absolute", inset: 0, opacity: 0.55 }} />
              <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
                <g>{renderLines()}</g>
                {stationsData.map((s: Station) => (
                  <g key={s.id} transform={`translate(${s.x},${s.y})`} onClick={() => handleSelectStation(s.id)}>
                    <circle r={10} fill="#fff" stroke="#111" strokeWidth={2} />
                    <circle
                      r={6}
                      fill={s.connections && s.connections[0] ? railTypes[s.connections[0].type!]?.color || "#6b7280" : "#6b7280"}
                    />
                    <text x={14} y={4} fill="#fff" fontSize={12}>{s.name}</text>
                    {selectedId === s.id && (
                      <g transform="translate(0,-28)">
                        <rect x={-80} y={-60} rx={8} width={160} height={48} fill="#0b1220" stroke="#374151" />
                        <text x={-72} y={-40} fill="#fff" fontSize={12} fontWeight={700}>{s.name}</text>
                        <text x={-72} y={-24} fill="#d1d5db" fontSize={11}>{s.desc}</text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </TransformComponent>
        </TransformWrapper>
      </main>
    </div>
  );
}
