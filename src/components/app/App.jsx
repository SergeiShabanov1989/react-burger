import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home'
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import {ForgotPage} from '../../pages/forgot-password';
import {ResetPage} from '../../pages/reset-password';

function App() {
  return (
    <>
    <AppHeader />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
    </Routes>
    </>
  );
}

export default App;
