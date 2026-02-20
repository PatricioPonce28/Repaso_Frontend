import { useState, useEffect } from 'react';
import { colores, containerPrincipal, header, gridResponsivo, card, boton, label } from './estilos';

const DashboardAdmin = ({ usuario, cerrarSesion }) => {
  const [tab, setTab] = useState('estudiantes');
  const [estudiantes, setEstudiantes] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [showFormEst, setShowFormEst] = useState(false);
  const [showFormMat, setShowFormMat] = useState(false);
  
  const [formEst, setFormEst] = useState({
    nombre: '', apellido: '', cedula: '', fecha_nacimiento: '',
    ciudad: '', direccion: '', telefono: '', email: ''
  });
  
  const [formMat, setFormMat] = useState({
    nombre: '', codigo: '', creditos: '', nivel: ''
  });

  useEffect(() => {
    cargarEstudiantes();
    cargarMaterias();
  }, []);

  const cargarEstudiantes = () => {
    fetch('https://backend-repaso-ex-final.onrender.com/api/estudiantes')
      .then(res => res.json())
      .then(data => setEstudiantes(data))
      .catch(err => console.error(err));
  };

  const cargarMaterias = () => {
    fetch('https://backend-repaso-ex-final.onrender.com/api/materias')
      .then(res => res.json())
      .then(data => setMaterias(data))
      .catch(err => console.error(err));
  };

  const crearEstudiante = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-repaso-ex-final.onrender.com/api/estudiantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formEst)
      });
      if (res.ok) {
        alert('✅ Estudiante creado');
        setFormEst({ nombre: '', apellido: '', cedula: '', fecha_nacimiento: '', ciudad: '', direccion: '', telefono: '', email: '' });
        setShowFormEst(false);
        cargarEstudiantes();
      }
    } catch (err) {
      alert('❌ Error');
    }
  };

  const crearMateria = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-repaso-ex-final.onrender.com/api/materias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formMat)
      });
      if (res.ok) {
        alert('✅ Materia creada');
        setFormMat({ nombre: '', codigo: '', creditos: '', nivel: '' });
        setShowFormMat(false);
        cargarMaterias();
      }
    } catch (err) {
      alert('❌ Error');
    }
  };

  return (
    <div style={containerPrincipal}>
      {/* Header */}
      <div style={header}>
        <div>
          <h1 style={s.title}>🔧 Panel Admin</h1>
          <p style={s.subtitle}>Bienvenido, {usuario.nombre}</p>
        </div>
        <button onClick={cerrarSesion} style={{...boton, backgroundColor: colores.error, color: colores.blanco}}>
          ← Salir
        </button>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        <button 
          onClick={() => setTab('estudiantes')} 
          style={tab === 'estudiantes' ? s.tabActiva : s.tab}
        >
          👨‍🎓 Estudiantes
        </button>
        <button 
          onClick={() => setTab('materias')} 
          style={tab === 'materias' ? s.tabActiva : s.tab}
        >
          📚 Materias
        </button>
      </div>

      {/* ESTUDIANTES */}
      {tab === 'estudiantes' && (
        <>
          <button 
            onClick={() => setShowFormEst(!showFormEst)} 
            style={{...boton, backgroundColor: colores.primario, color: colores.blanco, marginBottom: 'clamp(12px, 2vw, 18px)'}}
          >
            {showFormEst ? '❌ Cancelar' : '➕ Nuevo Estudiante'}
          </button>

          {showFormEst && (
            <div style={s.formCard}>
              <h3 style={s.formTitulo}>Crear Estudiante</h3>
              <form onSubmit={crearEstudiante}>
                <div style={gridResponsivo}>
                  <div>
                    <label style={label}>Nombre *</label>
                    <input 
                      name="nombre" 
                      placeholder="Juan" 
                      onChange={(e) => setFormEst({...formEst, nombre: e.target.value})} 
                      value={formEst.nombre} 
                      style={s.input} 
                      required 
                    />
                  </div>
                  <div>
                    <label style={label}>Apellido *</label>
                    <input 
                      name="apellido" 
                      placeholder="Pérez" 
                      onChange={(e) => setFormEst({...formEst, apellido: e.target.value})} 
                      value={formEst.apellido} 
                      style={s.input} 
                      required 
                    />
                  </div>
                  <div>
                    <label style={label}>Cédula *</label>
                    <input 
                      name="cedula" 
                      placeholder="1234567890" 
                      onChange={(e) => setFormEst({...formEst, cedula: e.target.value})} 
                      value={formEst.cedula} 
                      style={s.input} 
                      required 
                    />
                  </div>
                  <div>
                    <label style={label}>Fecha Nacimiento</label>
                    <input 
                      name="fecha_nacimiento" 
                      type="date" 
                      onChange={(e) => setFormEst({...formEst, fecha_nacimiento: e.target.value})} 
                      value={formEst.fecha_nacimiento} 
                      style={s.input} 
                    />
                  </div>
                  <div>
                    <label style={label}>Ciudad</label>
                    <input 
                      name="ciudad" 
                      placeholder="Quito" 
                      onChange={(e) => setFormEst({...formEst, ciudad: e.target.value})} 
                      value={formEst.ciudad} 
                      style={s.input} 
                    />
                  </div>
                  <div>
                    <label style={label}>Dirección</label>
                    <input 
                      name="direccion" 
                      placeholder="Av. Principal" 
                      onChange={(e) => setFormEst({...formEst, direccion: e.target.value})} 
                      value={formEst.direccion} 
                      style={s.input} 
                    />
                  </div>
                  <div>
                    <label style={label}>Teléfono</label>
                    <input 
                      name="telefono" 
                      placeholder="0987654321" 
                      onChange={(e) => setFormEst({...formEst, telefono: e.target.value})} 
                      value={formEst.telefono} 
                      style={s.input} 
                    />
                  </div>
                  <div>
                    <label style={label}>Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="correo@mail.com" 
                      onChange={(e) => setFormEst({...formEst, email: e.target.value})} 
                      value={formEst.email} 
                      style={s.input} 
                    />
                  </div>
                </div>
                <button type="submit" style={{...boton, backgroundColor: colores.exito, color: colores.blanco, width: '100%', marginTop: 'clamp(12px, 2vw, 18px)'}}>
                  💾 Guardar Estudiante
                </button>
              </form>
            </div>
          )}

          <div style={s.listaCard}>
            <h3 style={s.listaTitulo}>📋 Estudiantes ({estudiantes.length})</h3>
            {estudiantes.length === 0 ? (
              <p style={s.vacio}>No hay estudiantes</p>
            ) : (
              <div style={gridResponsivo}>
                {estudiantes.map(e => (
                  <div key={e._id} style={card}>
                    <h4 style={s.nombre}>{e.nombre} {e.apellido}</h4>
                    <p style={s.dato}>🆔 {e.cedula}</p>
                    <p style={s.dato}>📧 {e.email || 'Sin email'}</p>
                    <p style={s.dato}>📞 {e.telefono || 'Sin teléfono'}</p>
                    <p style={s.dato}>🏙️ {e.ciudad || 'Sin ciudad'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* MATERIAS */}
      {tab === 'materias' && (
        <>
          <button 
            onClick={() => setShowFormMat(!showFormMat)} 
            style={{...boton, backgroundColor: colores.primario, color: colores.blanco, marginBottom: 'clamp(12px, 2vw, 18px)'}}
          >
            {showFormMat ? '❌ Cancelar' : '➕ Nueva Materia'}
          </button>

          {showFormMat && (
            <div style={s.formCard}>
              <h3 style={s.formTitulo}>Crear Materia</h3>
              <form onSubmit={crearMateria}>
                <div style={gridResponsivo}>
                  <div>
                    <label style={label}>Nombre *</label>
                    <input 
                      name="nombre" 
                      placeholder="Cálculo I" 
                      onChange={(e) => setFormMat({...formMat, nombre: e.target.value})} 
                      value={formMat.nombre} 
                      style={s.input} 
                      required 
                    />
                  </div>
                  <div>
                    <label style={label}>Código *</label>
                    <input 
                      name="codigo" 
                      placeholder="MAT101" 
                      onChange={(e) => setFormMat({...formMat, codigo: e.target.value})} 
                      value={formMat.codigo} 
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
                      onChange={(e) => setFormMat({...formMat, creditos: e.target.value})} 
                      value={formMat.creditos} 
                      style={s.input} 
                      required 
                    />
                  </div>
                  <div>
                    <label style={label}>Nivel *</label>
                    <input 
                      name="nivel" 
                      placeholder="Primero" 
                      onChange={(e) => setFormMat({...formMat, nivel: e.target.value})} 
                      value={formMat.nivel} 
                      style={s.input} 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" style={{...boton, backgroundColor: colores.exito, color: colores.blanco, width: '100%', marginTop: 'clamp(12px, 2vw, 18px)'}}>
                  💾 Guardar Materia
                </button>
              </form>
            </div>
          )}

          <div style={s.listaCard}>
            <h3 style={s.listaTitulo}>📚 Materias ({materias.length})</h3>
            {materias.length === 0 ? (
              <p style={s.vacio}>No hay materias</p>
            ) : (
              <div style={gridResponsivo}>
                {materias.map(m => (
                  <div key={m._id} style={card}>
                    <h4 style={s.nombre}>{m.nombre}</h4>
                    <p style={s.dato}>📋 {m.codigo}</p>
                    <p style={s.dato}>⭐ {m.creditos} créditos</p>
                    <p style={s.dato}>📊 Nivel {m.nivel}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
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
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#64748b'
  },
  tabs: {
    display: 'flex',
    gap: 'clamp(8px, 1.5vw, 12px)',
    marginBottom: 'clamp(12px, 2vw, 18px)',
    flexWrap: 'wrap'
  },
  tab: {
    ...boton,
    backgroundColor: colores.blanco,
    color: colores.texto,
    border: '2px solid #e2e8f0'
  },
  tabActiva: {
    ...boton,
    backgroundColor: colores.primario,
    color: colores.blanco,
    border: 'none'
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
  listaCard: {
    backgroundColor: colores.blanco,
    padding: 'clamp(15px, 2.5vw, 25px)',
    borderRadius: 'clamp(8px, 1.5vw, 12px)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    boxSizing: 'border-box'
  },
  listaTitulo: {
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
  }
};

export default DashboardAdmin;