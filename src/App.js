import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://www.raydelto.org/agenda.php');
      setContacts(response.data);
    } catch (error) {
      console.error('Error al obtener los contactos:', error);
    }
  };

  const addContact = async (contact) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const jsonData = JSON.stringify(contact);

      const response = await axios.post('https://railway-node-express-production-3b13.up.railway.app/contacts', jsonData, config);

      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error('Error al agregar el contacto:', error);
    }
  };

  return (
    <div>
      <h1>Agenda Web</h1>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} />
    </div>
  );
};

const ContactList = ({ contacts }) => {
  return (
    <div>
      <h2>Lista de Contactos</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.nombre} {contact.apellido} - {contact.telefono}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactForm = ({ addContact }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(formData);
    setFormData({ nombre: '', apellido: '', telefono: '' });
  };

  return (
    <div>
      <h2>Agregar Contacto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
        <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
        <button type="submit">Guardar Contacto</button>
      </form>
    </div>
  );
};

export default App;