import { useEffect, useState } from 'react';
import MetricsCard from './MetricsCard';

const ContentRowMovies = () => {
  const [metrics, setMetrics] = useState([]);
  useEffect(async () => {
    const responseFetch = await fetch(
      'http://localhost:3001/api/products/totals'
    );
    const dataJson = await responseFetch.json();
    setMetrics(dataJson.data);
  }, []);

  return (
    // {/* <!-- Content Row Movies--> */}
    <div className="row">
      {metrics.map((metric, index) => {
        return (
          <MetricsCard
            titulo={metric.titulo}
            cifra={metric.cifra}
            color={metric.color}
            icono={metric.icono}
            key={metric + index}
          />
        );
      })}
    </div>
  );
};

export default ContentRowMovies;
