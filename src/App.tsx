import { Routes, Route, Link } from 'react-router-dom';
import DataList from './components/DataList';
import DataListNoNuqs from './components/DataListNoNuqs';
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">With Nuqs</Link>
        <Link to="/no-nuqs">Without Nuqs</Link>
      </nav>
      <Routes>
        <Route path="/" element={<DataList />} />
        <Route path="/no-nuqs" element={<DataListNoNuqs />} />
      </Routes>
      <style>{`
        .navbar {
          background-color: #333;
          padding: 10px 20px;
          display: flex;
          gap: 20px;
        }
        .navbar a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }
        .navbar a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}

export default App
