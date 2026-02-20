import { useState } from 'react';
import { colores } from './estilos';

const Registro = ({ volver }) => {
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setExito('');

    try {
      const response = await fetch('https://backend-repaso-ex-final.onrender.com/api/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        setExito('¡Cuenta creada! Redirigiendo...');
        setTimeout(volver, 2000);
      } else {
        setError(data.msg || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.fondo}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.icon}>👤</div>
        
        <h2 style={styles.title}>Crear Cuenta</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        {exito && <div style={styles.exito}>{exito}</div>}
        
        <div>
          <label style={styles.label}>Nombre</label>
          <input name="nombre" placeholder="Juan" onChange={handleChange} style={styles.input} required />
        </div>

        <div>
          <label style={styles.label}>Apellido</label>
          <input name="apellido" placeholder="Pérez" onChange={handleChange} style={styles.input} required />
        </div>

        <div>
          <label style={styles.label}>Email</label>
          <input name="email" type="email" placeholder="tu@email.com" onChange={handleChange} style={styles.input} required />
        </div>

        <div>
          <label style={styles.label}>Contraseña</label>
          <input name="password" type="password" placeholder="••••••••" onChange={handleChange} style={styles.input} required />
        </div>
        
        <button type="submit" style={styles.button} disabled={cargando}>
          {cargando ? '⏳ Registrando...' : '🚀 Registrarse'}
        </button>
        
        <p style={styles.link}>
          ¿Ya tienes cuenta? <span onClick={volver} style={styles.linkSpan}>Inicia sesión</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  fondo: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
  },
  exito: {
    padding: 'clamp(10px, 2vw, 12px)',
    backgroundColor: '#d1fae5',
    color: colores.exito,
    borderRadius: 'clamp(6px, 1vw, 8px)',
    textAlign: 'center',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    borderLeft: `4px solid ${colores.exito}`
  }
};

export default Registro;