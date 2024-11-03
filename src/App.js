import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { EVENTS } from './utils/consts.js';
import HomePage from './pages/Home.js';
import UsersPage from './pages/Users.js';
import ListadoPage from './pages/Listado.js';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  
  // Estado para la lista de usuarios
  const [users, setUsers] = useState([
    { id: 1, nombre: "Antonio Montoro", contraseña: 1234567, email: "jm@gmail.com", fechaCreacion: "30/10/2024,17:50:00", fechaModificacion: "30/10/2024,17:50:00" },
    { id: 2, nombre: "Juan Martínez", contraseña: 1234567, email: "jm@gmail.com", fechaCreacion: "30/10/2024,17:50:00", fechaModificacion: "30/10/2024,17:50:00" },
    { id: 3, nombre: "Jose Perez", contraseña: 1234567, email: "jm@gmail.com", fechaCreacion: "30/10/2024,17:50:00", fechaModificacion: "30/10/2024,17:50:00" },
    { id: 4, nombre: "Fulanito Gomez", contraseña: 1234567, email: "jm@gmail.com", fechaCreacion: "30/10/2024,17:50:00", fechaModificacion: "30/10/2024,17:50:00" },
  ]);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  return (
    <div>
      {currentPath === '/' && <HomePage userCount={users.length} />}
      {currentPath === '/listado' && <ListadoPage users={users}/>}
      {currentPath === '/users' && <UsersPage users={users} setUsers={setUsers} />}
    </div>
  );
}

export default App;
