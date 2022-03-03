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
        <Route path="/lastmovie" element={<LastProduct />} />
        <Route path="/subtaxonomies" element={<SubTaxonomies />} />
        <Route path="/table" element={<Table />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
