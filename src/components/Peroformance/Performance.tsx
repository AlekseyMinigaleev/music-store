import React from 'react';

interface PerformanceProps {
  performance: {
    id: string;
    place: string;
    name: string;
    ensemble: {
      id: string;
      type: string;
      name: string;
    };
    musicalMetadata: {
      id: string;
      duration: string;
      tempo: string;
      interpretation: string;
    };
  };
}

const formatDuration = (durationString: string): string => {
  const duration = new Date(`1970-01-01T${durationString}Z`);
  const hours = duration.getUTCHours();
  const minutes = duration.getUTCMinutes();

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}`;
  } else {
    return `${minutes}`;
  }
};

const Performance: React.FC<PerformanceProps> = ({ performance }) => {
  const formattedDuration = formatDuration(performance.musicalMetadata.duration);

  return (
    <div className="performance-card">
      <h3>{performance.name}</h3>
      <p>Место выступления: {performance.place}</p>
      <p>Ансамбль: {performance.ensemble.name}</p>
      <p>Длительность: {formattedDuration}</p>
      <p>Темп: {performance.musicalMetadata.tempo}</p>
      <p>Интерпретация: {performance.musicalMetadata.interpretation}</p>
    </div>
  );
};

export default Performance;
