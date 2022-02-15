import MetricsCard from './MetricsCard';

const ContentRowMovies = () => {
  const metrics = [
    {
      titulo: 'Movies in Data Base',
      cifra: 21,
      color: 'primary',
      icono: 'fa-film',
    },
    {
      titulo: 'Total awards',
      cifra: 79,
      color: 'success',
      icono: 'fa-award',
    },
    {
      titulo: 'Actors quantity',
      cifra: 49,
      color: 'warning',
      icono: 'fa-user',
    },
  ];

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

export default ContentRowMovies
