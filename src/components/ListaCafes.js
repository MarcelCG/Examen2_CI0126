import React from 'react';
import Cafes from './Cafes';

// Componente que representa la pantalla de cafés disponibles
export default function CafesDisponibles({ tipos }) {
    return (
        // Contenedor principal de la pantalla de cafés disponibles
        <div className='contenedor-cafes mb-3'>
            <div className="tarjeta-encabezado">
                <h2 className='texto-centrado'>Cafés Disponibles</h2>
            </div>
            <div className='tarjeta-cuerpo fila texto-centrado'>
                {/* Mapea sobre cada tipo de café y muestra su tarjeta correspondiente */}
                {tipos.map(cafe => (
                    <div className='columna-6 mb-3' key={cafe.nombre}>
                        <Cafes cafe={cafe} />
                    </div>
                ))}
            </div>
        </div>
    )
}
