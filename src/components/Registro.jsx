import { useState } from 'react';

const Registro = ({ cambiarVista }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando a registro:", formData);
    // Aquí irá tu fetch('URL_DEL_BACKEND/registro'...)
    alert("Usuario registrado (revisa la consola)");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Crear Cuenta</h2>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} style={styles.input} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} style={styles.input} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} style={styles.input} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button}>Registrarse</button>
        <p style={styles.link}>
          ¿Ya tienes cuenta? <span onClick={() => cambiarVista('login')} style={styles.linkText}>Inicia sesión</span>
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
    backgroundColor: '#646cff', 
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

export default Registro;