export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
}

export const stations: Station[] = [
  { id: "s1", name: "Центральная", x: 400, y: 280, region: "Центральный" },
  { id: "s2", name: "Северная", x: 400, y: 100, region: "Северный" },
  { id: "s3", name: "Южная", x: 400, y: 460, region: "Южный" },
  { id: "s4", name: "Западная", x: 200, y: 280, region: "Западный" },
  { id: "s5", name: "Восточная", x: 600, y: 280, region: "Восточный" },
  { id: "s6", name: "Аэропорт", x: 580, y: 120, region: "Северный" },
  { id: "s7", name: "Прибрежная", x: 620, y: 420, region: "Южный" },
  { id: "s7", name: "Прибрежная", x: 800, y: 420, region: "Южный" },
];
