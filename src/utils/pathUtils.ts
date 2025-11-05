import { RoutePoint } from "../data/routes";

export function buildSmoothPath(
  points: RoutePoint[],
  smoothness = 0.3
): string {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const dx1 = curr.x - prev.x;
    const dy1 = curr.y - prev.y;
    const dx2 = next.x - curr.x;
    const dy2 = next.y - curr.y;

    const c1x = curr.x - dx1 * smoothness;
    const c1y = curr.y - dy1 * smoothness;
    const c2x = curr.x + dx2 * smoothness;
    const c2y = curr.y + dy2 * smoothness;

    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next.x} ${next.y}`;
  }

  return path;
}
