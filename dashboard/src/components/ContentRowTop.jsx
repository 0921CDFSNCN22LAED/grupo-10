import ContentRowProducts from './ContentRowProducts';
import LastProduct from './LastProduct';
import SubTaxonomies from './SubTaxonomies';

const ContentRowTop = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
      </div>

      {/* <!-- End movies in Data Base --> */}
      <ContentRowProducts />

      {/* <!-- ContentRow LastProduct --> */}
      <div className="row">
        {/* <!-- Last Product --> */}
        <LastProduct />
        {/* <!-- End of ContentRow LastProduct --> */}

        {/* <!-- SubTaxonomies --> */}
        <SubTaxonomies />
      </div>
    </div>
  );
};
export default ContentRowTop;
