import { useState, useEffect } from 'react';
import { colores, containerPrincipal, header, gridResponsivo, card, boton, label } from './estilos';
import { API_URL } from '../config';

const Dashboard = ({ usuario, cerrarSesion }) => {
  // keep track of which materias the user has "inscrito" locally
  const [materias, setMaterias] = useState([]);
  const [inscritos, setInscritos] = useState([]); // array of materia ids
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const [formMateria, setFormMateria] = useState({
    nombre: '',
    codigo: '',
    creditos: '',
    descripcion: ''
  });

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-usuario-id': usuario._id || usuario.id,
    'x-usuario-nombre': usuario.nombre
  });

  useEffect(() => {
    if (usuario) obtenerMaterias();
  }, [usuario]);

  const obtenerMaterias = async () => {
    const headers = getHeaders();
    console.log("Headers para obtener materias:", headers);
    setCargando(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/materias`, {
        headers: getHeaders()
      });
      const data = await response.json();
      if (response.ok) {
        setMaterias(data);
      } else {
        setError(data.message || 'Error al obtener materias');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error(err);
    } finally {
      setCargando(false);
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
      const data = await response.json();
      if (response.ok) {
        alert('✅ Materia creada');
        resetForm();
        obtenerMaterias();
      } else {
        alert(`❌ Error: ${data.message || 'Error al crear materia'}`);
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
      const data = await response.json();
      if (response.ok) {
        alert('✅ Materia actualizada');
        resetForm();
        obtenerMaterias();
      } else {
        alert(`❌ Error: ${data.message || 'Error al actualizar'}`);
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
      const data = await response.json();
      if (response.ok) {
        alert('✅ Materia eliminada');
        obtenerMaterias();
      } else {
        alert(`❌ Error: ${data.message || 'Error al eliminar'}`);
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
      creditos: materia.creditos || '',
      descripcion: materia.descripcion || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditando(null);
    setFormMateria({ nombre: '', codigo: '', creditos: '', descripcion: '' });
    setShowForm(false);
  };

  // local toggle of inscripción status
  const toggleInscripcion = (materiaId) => {
    if (inscritos.includes(materiaId)) {
      setInscritos(inscritos.filter(id => id !== materiaId));
      alert('❌ No inscrito');
    } else {
      setInscritos([...inscritos, materiaId]);
      alert('✅ Inscrito');
    }
  };


  if (!usuario) return <div>Cargando...</div>;

  return (
    <div style={containerPrincipal}>

      {/* Header */}
      <div style={header}>
        <div>
          <h1 style={s.title}>📚 Mis Materias</h1>
          <p style={s.subtitle}>Bienvenido, {usuario.nombre}</p>
        </div>
        <div style={{ display: 'flex', gap: 'clamp(8px, 1vw, 10px)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setMostrarModal(true)}
            style={{ ...boton, backgroundColor: colores.primario, color: colores.blanco }}
          >
            👤 Mis Datos
          </button>
          <button
            onClick={cerrarSesion}
            style={{ ...boton, backgroundColor: colores.error, color: colores.blanco }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Botón Nueva Materia */}
      <button
        onClick={() => showForm ? resetForm() : setShowForm(true)}
        style={{ ...boton, backgroundColor: colores.primario, color: colores.blanco, marginBottom: 'clamp(12px, 2vw, 18px)' }}
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
                  placeholder="Cálculo I"
                  value={formMateria.nombre}
                  onChange={(e) => setFormMateria({ ...formMateria, nombre: e.target.value })}
                  style={s.input}
                  required
                  maxLength={20}
                />
              </div>
              <div>
                <label style={label}>Código *</label>
                <input
                  placeholder="MAT101"
                  value={formMateria.codigo}
                  onChange={(e) => setFormMateria({ ...formMateria, codigo: e.target.value })}
                  style={s.input}
                  required
                  maxLength={20}
                />
              </div>
              <div>
                <label style={label}>Créditos</label>
                <input
                  placeholder="4"
                  value={formMateria.creditos}
                  onChange={(e) => setFormMateria({ ...formMateria, creditos: e.target.value })}
                  style={s.input}
                  maxLength={10}
                />
              </div>
              <div>
                <label style={label}>Descripción</label>
                <input
                  placeholder="Matemáticas básicas"
                  value={formMateria.descripcion}
                  onChange={(e) => setFormMateria({ ...formMateria, descripcion: e.target.value })}
                  style={s.input}
                  maxLength={20}
                />
              </div>
            </div>
            <button
              type="submit"
              style={{ ...boton, backgroundColor: colores.exito, color: colores.blanco, width: '100%', marginTop: 'clamp(12px, 2vw, 18px)' }}
            >
              {editando ? '💾 Actualizar' : '💾 Crear'}
            </button>
          </form>
        </div>
      )}

      {/* Lista de Materias */}
      <div style={s.seccion}>
        <h3 style={s.seccionTitulo}>📚 Mis Materias ({materias.length})</h3>

        {error && <div style={s.errorBox}>{error}</div>}

        {cargando ? (
          <p style={s.vacio}>⏳ Cargando materias...</p>
        ) : materias.length === 0 ? (
          <p style={s.vacio}>No has creado materias aún. ¡Crea tu primera materia! 🚀</p>
        ) : (
          <div style={gridResponsivo}>
            {materias.map(m => (
              <div key={m._id} style={card}>
                <h4 style={s.nombre}>{m.nombre}</h4>
                <p style={s.dato}>📋 <strong>Código:</strong> {m.codigo}</p>
                <p style={s.dato}>⭐ <strong>Créditos:</strong> {m.creditos || 'No especificado'}</p>
                <p style={s.dato}>📝 <strong>Descripción:</strong> {m.descripcion || 'Sin descripción'}</p>
                <div style={s.botones}>
                  <button
                    onClick={() => editarMateria(m)}
                    style={{ ...boton, backgroundColor: '#f59e0b', color: colores.blanco, flex: '1 0 0' }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => eliminarMateria(m._id)}
                    style={{ ...boton, backgroundColor: colores.error, color: colores.blanco, flex: '1 0 0' }}
                  >
                    🗑️ Eliminar
                  </button>
                  <button
                    onClick={() => toggleInscripcion(m._id)}
                    style={{
                      ...boton,
                      backgroundColor: inscritos.includes(m._id) ? colores.exito : colores.error,
                      color: colores.blanco,
                      flex: '1 0 0',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {inscritos.includes(m._id) ? '✅ Inscrito' : '❌ No inscrito'}
                  </button>
                </div>
              </div>
            ))}
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
              style={{ ...boton, backgroundColor: colores.primario, color: colores.blanco, width: '100%', marginTop: '15px' }}
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
  title: { margin: 0, fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: colores.texto, fontWeight: '700' },
  subtitle: { margin: 'clamp(3px, 1vw, 5px) 0 0 0', color: '#64748b', fontSize: 'clamp(12px, 1.5vw, 14px)' },
  seccion: { backgroundColor: colores.blanco, padding: 'clamp(15px, 2.5vw, 25px)', borderRadius: 'clamp(8px, 1.5vw, 12px)', marginBottom: 'clamp(15px, 2vw, 20px)', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', boxSizing: 'border-box' },
  seccionTitulo: { margin: '0 0 clamp(12px, 2vw, 18px) 0', fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: colores.texto, fontWeight: '600' },
  vacio: { textAlign: 'center', color: '#94a3b8', padding: 'clamp(20px, 3vw, 30px)', fontSize: 'clamp(13px, 1.5vw, 15px)' },
  nombre: { margin: '0 0 clamp(10px, 2vw, 15px) 0', fontSize: 'clamp(16px, 2vw, 18px)', color: colores.texto, fontWeight: '700' },
  dato: { margin: 'clamp(5px, 1vw, 8px) 0', fontSize: 'clamp(13px, 1.5vw, 14px)', color: '#64748b', lineHeight: 1.5 },
  formCard: { backgroundColor: colores.blanco, padding: 'clamp(15px, 2.5vw, 25px)', borderRadius: 'clamp(8px, 1.5vw, 12px)', marginBottom: 'clamp(12px, 2vw, 18px)', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', boxSizing: 'border-box' },
  formTitulo: { margin: '0 0 clamp(12px, 2vw, 18px) 0', fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: colores.texto, fontWeight: '600' },
  input: { padding: 'clamp(10px, 2vw, 12px)', borderRadius: 'clamp(6px, 1vw, 8px)', border: '2px solid #e2e8f0', fontSize: 'clamp(13px, 1.5vw, 15px)', width: '100%', boxSizing: 'border-box' },
  botones: { display: 'flex', flexWrap: 'wrap', gap: 'clamp(8px, 1.5vw, 12px)', marginTop: 'clamp(12px, 2vw, 15px)' },
  errorBox: { padding: '12px', backgroundColor: '#fee2e2', color: colores.error, borderRadius: '8px', marginBottom: '15px', borderLeft: `4px solid ${colores.error}`, fontSize: 'clamp(13px, 1.5vw, 14px)' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' },
  modalContent: { backgroundColor: colores.blanco, padding: 'clamp(20px, 3vw, 30px)', borderRadius: '12px', maxWidth: 'min(500px, 90vw)', width: '100%', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' },
  modalTitle: { margin: '0 0 20px 0', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: colores.texto, fontWeight: '700', textAlign: 'center' },
  modalGrid: { display: 'grid', gap: '12px' },
  modalDato: { margin: 0, fontSize: 'clamp(14px, 1.5vw, 15px)', color: colores.texto, padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px', borderLeft: `4px solid ${colores.primario}` }
};

export default Dashboard;
