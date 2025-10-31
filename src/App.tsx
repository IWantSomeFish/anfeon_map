import React from "react";
import MetroMap from "./components/MetroMap";

const App: React.FC = () => {
  return <MetroMap width={1000} height={700} background="/bg-map.png" />;
};

export default App;
