// Colores base
export const colores = {
  primario: '#6366f1',
  secundario: '#8b5cf6',
  exito: '#10b981',
  error: '#ef4444',
  advertencia: '#f59e0b',
  fondo: '#f8fafc',
  texto: '#1e293b',
  blanco: '#ffffff'
};

// Estilos base RESPONSIVE para TODOS los dispositivos
export const estilosBase = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 'clamp(15px, 3vw, 40px)', // Se adapta según pantalla
    minHeight: '70vh',
    backgroundColor: colores.fondo,
    width: '100%',
    boxSizing: 'border-box'
  },
  
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%',
    maxWidth: 'min(450px, 90vw)', // Nunca más del 90% del ancho
    gap: 'clamp(12px, 2vw, 18px)',
    padding: 'clamp(25px, 4vw, 40px)',
    border: 'none', 
    borderRadius: 'clamp(12px, 2vw, 16px)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    backgroundColor: colores.blanco,
    boxSizing: 'border-box'
  },
  
  title: {
    margin: '0 0 clamp(15px, 3vw, 20px) 0',
    textAlign: 'center',
    fontSize: 'clamp(1.3rem, 3vw, 2rem)', // 21px móvil → 32px desktop
    color: colores.texto,
    fontWeight: '700',
    lineHeight: '1.2'
  },
  
  input: { 
    padding: 'clamp(10px, 2vw, 14px)',
    borderRadius: 'clamp(6px, 1vw, 8px)',
    border: `2px solid #e2e8f0`,
    fontSize: 'clamp(14px, 1.5vw, 16px)',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
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
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
    width: '100%'
  },
  
  link: { 
    textAlign: 'center', 
    marginTop: 'clamp(10px, 2vw, 15px)',
    fontSize: 'clamp(13px, 1.5vw, 15px)',
    color: '#64748b'
  },
  
  linkText: { 
    color: colores.primario, 
    cursor: 'pointer', 
    textDecoration: 'none',
    fontWeight: '600',
    borderBottom: `2px solid transparent`,
    transition: 'border-color 0.3s'
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

// Estilos para labels (reutilizable)
export const label = {
  display: 'block',
  marginBottom: 'clamp(6px, 1vw, 8px)',
  fontSize: 'clamp(13px, 1.5vw, 14px)',
  fontWeight: '600',
  color: colores.texto
};

// Estilos para contenedores principales (dashboards)
export const containerPrincipal = {
  padding: 'clamp(15px, 2vw, 25px)',
  maxWidth: 'min(1400px, 95vw)', // Máximo 1400px o 95% del viewport
  margin: '0 auto',
  minHeight: '100vh',
  backgroundColor: colores.fondo,
  width: '100%',
  boxSizing: 'border-box'
};

// Estilos para headers
export const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 'clamp(15px, 2vw, 25px)',
  padding: 'clamp(15px, 2vw, 25px)',
  backgroundColor: colores.blanco,
  borderRadius: 'clamp(8px, 1.5vw, 12px)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  flexWrap: 'wrap',
  gap: 'clamp(10px, 2vw, 15px)'
};

// Estilos para grids responsivos
export const gridResponsivo = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px, 100%), 1fr))',
  gap: 'clamp(12px, 2vw, 20px)',
  width: '100%'
};

// Estilos para cards
export const card = {
  padding: 'clamp(15px, 2vw, 20px)',
  border: '2px solid #e2e8f0',
  borderRadius: 'clamp(8px, 1.5vw, 12px)',
  backgroundColor: colores.blanco,
  transition: 'all 0.3s',
  boxSizing: 'border-box'
};

// Estilos para botones generales
export const boton = {
  padding: 'clamp(10px, 2vw, 14px) clamp(15px, 3vw, 24px)',
  border: 'none',
  borderRadius: 'clamp(6px, 1vw, 8px)',
  cursor: 'pointer',
  fontSize: 'clamp(13px, 1.5vw, 15px)',
  fontWeight: '600',
  transition: 'all 0.3s',
  boxSizing: 'border-box'
};