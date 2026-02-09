import { useState } from 'react';

const Login = ({ cambiarVista }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Intentando login con:", credentials);
    // Aquí irá tu fetch('URL_DEL_BACKEND/login'...)
    alert("Login intentado (revisa la consola)");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Entrar</button>
        <p style={styles.link}>
          ¿No tienes cuenta? <span onClick={() => cambiarVista('registro')} style={styles.linkText}>Regístrate</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '20px',
    minHeight: '60vh'
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%',
    maxWidth: '400px',
    gap: '15px', 
    padding: '30px', 
    border: '1px solid #ccc', 
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backgroundColor: 'white'
  },
  title: {
    margin: '0 0 10px 0',
    textAlign: 'center',
    fontSize: 'clamp(1.5rem, 4vw, 2rem)'
  },
  input: { 
    padding: '12px', 
    borderRadius: '4px', 
    border: '1px solid #ddd',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box'
  },
  button: { 
    padding: '12px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  link: { 
    textAlign: 'center', 
    marginTop: '10px', 
    fontSize: 'clamp(12px, 3vw, 14px)'
  },
  linkText: { 
    color: '#646cff', 
    cursor: 'pointer', 
    textDecoration: 'underline',
    fontWeight: '500'
  }
};

export default Login;