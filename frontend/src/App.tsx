import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PatientListPage from './pages/PatientListPage';
import PatientDetailPage from './pages/PatientDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>Flight Diary Frontend</h1>
        <nav>
          <Link to="/">Patients</Link>
        </nav>

        <Routes>
          <Route path="/" element={<PatientListPage />} />
          <Route path="/patients/:id" element={<PatientDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
