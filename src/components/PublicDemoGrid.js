import React, { useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import './PublicDemoGrid.css';
import DemoModal from './DemoModal';

const PublicDemoGrid = () => {
  const rawDemos = useQuery(api.demos.list) || [];
  const demos = React.useMemo(() => {
    return [...rawDemos].sort((a, b) => (b._creationTime || 0) - (a._creationTime || 0));
  }, [rawDemos]);
  const [selectedDemo, setSelectedDemo] = useState(null);

  if (!demos.length) {
    return <div className="loading-demos">Carregando demonstrações...</div>;
  }

  return (
    <div className="public-demo-grid-container">
      {selectedDemo && <DemoModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} />}
      <div className="demo-grid">
        {demos.map((demo) => (
          <div key={demo._id} className="demo-card-public" onClick={() => setSelectedDemo(demo)}>
            <img src={demo.imageUrls[0]} alt={demo.title} className="card-background" />
            <div className="card-overlay">
              <h3>{demo.title}</h3>
              <button className="more-info-btn">Mais Infos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicDemoGrid;
