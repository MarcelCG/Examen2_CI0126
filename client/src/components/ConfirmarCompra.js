import React from 'react';
import axios from 'axios';

const ConfirmarCompra = ({ total, onConfirmPurchase }) => {
  const handleConfirmPurchase = () => {
    onConfirmPurchase(total);
  };

  return (
    <div>
      <h2>4. Confirmar Compra</h2>
      <button onClick={handleConfirmPurchase}>Realizar Compra</button>
    </div>
  );
};

export default ConfirmarCompra;
