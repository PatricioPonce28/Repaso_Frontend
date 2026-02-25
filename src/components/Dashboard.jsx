import { useState, useEffect } from 'react';
import { colores, containerPrincipal, header, gridResponsivo, card, boton, label } from './estilos';
import { API_URL } from '../config';

const Dashboard = ({ usuario, cerrarSesion }) => {
  const [materias, setMaterias] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  
  const [formMateria, setFormMateria] = useState({
    nombre: '',
    codigo: '',
    creditos: '',
    descripcion: ''
  });

  const getHeaders = () => {
    const headers = { 'Content-Type': 'application/json' };
    
    if (usuario) {
      headers['x-usuario-id'] = usuario._id || usuario.id;
      headers['x-usuario-nombre'] = usuario.nombre;
    }
    
    return headers;
  };

  useEffect(() => {
    if (usuario) {
      obtenerMaterias();
      obtenerMatriculas();
    }
  }, [usuario]);

  const obtenerMaterias = async () => {
    try {
      const response = await fetch(`${API_URL}/api/materias`, {
        headers: getHeaders()
      });
      const data = await response.json();
      
      if (response.ok) {
        setMaterias(data);
      } else {
        console.error('Error al obtener materias:', data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const obtenerMatriculas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/matriculas`, {
        headers: getHeaders()
      });
      const data = await response.json();
      
      if (response.ok) {
        setMatriculas(data);
      } else {
        console.error('Error al obtener matrículas:', data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const crearMateria = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/materias`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(formMateria)
      });

      if (response.ok) {
        alert('✅ Materia creada');
        setFormMateria({ nombre: '', codigo: '', creditos: '', descripcion: '' });
        setShowForm(false);
        obtenerMaterias();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || 'Error al crear materia'}`);
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const actualizarMateria = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/materias/${editando._id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(formMateria)
      });

      if (response.ok) {
        alert('✅ Materia actualizada');
        setFormMateria({ nombre: '', codigo: '', creditos: '', descripcion: '' });
        setEditando(null);
        setShowForm(false);
        obtenerMaterias();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || 'Error al actualizar'}`);
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const eliminarMateria = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta materia?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/materias/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (response.ok) {
        alert('✅ Materia eliminada');
        obtenerMaterias();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || 'Error al eliminar'}`);
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const editarMateria = (materia) => {
    setEditando(materia);
    setFormMateria({
      nombre: materia.nombre,
      codigo: materia.codigo,
      creditos: materia.creditos,
      descripcion: materia.descripcion || ''
    });
    setShowForm(true);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormMateria({ nombre: '', codigo: '', creditos: '', descripcion: '' });
    setShowForm(false);
  };

  const inscribirMateria = async (materiaId) => {
    try {
      const codigoMatricula = Date.now();
      
      const body = {
        codigo: codigoMatricula,
        id_estudiante: usuario.estudianteId, // Usar estudianteId
        id_materia: materiaId,
        descripcion: 'Matrícula activa'
      };
      
      const response = await fetch(`${API_URL}/api/matriculas`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert('✅ Te inscribiste exitosamente');
        obtenerMatriculas();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || JSON.stringify(error)}`);
      }
    } catch (err) {
      alert('❌ Error de conexión');
      console.error(err);
    }
  };

  const desinscribirMateria = async (matriculaId) => {
    try {
      const response = await fetch(`${API_URL}/api/matriculas/${matriculaId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      if (response.ok) {
        alert('❌ Te desinscribiste');
        obtenerMatriculas();
      } else {
        const error = await response.json();
        alert(`❌ Error: ${error.message || 'Error al desinscribirse'}`);
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const misMatriculas = matriculas.filter(m => 
    m.id_estudiante === usuario?.estudianteId
  );

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={containerPrincipal}>
      {/* Header */}
      <div style={header}>
        <div>
          <h1 style={s.title}>📚 Gestión de Materias</h1>
          <p style={s.subtitle}>Bienvenido, {usuario.nombre}</p>
        </div>
        <div style={{display: 'flex', gap: 'clamp(8px, 1vw, 10px)', flexWrap: 'wrap'}}>
          <button 
            onClick={() => setMostrarModal(true)} 
            style={{...boton, backgroundColor: colores.primario, color: colores.blanco}}
          >
            👤 Mis Datos
          </button>
          <button onClick={cerrarSesion} style={{...boton, backgroundColor: colores.error, color: colores.blanco}}>
            Salir
          </button>
        </div>
      </div>

      {/* Botón Agregar Materia */}
      <button 
        onClick={() => {
          setShowForm(!showForm);
          if (showForm) cancelarEdicion();
        }}
        style={{...boton, backgroundColor: colores.primario, color: colores.blanco, marginBottom: 'clamp(12px, 2vw, 18px)'}}
      >
        {showForm ? '❌ Cancelar' : '➕ Nueva Materia'}
      </button>

      {/* Formulario Crear/Editar */}
      {showForm && (
        <div style={s.formCard}>
          <h3 style={s.formTitulo}>{editando ? '✏️ Editar Materia' : '➕ Crear Materia'}</h3>
          <form onSubmit={editando ? actualizarMateria : crearMateria}>
            <div style={gridResponsivo}>
              <div>
                <label style={label}>Nombre *</label>
                <input 
                  name="nombre" 
                  placeholder="Cálculo I" 
                  onChange={(e) => setFormMateria({...formMateria, nombre: e.target.value})} 
                  value={formMateria.nombre} 
                  style={s.input} 
                  required 
                  maxLength={20}
                />
              </div>
              <div>
                <label style={label}>Código *</label>
                <input 
                  name="codigo" 
                  placeholder="MAT101" 
                  onChange={(e) => setFormMateria({...formMateria, codigo: e.target.value})} 
                  value={formMateria.codigo} 
                  style={s.input} 
                  required 
                  maxLength={20}
                />
              </div>
              <div>
                <label style={label}>Créditos</label>
                <input 
                  name="creditos" 
                  placeholder="4" 
                  onChange={(e) => setFormMateria({...formMateria, creditos: e.target.value})} 
                  value={formMateria.creditos} 
                  style={s.input} 
                  maxLength={10}
                />
              </div>
              <div>
                <label style={label}>Descripción</label>
                <input 
                  name="descripcion" 
                  placeholder="Matemáticas básicas" 
                  onChange={(e) => setFormMateria({...formMateria, descripcion: e.target.value})} 
                  value={formMateria.descripcion} 
                  style={s.input} 
                  maxLength={20}
                />
              </div>
            </div>
            <button type="submit" style={{...boton, backgroundColor: colores.exito, color: colores.blanco, width: '100%', marginTop: 'clamp(12px, 2vw, 18px)'}}>
              {editando ? '💾 Actualizar' : '💾 Crear'}
            </button>
          </form>
        </div>
      )}

      {/* Mis Materias Inscritas */}
      <div style={s.seccion}>
        <h3 style={s.seccionTitulo}>📝 Mis Materias Inscritas ({misMatriculas.length})</h3>
        {misMatriculas.length === 0 ? (
          <p style={s.vacio}>No estás inscrito en ninguna materia</p>
        ) : (
          <div style={gridResponsivo}>
            {misMatriculas.map(matricula => {
              const materia = materias.find(m => m._id === matricula.id_materia);
              if (!materia) return null;
              return (
                <div key={matricula._id} style={{...card, backgroundColor: '#f0fdf4', border: '2px solid #86efac'}}>
                  <h4 style={s.nombre}>{materia.nombre}</h4>
                  <p style={s.dato}>📋 {materia.codigo}</p>
                  <p style={s.dato}>⭐ {materia.creditos || 'Sin créditos'}</p>
                  <p style={s.dato}>📝 {materia.descripcion || 'Sin descripción'}</p>
                  <button 
                    onClick={() => desinscribirMateria(matricula._id)}
                    style={{...boton, backgroundColor: colores.error, color: colores.blanco, width: '100%', marginTop: 'clamp(8px, 1.5vw, 12px)'}}
                  >
                    ❌ Desinscribirse
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Todas las Materias */}
      <div style={s.seccion}>
        <h3 style={s.seccionTitulo}>📚 Todas las Materias ({materias.length})</h3>
        {materias.length === 0 ? (
          <p style={s.vacio}>No hay materias disponibles</p>
        ) : (
          <div style={gridResponsivo}>
            {materias.map(m => {
              const estaInscrito = misMatriculas.some(mat => mat.id_materia === m._id);
              return (
                <div key={m._id} style={card}>
                  <h4 style={s.nombre}>{m.nombre}</h4>
                  <p style={s.dato}>📋 {m.codigo}</p>
                  <p style={s.dato}>⭐ {m.creditos || 'Sin créditos'}</p>
                  <p style={s.dato}>📝 {m.descripcion || 'Sin descripción'}</p>
                  
                  <div style={s.botones}>
                    <button 
                      onClick={() => inscribirMateria(m._id)}
                      style={{
                        ...boton, 
                        backgroundColor: estaInscrito ? '#94a3b8' : colores.primario, 
                        color: colores.blanco,
                        cursor: estaInscrito ? 'not-allowed' : 'pointer',
                        flex: 1
                      }}
                      disabled={estaInscrito}
                    >
                      {estaInscrito ? '✓' : '➕'}
                    </button>
                    
                    <button 
                      onClick={() => editarMateria(m)}
                      style={{...boton, backgroundColor: '#f59e0b', color: colores.blanco, flex: 1}}
                    >
                      ✏️
                    </button>
                    
                    <button 
                      onClick={() => eliminarMateria(m._id)}
                      style={{...boton, backgroundColor: colores.error, color: colores.blanco, flex: 1}}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Mis Datos */}
      {mostrarModal && (
        <div style={s.modalOverlay} onClick={() => setMostrarModal(false)}>
          <div style={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={s.modalTitle}>📋 Mis Datos de Estudiante</h3>
            <div style={s.modalGrid}>
              <p style={s.modalDato}><strong>Nombre Completo:</strong> {usuario.nombre} {usuario.apellido}</p>
              <p style={s.modalDato}><strong>Cédula:</strong> {usuario.cedula || 'No registrado'}</p>
              <p style={s.modalDato}><strong>Email:</strong> {usuario.email}</p>
              <p style={s.modalDato}><strong>Teléfono:</strong> {usuario.telefono || 'No registrado'}</p>
              <p style={s.modalDato}><strong>Ciudad:</strong> {usuario.ciudad || 'No registrado'}</p>
              <p style={s.modalDato}><strong>Dirección:</strong> {usuario.direccion || 'No registrado'}</p>
              <p style={s.modalDato}><strong>Fecha Nacimiento:</strong> {usuario.fecha_nacimiento || 'No registrado'}</p>
            </div>
            <button 
              onClick={() => setMostrarModal(false)} 
              style={{...boton, backgroundColor: colores.primario, color: colores.blanco, width: '100%', marginTop: '15px'}}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const s = {
  title: {
    margin: 0,
    fontSize: 'clamp(1.2rem, 3vw, 2rem)',
    color: colores.texto,
    fontWeight: '700'
  },
  subtitle: {
    margin: 'clamp(3px, 1vw, 5px) 0 0 0',
    color: '#64748b',
    fontSize: 'clamp(12px, 1.5vw, 14px)'
  },
  seccion: {
    backgroundColor: colores.blanco,
    padding: 'clamp(15px, 2.5vw, 25px)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    marginBottom: 'clamp(15px, 2vw, 20px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    boxSizing: 'border-box'
  },
  seccionTitulo: {
    margin: '0 0 clamp(12px, 2vw, 18px) 0',
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    color: colores.texto,
    fontWeight: '600'
  },
  vacio: {
    textAlign: 'center',
    color: '#94a3b8',
    padding: 'clamp(20px, 3vw, 30px)',
    fontSize: 'clamp(13px, 1.5vw, 15px)'
  },
  nombre: {
    margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
    fontSize: 'clamp(15px, 2vw, 17px)',
    color: colores.texto,
    fontWeight: '600'
  },
  dato: {
    margin: 'clamp(3px, 0.5vw, 5px) 0',
    fontSize: 'clamp(13px, 1.5vw, 14px)',
    color: '#64748b'
  },
  formCard: {
    backgroundColor: colores.blanco,
    padding: 'clamp(15px, 2.5vw, 25px)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    marginBottom: 'clamp(12px, 2vw, 18px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    boxSizing: 'border-box'
  },
  formTitulo: {
    margin: '0 0 clamp(12px, 2vw, 18px) 0',
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: colores.texto,
    fontWeight: '600'
  },
  input: {
    padding: 'clamp(10px, 2vw, 12px)',
    borderRadius: 'clamp(6px, 1vw, 8px)',
    border: '2px solid #e2e8f0',
    fontSize: 'clamp(13px, 1.5vw, 15px)',
    width: '100%',
    boxSizing: 'border-box'
  },
  botones: {
    display: 'flex',
    gap: 'clamp(5px, 1vw, 8px)',
    marginTop: 'clamp(8px, 1.5vw, 12px)'
  },
  // Estilos del Modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    boxSizing: 'border-box'
  },
  modalContent: {
    backgroundColor: colores.blanco,
    padding: 'clamp(20px, 3vw, 30px)',
    borderRadius: '12px',
    maxWidth: 'min(500px, 90vw)',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  modalTitle: {
    margin: '0 0 20px 0',
    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
    color: colores.texto,
    fontWeight: '700',
    textAlign: 'center'
  },
  modalGrid: {
    display: 'grid',
    gap: '12px'
  },
  modalDato: {
    margin: 0,
    fontSize: 'clamp(14px, 1.5vw, 15px)',
    color: colores.texto,
    padding: '10px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    borderLeft: `4px solid ${colores.primario}`
  }
};

export default Dashboard;