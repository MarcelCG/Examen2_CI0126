import React from 'react';

// Componente funcional que representa la información principal de un café.
export default function Cafe({ cafe }) {
  return (
    <div className="card mx-auto" style={{ width: '30rem' }}>
      <div className="card-body">
        <h5 className="card-title">{cafe.nombre}</h5>
        <p className="card-text">
          <strong>Costo de:</strong> {cafe.precio} colones
        </p>
        <p className="card-text">
          <strong>Disponibles:</strong> {cafe.cantidad}
        </p>
      </div>
    </div>
  );
};
