import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cafes = ({ onSelect }) => {
  const [cafes, setCafes] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/cafes')
      .then(response => {
        setCafes(response.data);
      })
      .catch(error => {
        console.error('Error fetching cafes:', error);
      });
  }, []);

  return (
    <div>
      <h2>1. Cafés Disponibles</h2>
      {Object.entries(cafes).map(([type, details]) => (
        <div key={type}>
          <p>{`${type.charAt(0).toUpperCase()}${type.slice(1)} - Disponibles: ${details.stock} Precio: ${details.price}`}</p>
          <button onClick={() => onSelect(type)}>Seleccionar</button>
        </div>
      ))}
    </div>
  );
};

export default Cafes;
