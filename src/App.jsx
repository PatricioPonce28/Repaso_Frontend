import { useState } from 'react'
import Login from './components/Login';
import Registro from './components/Registro';
import './App.css'

function App() {
  const [vistaActual, setVistaActual] = useState('login'); // 'login' o 'registro'

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Sistema de Estudiantes</h1>
      
      {vistaActual === 'login' ? (
        <Login cambiarVista={setVistaActual} />
      ) : (
        <Registro cambiarVista={setVistaActual} />
      )}
    </div>
  )
}

export default App