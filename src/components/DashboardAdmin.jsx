import { useState, useEffect } from 'react';
import { colores } from './estilos';

const DashboardAdmin = ({ usuario, cerrarSesion }) => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nacimiento: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  // Cargar estudiantes al inicio
  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const obtenerEstudiantes = async () => {
    setCargando(true);
    try {
      const response = await fetch('https://backend-repaso-ex-final.onrender.com/api/estudiantes');
      const data = await response.json();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setNuevoEstudiante({ ...nuevoEstudiante, [e.target.name]: e.target.value });
  };

  const crearEstudiante = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-repaso-ex-final.onrender.com/api/estudiantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoEstudiante)
      });

      if (response.ok) {
        alert('✅ Estudiante creado exitosamente');
        setNuevoEstudiante({
          nombre: '',
          apellido: '',
          cedula: '',
          fecha_nacimiento: '',
          ciudad: '',
          direccion: '',
          telefono: '',
          email: ''
        });
        setMostrarFormulario(false);
        obtenerEstudiantes(); 
      }
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      alert('❌ Error al crear estudiante');
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🔧 Panel de Administración</h1>
          <p style={styles.subtitle}>Bienvenido, {usuario.nombre}</p>
        </div>
        <button 
          onClick={cerrarSesion} 
          style={styles.logoutButton}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ← Cerrar Sesión
        </button>
      </div>

      {/* Botón para mostrar formulario */}
      <div style={styles.actions}>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={styles.btnPrimario}
        >
          {mostrarFormulario ? '❌ Cancelar' : '➕ Nuevo Estudiante'}
        </button>
      </div>

      {/* Formulario de creación */}
      {mostrarFormulario && (
        <div style={styles.formularioCard}>
          <h3 style={styles.formTitle}>Registrar Nuevo Estudiante</h3>
          <form onSubmit={crearEstudiante} style={styles.form}>
            <div style={styles.formGrid}>
              <input name="nombre" placeholder="Nombre *" onChange={handleChange} value={nuevoEstudiante.nombre} style={styles.input} required />
              <input name="apellido" placeholder="Apellido *" onChange={handleChange} value={nuevoEstudiante.apellido} style={styles.input} required />
              <input name="cedula" placeholder="Cédula *" onChange={handleChange} value={nuevoEstudiante.cedula} style={styles.input} required />
              <input name="fecha_nacimiento" type="date" placeholder="Fecha Nacimiento" onChange={handleChange} value={nuevoEstudiante.fecha_nacimiento} style={styles.input} />
              <input name="ciudad" placeholder="Ciudad" onChange={handleChange} value={nuevoEstudiante.ciudad} style={styles.input} />
              <input name="direccion" placeholder="Dirección" onChange={handleChange} value={nuevoEstudiante.direccion} style={styles.input} />
              <input name="telefono" placeholder="Teléfono" onChange={handleChange} value={nuevoEstudiante.telefono} style={styles.input} />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} value={nuevoEstudiante.email} style={styles.input} />
            </div>
            <button type="submit" style={styles.btnGuardar}>💾 Guardar Estudiante</button>
          </form>
        </div>
      )}

      {/* Lista de estudiantes */}
      <div style={styles.listaCard}>
        <h3 style={styles.listaTitle}>📋 Lista de Estudiantes ({estudiantes.length})</h3>
        
        {cargando ? (
          <p style={styles.cargando}>Cargando estudiantes...</p>
        ) : estudiantes.length === 0 ? (
          <p style={styles.sinDatos}>No hay estudiantes registrados</p>
        ) : (
          <div style={styles.tabla}>
            {estudiantes.map((est) => (
              <div key={est._id} style={styles.estudianteCard}>
                <div style={styles.estudianteInfo}>
                  <h4 style={styles.estudianteNombre}>{est.nombre} {est.apellido}</h4>
                  <p style={styles.estudianteDetalle}>📧 {est.email || 'Sin email'}</p>
                  <p style={styles.estudianteDetalle}>🆔 {est.cedula}</p>
                  <p style={styles.estudianteDetalle}>📞 {est.telefono || 'Sin teléfono'}</p>
                  <p style={styles.estudianteDetalle}>🏙️ {est.ciudad || 'Sin ciudad'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: '100vh',
    backgroundColor: colores.fondo
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
    backgroundColor: colores.blanco,
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    margin: 0,
    color: colores.texto,
    fontWeight: '700'
  },
  subtitle: {
    margin: '5px 0 0 0',
    color: '#64748b',
    fontSize: '14px'
  },
  logoutButton: {
    padding: '12px 24px',
    backgroundColor: colores.error,
    color: colores.blanco,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'transform 0.2s'
  },
  actions: {
    marginBottom: '20px'
  },
  btnPrimario: {
    padding: '12px 24px',
    background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
    color: colores.blanco,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
  },
  formularioCard: {
    backgroundColor: colores.blanco,
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  formTitle: {
    margin: '0 0 20px 0',
    color: colores.texto,
    fontSize: '18px',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    fontSize: '15px',
    width: '100%',
    boxSizing: 'border-box'
  },
  btnGuardar: {
    padding: '14px',
    backgroundColor: colores.exito,
    color: colores.blanco,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
  },
  listaCard: {
    backgroundColor: colores.blanco,
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  listaTitle: {
    margin: '0 0 20px 0',
    color: colores.texto,
    fontSize: '18px',
    fontWeight: '600'
  },
  cargando: {
    textAlign: 'center',
    color: '#64748b',
    padding: '20px'
  },
  sinDatos: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: '40px',
    fontSize: '15px'
  },
  tabla: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px'
  },
  estudianteCard: {
    padding: '20px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  estudianteInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  estudianteNombre: {
    margin: 0,
    color: colores.texto,
    fontSize: '16px',
    fontWeight: '600'
  },
  estudianteDetalle: {
    margin: 0,
    color: '#64748b',
    fontSize: '14px'
  }
};

export default DashboardAdmin;