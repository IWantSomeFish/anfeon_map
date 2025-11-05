export interface RoutePoint {
  x: number;
  y: number;
}

export interface Route {
  id: string;
  from: string; // id станции
  to: string;   // id станции
  points?: RoutePoint[]; // промежуточные точки
  smoothness?: number;   // 0–1 — коэффициент сглаживания
  type: "metro" | "monorail" | "cargo"; // тип путей
}

export const routes: Route[] = [
  {
    id: "r1",
    from: "s1",
    to: "s2",
    points: [
      { x: 420, y: 200 },
      { x: 460, y: 150 },
    ],
    smoothness: 0.4,
    type: "metro",
  },
  {
    id: "r2",
    from: "s1",
    to: "s3",
    points: [
      { x: 420, y: 360 },
      { x: 430, y: 420 },
    ],
    smoothness: 0.3,
    type: "monorail",
  },
  {
    id: "r3",
    from: "s4",
    to: "s1",
    points: [{ x: 300, y: 260 }],
    smoothness: 0.5,
    type: "cargo",
  },
];
