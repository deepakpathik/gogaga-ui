import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads/*" element={<ComingSoon />} />
          <Route path="itineraries" element={<ComingSoon />} />
          <Route path="reviews" element={<ComingSoon />} />
          <Route path="vouchers" element={<ComingSoon />} />
          <Route path="accounts" element={<ComingSoon />} />
          <Route path="reports" element={<ComingSoon />} />
          <Route path="support" element={<ComingSoon />} />
          <Route path="settings/user" element={<ComingSoon />} />
          <Route path="settings/masters" element={<ComingSoon />} />
          <Route path="hrm" element={<ComingSoon />} />
          <Route path="assets" element={<ComingSoon />} />
          <Route path="customers" element={<ComingSoon />} />
          <Route path="partners" element={<ComingSoon />} />
          <Route path="suppliers" element={<ComingSoon />} />
          <Route path="coming-soon" element={<ComingSoon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
