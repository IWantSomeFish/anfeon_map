export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  region: string;
  icon?: string; // добавлено
}

export const stations: Station[] = [
  {
    id: "s1",
    name: "Центральная",
    x: 400,
    y: 280,
    region: "Центральный",
    icon: "/icons/metro.svg",
  },
  {
    id: "s2",
    name: "Аэропорт",
    x: 580,
    y: 120,
    region: "Северный",
    icon: "/icons/airport.svg",
  },
  {
    id: "s3",
    name: "Прибрежная",
    x: 620,
    y: 420,
    region: "Южный",
    icon: "/icons/port.svg",
  },
  {
    id: "s4",
    name: "Западная",
    x: 200,
    y: 280,
    region: "Западный",
  },
  {
    id: "s5",
    name: "Восточная",
    x: 600,
    y: 280,
    region: "Восточный",
  },
];
