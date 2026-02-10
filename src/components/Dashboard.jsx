import { colores } from './estilos';

const Dashboard = ({ usuario, cerrarSesion }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Dashboard Estudiantes</h1>
        <button 
          onClick={cerrarSesion} 
          style={styles.logoutButton}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          ← Cerrar Sesión
        </button>
      </div>

      <div style={styles.welcomeCard}>
        <div style={styles.welcomeIcon}>👋</div>
        <h2 style={styles.welcomeTitle}>¡Bienvenido, {usuario.nombre}!</h2>
        <p style={styles.welcomeText}>{usuario.email}</p>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardIcon}>📚</div>
          <h3 style={styles.cardTitle}>Mis Cursos</h3>
          <p style={styles.cardText}>Gestiona tus materias</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📝</div>
          <h3 style={styles.cardTitle}>Tareas</h3>
          <p style={styles.cardText}>Tareas pendientes</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>📊</div>
          <h3 style={styles.cardTitle}>Calificaciones</h3>
          <p style={styles.cardText}>Tus notas</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardIcon}>👤</div>
          <h3 style={styles.cardTitle}>Perfil</h3>
          <p style={styles.cardText}>Tu información</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
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
    gap: '15px'
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    margin: 0,
    color: colores.texto,
    fontWeight: '700'
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
    transition: 'transform 0.2s',
    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
  },
  welcomeCard: {
    background: `linear-gradient(135deg, ${colores.primario} 0%, ${colores.secundario} 100%)`,
    color: colores.blanco,
    padding: '40px',
    borderRadius: '16px',
    marginBottom: '30px',
    textAlign: 'center',
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)'
  },
  welcomeIcon: {
    fontSize: '48px',
    marginBottom: '15px'
  },
  welcomeTitle: {
    margin: '0 0 10px 0',
    fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
    fontWeight: '700'
  },
  welcomeText: {
    margin: 0,
    opacity: 0.95,
    fontSize: 'clamp(14px, 2vw, 16px)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  card: {
    backgroundColor: colores.blanco,
    padding: '30px',
    borderRadius: '16px',
    border: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    textAlign: 'center'
  },
  cardIcon: {
    fontSize: '40px',
    marginBottom: '15px'
  },
  cardTitle: {
    margin: '0 0 10px 0',
    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
    color: colores.texto,
    fontWeight: '700'
  },
  cardText: {
    margin: 0,
    color: '#64748b',
    fontSize: 'clamp(13px, 2vw, 15px)'
  }
};

export default Dashboard;