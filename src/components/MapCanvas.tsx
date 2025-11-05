import React, { useRef, useState, useEffect } from "react";
import { Station } from "../data/stations";
import { Route } from "../data/routes";
import { buildSmoothPath } from "../utils/pathUtils";
import { pathColors } from "../data/pathColors";
import "./MapCanvas.css";

interface MapCanvasProps {
  stations: Station[];
  routes: Route[];
}

// размеры «подложки» карты
const MAP_WIDTH = 1600;
const MAP_HEIGHT = 900;

export default function MapCanvas({ stations, routes }: MapCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: rect.width / 2 - MAP_WIDTH / 2,
        y: rect.height / 2 - MAP_HEIGHT / 2,
      });
    }
  }, []);

  // Ограничения для перемещения
  const clampOffset = (
    x: number,
    y: number,
    scale: number,
    containerWidth: number,
    containerHeight: number
  ) => {
    const scaledWidth = MAP_WIDTH * scale;
    const scaledHeight = MAP_HEIGHT * scale;

    const minX = containerWidth - scaledWidth;
    const minY = containerHeight - scaledHeight;
    const maxX = 0;
    const maxY = 0;

    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  };

  // Масштабирование
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    let nextScale = scale + delta;
    nextScale = Math.min(Math.max(nextScale, 1), 2);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = (mouseX - offset.x) / scale;
      const dy = (mouseY - offset.y) / scale;

      const newOffset = {
        x: mouseX - dx * nextScale,
        y: mouseY - dy * nextScale,
      };

      const clamped = clampOffset(
        newOffset.x,
        newOffset.y,
        nextScale,
        rect.width,
        rect.height
      );

      setScale(nextScale);
      setOffset(clamped);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    const rect = containerRef.current.getBoundingClientRect();
    const clamped = clampOffset(
      offsetStart.current.x + dx,
      offsetStart.current.y + dy,
      scale,
      rect.width,
      rect.height
    );
    setOffset(clamped);
  };

  const handleMouseUp = () => setIsDragging(false);

  // === Построение линий маршрутов ===
  const getStationById = (id: string) =>
    stations.find((s) => s.id === id) || null;

  const renderRoutes = () => {
    return routes.map((r) => {
      const from = getStationById(r.from);
      const to = getStationById(r.to);
      if (!from || !to) return null;

      const allPoints = [{ x: from.x, y: from.y }, ...(r.points || []), { x: to.x, y: to.y }];
      const path = buildSmoothPath(allPoints, r.smoothness ?? 0.3);
      const color = pathColors[r.type] || "#ccc";

      return (
        <path
          key={r.id}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
        />
      );
    });
  };

  return (
    <div
      ref={containerRef}
      className="map-container"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        className="map-svg"
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* Подложка */}
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#0f172a" />

        {/* Маршруты */}
        {renderRoutes()}

        {/* Станции */}
        {stations.map((st) => (
          <g key={st.id}>
            {st.icon ? (
              <image
                href={st.icon}
                x={st.x - 10}
                y={st.y - 10}
                width="20"
                height="20"
              />
            ) : (
              <circle
                cx={st.x}
                cy={st.y}
                r="6"
                fill="#ffd700"
                stroke="#222"
                strokeWidth="1.5"
              />
            )}
            <text
              x={st.x + 14}
              y={st.y + 6}
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
