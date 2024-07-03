import { useEffect } from 'react';
import Receita from './components/Receita';
import Saida from './components/Saida';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ConsultaDRE from './components/ConsultaDRE';
import Login from './components/Login';
import Register from './components/Register'; // Importar o componente Register
import ProtectRoutes from './utils/ProtectRoutes';
import { HashRouter, Route, Routes } from 'react-router-dom';

const addUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some((user) => user.username === username);
  if (!userExists) {
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  }
};

const initializeUsers = () => {
  addUser('miguel', '123456');
  addUser('wagner', '123456');
  addUser('juan', '123456');
};

function App() {
  useEffect(() => {
    initializeUsers();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white flex">
      <HashRouter>
        <div className="flex-grow ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Adicionar rota para o registro */}
            <Route 
              path="/" 
              element={
                <ProtectRoutes>
                  <>
                    <Sidebar />
                    <Dashboard />
                  </>
                </ProtectRoutes>
              } 
            />
            <Route 
              path="/receita" 
              element={
                <ProtectRoutes>
                  <>
                    <Sidebar />
                    <Receita />
                  </>
                </ProtectRoutes>
              } 
            />
            <Route 
              path="/saida" 
              element={
                <ProtectRoutes>
                  <>
                    <Sidebar />
                    <Saida />
                  </>
                </ProtectRoutes>
              } 
            />
            <Route 
              path="/dre" 
              element={
                <ProtectRoutes>
                  <>
                    <Sidebar />
                    <ConsultaDRE />
                  </>
                </ProtectRoutes>
              } 
            />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
