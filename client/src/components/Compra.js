import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Compra = ({ selectedCafe, onUpdateTotal }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedCafe) {
      setTotal(selectedCafe.price * quantity);
      onUpdateTotal(selectedCafe.price * quantity);
    }
  }, [selectedCafe, quantity, onUpdateTotal]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
  };

  return (
    <div>
      <h2>2. Realizar Compra</h2>
      <p>{`Tipo de Café: ${selectedCafe ? selectedCafe.type : 'Seleccione'}`}</p>
      <label>Cantidad:</label>
      <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
      <p>{`Costo Total: ${total} colones`}</p>
    </div>
  );
};

export default Compra;
