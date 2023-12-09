import React from 'react';

// Componente que representa un modal personalizado
export default function MiModal ({ identificador, contenido, refBoton, boton, titulo }) {
    const cerrarModal = () => {
        refBoton.current.click();
    }
    return (
        <div className="modal fade" id={identificador} tabIndex="-1" role="dialog" aria-labelledby={identificador} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{titulo}</h5>
                        <button type="button" className="btn-close" onClick={cerrarModal} aria-label="Cerrar">
                        </button>
                    </div>
                    <div className="modal-body">
                        {contenido}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
                        {boton ? boton : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};
