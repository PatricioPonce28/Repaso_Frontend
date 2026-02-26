import { useState, useEffect } from 'react';
import { colores } from './estilos';
import { API_URL } from '../config';
import Registro from './Registro';
import Dashboard from './Dashboard';

const Login = () => {
  const [vista, setVista] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    try {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado && usuarioGuardado !== 'undefined' && usuarioGuardado !== 'null') {
        const usuarioParseado = JSON.parse(usuarioGuardado);
        setUsuario(usuarioParseado);
        setVista('dashboard');
      }
    } catch (error) {
      console.error('Error al recuperar usuario:', error);
      localStorage.removeItem('usuario');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      // 1. Login de usuario
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      console.log("Respuesta login completa:", data);

      if (!response.ok) {
        setError(data.msg || data.message || 'Error al iniciar sesión');
        setCargando(false);
        return;
      }

      // 2. Buscar el estudiante por email
      const responseEst = await fetch(`${API_URL}/api/estudiantes`, {
        headers: { 
          'Content-Type': 'application/json',
          'x-usuario-id': data.user?._id || data._id,
          'x-usuario-nombre': data.user?.nombre || data.nombre
        }
      });

      const estudiantes = await responseEst.json();
      console.log("Estudiantes obtenidos:", estudiantes);
      
      const estudiante = estudiantes.find(e => e.email === form.email);
      console.log("Mi estudiante encontrado:", estudiante);

      if (estudiante) {
        // Guardar TODO: datos del usuario Y del estudiante
        const usuarioCompleto = {
          _id: data.user?._id || data._id,
          nombre: estudiante.nombre,          // Del estudiante
          apellido: estudiante.apellido,      // Del estudiante
          email: estudiante.email,            // Del estudiante
          estudianteId: estudiante._id,
          cedula: estudiante.cedula,
          telefono: estudiante.telefono,
          ciudad: estudiante.ciudad,
          direccion: estudiante.direccion,
          fecha_nacimiento: estudiante.fecha_nacimiento
        };
        
        console.log("Usuario completo a guardar:", usuarioCompleto);
        
        setUsuario(usuarioCompleto);
        localStorage.setItem('usuario', JSON.stringify(usuarioCompleto));
        setVista('dashboard');
      } else {
        setError('No se encontró información de estudiante. Por favor regístrate primero.');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    setVista('login');
  };

  if (vista === 'registro') return <Registro volver={() => setVista('login')} />;
  if (vista === 'dashboard' && usuario) return <Dashboard usuario={usuario} cerrarSesion={cerrarSesion} />;

  return (
    <div style={styles.fondo}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.icon}>🎓</div>
        
        <h2 style={styles.title}>Sistema de Estudiantes</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <div>
          <label style={styles.label}>Email</label>
          <input 
            name="email" 
            type="email" 
            placeholder="tu@email.com" 
            onChange={handleChange} 
            style={styles.input} 
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
            style={styles.input} 
            required 
          />
        </div>
        
        <button type="submit" style={styles.button} disabled={cargando}>
          {cargando ? '⏳ Cargando...' : '✨ Entrar'}
        </button>
        
        <p style={styles.link}>
          ¿No tienes cuenta? <span onClick={() => setVista('registro')} style={styles.linkSpan}>Regístrate</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  fondo: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(15px, 3vw, 40px)',
    boxSizing: 'border-box'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 'min(450px, 90vw)',
    gap: 'clamp(12px, 2vw, 18px)',
    padding: 'clamp(25px, 4vw, 40px)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    backgroundColor: colores.blanco,
    boxSizing: 'border-box'
  },
  icon: {
    fontSize: '48px',
    textAlign: 'center'
  },
  title: {
    margin: '0 0 clamp(15px, 3vw, 20px) 0',
    textAlign: 'center',
    fontSize: 'clamp(1.3rem, 3vw, 2rem)',
    color: colores.texto,
    fontWeight: '700'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    fontWeight: '600',
    color: colores.texto
  },
  input: {
    padding: 'clamp(10px, 2vw, 14px)',
    borderRadius: 'clamp(6px, 1vw, 8px)',
    border: '2px solid #e2e8f0',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none'
  },
  button: {
    padding: 'clamp(12px, 2vw, 14px)',
    background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
    color: colores.blanco,
    border: 'none',
    borderRadius: 'clamp(6px, 1vw, 8px)',
    cursor: 'pointer',
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
  },
  link: {
    textAlign: 'center',
    marginTop: 'clamp(10px, 2vw, 15px)',
    fontSize: 'clamp(13px, 1.5vw, 15px)',
    color: '#64748b'
  },
  linkSpan: {
    color: colores.primario,
    cursor: 'pointer',
    fontWeight: '600'
  },
  error: {
    padding: 'clamp(10px, 2vw, 12px)',
    backgroundColor: '#fee2e2',
    color: colores.error,
    borderRadius: 'clamp(6px, 1vw, 8px)',
    textAlign: 'center',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    borderLeft: `4px solid ${colores.error}`
  }
};

export default Login;