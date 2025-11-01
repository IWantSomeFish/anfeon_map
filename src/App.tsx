import React from "react";
import MapCanvas from "./components/MapCanvas";
import SlidingSidebar from "./components/Sidebar";
import LegendPanel from "./components/LegendPanel";
import { stations } from "./data/stations";

export default function App() {
  return (
    <div style={styles.container}>
      <MapCanvas stations={stations} />
      <SlidingSidebar stations={stations} />
      <LegendPanel />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    fontFamily: "sans-serif",
    color: "#fff",
  },
};
