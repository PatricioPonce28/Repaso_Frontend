// Colores base que puedes cambiar fácilmente
export const colores = {
  primario: '#6366f1',      // Morado
  secundario: '#8b5cf6',    // Morado claro
  exito: '#10b981',         // Verde
  error: '#ef4444',         // Rojo
  advertencia: '#f59e0b',   // Amarillo
  fondo: '#f8fafc',         // Gris claro
  texto: '#1e293b',         // Gris oscuro
  blanco: '#ffffff'
};

// Estilos base reutilizables para TODOS tus componentes
export const estilosBase = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '20px',
    minHeight: '70vh',
    backgroundColor: colores.fondo
  },
  
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%',
    maxWidth: '450px',
    gap: '15px', 
    padding: '40px', 
    border: 'none', 
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    backgroundColor: colores.blanco
  },
  
  title: {
    margin: '0 0 20px 0',
    textAlign: 'center',
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: colores.texto,
    fontWeight: '700'
  },
  
  input: { 
    padding: '14px', 
    borderRadius: '8px', 
    border: `2px solid #e2e8f0`,
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none'
  },
  
  inputFocus: {
    borderColor: colores.primario
  },
  
  button: { 
    padding: '14px', 
    background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
    color: colores.blanco, 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
  },
  
  link: { 
    textAlign: 'center', 
    marginTop: '15px', 
    fontSize: 'clamp(13px, 3vw, 15px)',
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
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: colores.error,
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '14px',
    borderLeft: `4px solid ${colores.error}`
  },
  
  exito: {
    padding: '12px',
    backgroundColor: '#d1fae5',
    color: colores.exito,
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '14px',
    borderLeft: `4px solid ${colores.exito}`
  }
};