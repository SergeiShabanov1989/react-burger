import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home'
import { LoginPage } from '../../pages/login';

function App() {
  return (
    <>
    <AppHeader />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
