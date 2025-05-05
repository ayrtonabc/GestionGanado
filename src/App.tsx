import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Animals from './pages/Animals';
import Breeding from './pages/Breeding';
import Veterinary from './pages/Veterinary';
import MilkProduction from './pages/MilkProduction';
import Costs from './pages/Costs';
import FeedStorage from './pages/FeedStorage';
import Medications from './pages/Medications';
import Calendar from './pages/Calendar';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Tasks from './pages/Tasks';
import { EstablishmentProvider } from './context/EstablishmentContext';
import { UserProvider, useUser } from './context/UserContext';

// Importación diferida para la página de login
const Login = lazy(() => import('./pages/Login'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const TicketSystem = lazy(() => import('./pages/TicketSystem'));

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <UserProvider>
      <EstablishmentProvider>
        <Router>
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Cargando...</div>}>
            <Routes>
              {/* Ruta pública para login */}
              <Route path="/login" element={<Login />} />
              
              {/* Rutas protegidas dentro del layout */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="animals" element={<Animals />} />
                <Route path="breeding" element={<Breeding />} />
                <Route path="veterinary" element={<Veterinary />} />
                <Route path="milk" element={<MilkProduction />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="costs" element={<Costs />} />
                <Route path="feed" element={<FeedStorage />} />
                <Route path="medication" element={<Medications />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="tickets" element={<TicketSystem />} />
              </Route>
              
              {/* Ruta de fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </EstablishmentProvider>
    </UserProvider>
  );
}

export default App;
