import { useState } from 'react';
import { estilosBase, colores } from './estilos';
import Registro from './Registro';
import Dashboard from './Dashboard';
import DashboardAdmin from './DashboardAdmin';

const Login = () => {
  const [mostrar, setMostrar] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [esAdmin, setEsAdmin] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const response = await fetch('https://backend-repaso-ex-final.onrender.com/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);
        setUsuario(data.user);
        
        // Verificar si es el admin
        if (data.user.email === 'mendara2009@gmail.com') {
          setEsAdmin(true);
        }
        
        setMostrar('dashboard');
      } else {
        setError(data.msg || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setEsAdmin(false);
    setMostrar('login');
  };

  if (mostrar === 'registro') {
    return <Registro volverLogin={() => setMostrar('login')} />;
  }

  if (mostrar === 'dashboard') {
    // Si es admin, mostrar DashboardAdmin
    if (esAdmin) {
      return <DashboardAdmin usuario={usuario} cerrarSesion={cerrarSesion} />;
    }
    // Si no, mostrar Dashboard normal
    return <Dashboard usuario={usuario} cerrarSesion={cerrarSesion} />;
  }

  return (
    <div style={estilosBase.container}>
      <form onSubmit={handleSubmit} style={estilosBase.form}>
        <div style={styles.iconContainer}>
          <div style={styles.icon}>🔐</div>
        </div>
        
        <h2 style={estilosBase.title}>Iniciar Sesión</h2>
        
        {error && <div style={estilosBase.error}>{error}</div>}
        
        <div>
          <label style={styles.label}>Correo Electrónico</label>
          <input 
            name="email" 
            type="email" 
            placeholder="tu@email.com" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Contraseña</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          style={estilosBase.button} 
          disabled={cargando}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {cargando ? '⏳ Cargando...' : '✨ Entrar'}
        </button>
        
        <p style={estilosBase.link}>
          ¿No tienes cuenta? <span onClick={() => setMostrar('registro')} style={estilosBase.linkText}>Regístrate aquí</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  icon: {
    fontSize: '48px',
    animation: 'bounce 2s infinite'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: colores.texto
  }
};

export default Login;