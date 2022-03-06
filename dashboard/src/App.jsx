import './App.css';
import SideBar from './components/SideBar';
import ContentWrapper from './components/ContentWrapper';
import { Routes, Route } from 'react-router-dom';
import LastProduct from './components/LastProduct';
import SubTaxonomies from './components/SubTaxonomies';
import Table from './components/Table';
import NotFound from './components/NotFound';

function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <Routes>
        <Route path="/" element={<ContentWrapper />} />
        <Route path="/ultimo-producto" element={<LastProduct />} />
        <Route path="/subtaxonomias" element={<SubTaxonomies />} />
        <Route path="/tabla" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
