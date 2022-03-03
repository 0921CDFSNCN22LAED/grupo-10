import ContentRowMovies from './ContentRowMovies';
import LastMovieInDb from './LastMovieInDb';
import SubTaxonomies from './SubTaxonomies';

const ContentRowTop = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>

      {/* <!-- End movies in Data Base --> */}
      <ContentRowMovies />

      {/* <!-- Content Row Last Movie in Data Base --> */}
      <div className="row">
        {/* <!-- Last Movie in DB --> */}
        <LastMovieInDb />
        {/* <!-- End content row last movie in Data Base --> */}

        {/* <!-- Genres in DB --> */}
        <SubTaxonomies />
      </div>
    </div>
  );
};
export default ContentRowTop;
