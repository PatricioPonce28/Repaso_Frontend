import { useState, useEffect } from 'react';
import { colores, containerPrincipal, header, gridResponsivo, card, boton, label } from './estilos';
import { API_URL } from '../config';

const Dashboard = ({ usuario, cerrarSesion }) => {
  const [materias, setMaterias] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  
  const [formMateria, setFormMateria] = useState({
    nombre: '',
    codigo: '',
    creditos: '',
    nivel: ''
  });

  useEffect(() => {
    obtenerMaterias();
    obtenerMatriculas();
  }, []);

  const obtenerMaterias = async () => {
    try {
      const response = await fetch(`${API_URL}/api/materias`, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setMaterias(data);
    } catch (err) {
      console.error(err);
    }
  };

  const obtenerMatriculas = async () => {
    try {
      const response = await fetch(`${API_URL}/api/matriculas`, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      setMatriculas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const crearMateria = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/materias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formMateria)
      });

      if (response.ok) {
        alert('✅ Materia creada');
        setFormMateria({ nombre: '', codigo: '', creditos: '', nivel: '' });
        setShowForm(false);
        obtenerMaterias();
      } else {
        alert('❌ Error al crear materia');
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formMateria)
      });

      if (response.ok) {
        alert('✅ Materia actualizada');
        setFormMateria({ nombre: '', codigo: '', creditos: '', nivel: '' });
        setEditando(null);
        setShowForm(false);
        obtenerMaterias();
      } else {
        alert('❌ Error al actualizar');
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
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('✅ Materia eliminada');
        obtenerMaterias();
      } else {
        alert('❌ Error al eliminar');
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
      nivel: materia.nivel
    });
    setShowForm(true);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormMateria({ nombre: '', codigo: '', creditos: '', nivel: '' });
    setShowForm(false);
  };

  const inscribirMateria = async (materiaId) => {
    try {
      const response = await fetch(`${API_URL}/api/matriculas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          estudiante_id: usuario._id,
          materia_id: materiaId
        })
      });

      if (response.ok) {
        alert('✅ Te inscribiste exitosamente');
        obtenerMatriculas();
      } else {
        alert('❌ Error al inscribirse');
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const desinscribirMateria = async (matriculaId) => {
    try {
      const response = await fetch(`${API_URL}/api/matriculas/${matriculaId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('❌ Te desinscribiste');
        obtenerMatriculas();
      } else {
        alert('❌ Error al desinscribirse');
      }
    } catch (err) {
      alert('❌ Error de conexión');
    }
  };

  const misMatriculas = matriculas.filter(m => m.estudiante_id === usuario._id);

  return (
    <div style={containerPrincipal}>
      {/* Header */}
      <div style={header}>
        <div>
          <h1 style={s.title}>📚 Gestión de Materias</h1>
          <p style={s.subtitle}>Bienvenido, {usuario.nombre}</p>
        </div>
        <button onClick={cerrarSesion} style={{...boton, backgroundColor: colores.error, color: colores.blanco}}>
          Salir
        </button>
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
                />
              </div>
              <div>
                <label style={label}>Créditos *</label>
                <input 
                  name="creditos" 
                  type="number" 
                  placeholder="4" 
                  onChange={(e) => setFormMateria({...formMateria, creditos: e.target.value})} 
                  value={formMateria.creditos} 
                  style={s.input} 
                  required 
                />
              </div>
              <div>
                <label style={label}>Nivel *</label>
                <input 
                  name="nivel" 
                  placeholder="Primero" 
                  onChange={(e) => setFormMateria({...formMateria, nivel: e.target.value})} 
                  value={formMateria.nivel} 
                  style={s.input} 
                  required 
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
              const materia = materias.find(m => m._id === matricula.materia_id);
              if (!materia) return null;
              return (
                <div key={matricula._id} style={{...card, backgroundColor: '#f0fdf4', border: '2px solid #86efac'}}>
                  <h4 style={s.nombre}>{materia.nombre}</h4>
                  <p style={s.dato}>📋 {materia.codigo}</p>
                  <p style={s.dato}>⭐ {materia.creditos} créditos</p>
                  <p style={s.dato}>📊 Nivel {materia.nivel}</p>
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
              const estaInscrito = misMatriculas.some(mat => mat.materia_id === m._id);
              return (
                <div key={m._id} style={card}>
                  <h4 style={s.nombre}>{m.nombre}</h4>
                  <p style={s.dato}>📋 {m.codigo}</p>
                  <p style={s.dato}>⭐ {m.creditos} créditos</p>
                  <p style={s.dato}>📊 Nivel {m.nivel}</p>
                  
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
                      {estaInscrito ? '✓ Inscrito' : '➕ Inscribirse'}
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
  }
};

export default Dashboard;