import { useState } from 'react';
import { colores } from './estilos';
import { API_URL } from '../config'; 

const Registro = ({ volver }) => {
  const [form, setForm] = useState({ 
    nombre: '', 
    apellido: '', 
    email: '', 
    password: '',
    cedula: '',
    fecha_nacimiento: '',
    ciudad: '',
    direccion: '',
    telefono: ''
  });
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
      // 1. Crear Usuario
      const responseUser = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          password: form.password
        })
      });

      const dataUser = await responseUser.json();

      if (!responseUser.ok) {
        setError(dataUser.msg || dataUser.message || 'Error al registrar usuario');
        setCargando(false);
        return;
      }

      // 2. Crear Estudiante
      const responseEst = await fetch(`${API_URL}/api/estudiantes`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-usuario-id': dataUser.user?._id || dataUser._id || 'temp',
          'x-usuario-nombre': form.nombre
        },
        body: JSON.stringify({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          cedula: form.cedula,
          fecha_nacimiento: form.fecha_nacimiento,
          ciudad: form.ciudad,
          direccion: form.direccion,
          telefono: form.telefono
        })
      });

      if (responseEst.ok) {
        setExito('¡Cuenta creada! Redirigiendo...');
        setTimeout(volver, 2000);
      } else {
        const errorEst = await responseEst.json();
        setError(`Usuario creado pero error al crear estudiante: ${errorEst.message || ''}`);
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
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
        
        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Nombre *</label>
            <input name="nombre" placeholder="Juan" onChange={handleChange} style={styles.input} required maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Apellido *</label>
            <input name="apellido" placeholder="Pérez" onChange={handleChange} style={styles.input} required maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Cédula *</label>
            <input name="cedula" placeholder="1234567890" onChange={handleChange} style={styles.input} required maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Email *</label>
            <input name="email" type="email" placeholder="tu@email.com" onChange={handleChange} style={styles.input} required maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Contraseña *</label>
            <input name="password" type="password" placeholder="••••••••" onChange={handleChange} style={styles.input} required maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Teléfono</label>
            <input name="telefono" placeholder="0987654321" onChange={handleChange} style={styles.input} maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Ciudad</label>
            <input name="ciudad" placeholder="Quito" onChange={handleChange} style={styles.input} maxLength={20} />
          </div>

          <div>
            <label style={styles.label}>Dirección</label>
            <input name="direccion" placeholder="Calle" onChange={handleChange} style={styles.input} maxLength={10} />
          </div>

          <div>
            <label style={styles.label}>Fecha Nacimiento</label>
            <input name="fecha_nacimiento" type="date" onChange={handleChange} style={styles.input} />
          </div>
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
    maxWidth: 'min(700px, 95vw)',
    gap: 'clamp(15px, 2vw, 20px)',
    padding: 'clamp(25px, 4vw, 40px)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    backgroundColor: colores.blanco,
    boxSizing: 'border-box',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'clamp(12px, 2vw, 15px)'
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
    padding: 'clamp(10px, 2vw, 12px)',
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