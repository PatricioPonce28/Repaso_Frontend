import { useState, useEffect } from 'react';
import { colores, containerPrincipal, header, gridResponsivo, card, boton } from './estilos';

const Dashboard = ({ usuario, cerrarSesion }) => {
  const [materias, setMaterias] = useState([]);
  const [inscritas, setInscritas] = useState([]);

  useEffect(() => {
    fetch('https://backend-repaso-ex-final.onrender.com/api/materias')
      .then(res => res.json())
      .then(data => setMaterias(data))
      .catch(err => console.error(err));
  }, []);

  const inscribir = (materia) => {
    if (inscritas.find(m => m._id === materia._id)) {
      alert('Ya estás inscrito');
      return;
    }
    setInscritas([...inscritas, materia]);
    alert(`✅ Inscrito en: ${materia.nombre}`);
  };

  const desinscribir = (id) => {
    setInscritas(inscritas.filter(m => m._id !== id));
    alert('❌ Desinscrito');
  };

  return (
    <div style={containerPrincipal}>
      {/* Header */}
      <div style={header}>
        <div>
          <h1 style={s.title}>📚 Mis Materias</h1>
          <p style={s.subtitle}>Hola, {usuario.nombre}</p>
        </div>
        <button onClick={cerrarSesion} style={{...boton, backgroundColor: colores.error, color: colores.blanco}}>
          Salir
        </button>
      </div>

      {/* Mis Materias Inscritas */}
      <div style={s.seccion}>
        <h3 style={s.seccionTitulo}>📝 Inscritas ({inscritas.length})</h3>
        {inscritas.length === 0 ? (
          <p style={s.vacio}>Sin materias inscritas</p>
        ) : (
          <div style={gridResponsivo}>
            {inscritas.map(m => (
              <div key={m._id} style={{...card, backgroundColor: '#f0fdf4', border: '2px solid #86efac'}}>
                <h4 style={s.nombre}>{m.nombre}</h4>
                <p style={s.dato}>📋 {m.codigo}</p>
                <p style={s.dato}>⭐ {m.creditos} créditos</p>
                <p style={s.dato}>📊 Nivel {m.nivel}</p>
                <button 
                  onClick={() => desinscribir(m._id)} 
                  style={{...boton, backgroundColor: colores.error, color: colores.blanco, width: '100%', marginTop: 'clamp(8px, 1.5vw, 12px)'}}
                >
                  ❌ Desinscribir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Materias Disponibles */}
      <div style={s.seccion}>
        <h3 style={s.seccionTitulo}>📚 Disponibles ({materias.length})</h3>
        {materias.length === 0 ? (
          <p style={s.vacio}>No hay materias disponibles</p>
        ) : (
          <div style={gridResponsivo}>
            {materias.map(m => (
              <div key={m._id} style={card}>
                <h4 style={s.nombre}>{m.nombre}</h4>
                <p style={s.dato}>📋 {m.codigo}</p>
                <p style={s.dato}>⭐ {m.creditos} créditos</p>
                <p style={s.dato}>📊 Nivel {m.nivel}</p>
                <button 
                  onClick={() => inscribir(m)} 
                  style={{
                    ...boton, 
                    backgroundColor: inscritas.find(i => i._id === m._id) ? '#94a3b8' : colores.primario, 
                    color: colores.blanco, 
                    width: '100%', 
                    marginTop: 'clamp(8px, 1.5vw, 12px)',
                    cursor: inscritas.find(i => i._id === m._id) ? 'not-allowed' : 'pointer'
                  }}
                  disabled={inscritas.find(i => i._id === m._id)}
                >
                  {inscritas.find(i => i._id === m._id) ? '✓ Inscrito' : '➕ Inscribirse'}
                </button>
              </div>
            ))}
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
  }
};

export default Dashboard;