export const stations = [
  {
    id: "central",
    name: "Центральная",
    x: 450,
    y: 332,
    desc: "Главный пересадочный узел города.",
    connections: [
      { to: "north", type: "standard" },
      { to: "east", type: "monorail" },
      { to: "west", type: "cargo" }
    ]
  },
  {
    id: "north",
    name: "Северная",
    x: 400,
    y: 150,
    desc: "Районный вокзал.",
    connections: [{ to: "central", type: "standard" }]
  },
  {
    id: "east",
    name: "Восточная",
    x: 550,
    y: 300,
    desc: "Жилой квартал.",
    connections: [{ to: "central", type: "monorail" }]
  },
  {
    id: "west",
    name: "Западная",
    x: 250,
    y: 300,
    desc: "Промзона.",
    connections: [{ to: "central", type: "cargo" }]
  }
];