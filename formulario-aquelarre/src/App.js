import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).+$/;

    // Validación Nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre no puede estar vacío.';
    } else if (formData.nombre.length < 5) {
      newErrors.nombre = 'El nombre debe tener al menos 5 caracteres.';
    } else if (!regexNombre.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras y espacios.';
    }

    // Validación Correo
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo no puede estar vacío.';
    } else if (!regexCorreo.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido, por ejemplo: usuario@dominio.com.';
    }

    // Validación Contraseña
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña no puede estar vacía.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!regexPassword.test(formData.password)) {
      newErrors.password = 'Debe incluir mayúscula, número y símbolo especial.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('Registro exitoso. Bienvenido al Aquelarre del Señor Oscuro.');
      }
  };

  return (
    <main className="container">
      <h1>Registro al Aquelarre</h1>
      <form id="registroForm" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresa tu nombre de mortal"
          className={errors.nombre ? 'error' : ''}
        />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="ejemplo@dominio.com"
          className={errors.correo ? 'error' : ''}
        />
        {errors.correo && <span className="error-message">{errors.correo}</span>}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mínimo 8 caracteres"
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        <button type="submit">Unirse al Aquelarre</button>
      </form>
    </main>
  );
}

export default App;