import { useState } from 'react';
import { estilosBase, colores } from './estilos';

const Registro = ({ volverLogin }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    setExito('');

    try {
      const response = await fetch('https://backend-repaso-ex-final.onrender.com/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registro exitoso:", data);
        setExito('¡Cuenta creada! Redirigiendo al login...');
        setTimeout(() => {
          volverLogin();
        }, 2000);
      } else {
        setError(data.msg || 'Error al registrarse');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={estilosBase.container}>
      <form onSubmit={handleSubmit} style={estilosBase.form}>
        <div style={styles.iconContainer}>
          <div style={styles.icon}>👤</div>
        </div>
        
        <h2 style={estilosBase.title}>Crear Cuenta</h2>
        
        {error && <div style={estilosBase.error}>{error}</div>}
        {exito && <div style={estilosBase.exito}>{exito}</div>}
        
        <div>
          <label style={styles.label}>Nombre</label>
          <input 
            name="nombre" 
            placeholder="Juan" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Apellido</label>
          <input 
            name="apellido" 
            placeholder="Pérez" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Correo Electrónico</label>
          <input 
            name="email" 
            type="email" 
            placeholder="tu@email.com" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>

        <div>
          <label style={styles.label}>Contraseña</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            onChange={handleChange} 
            style={estilosBase.input} 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          style={estilosBase.button} 
          disabled={cargando}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          {cargando ? '⏳ Registrando...' : '🚀 Registrarse'}
        </button>
        
        <p style={estilosBase.link}>
          ¿Ya tienes cuenta? <span onClick={volverLogin} style={estilosBase.linkText}>Inicia sesión</span>
        </p>
      </form>
    </div>
  );
};

const styles = {
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  icon: {
    fontSize: '48px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: colores.texto
  }
};

export default Registro;