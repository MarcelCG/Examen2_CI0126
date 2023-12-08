import React, { useState } from 'react';
import axios from 'axios';

const IngresarDinero = ({ onInsertMoney }) => {
  const [coins, setCoins] = useState('');
  const [bills, setBills] = useState(0);

  const handleCoinsChange = (e) => {
    setCoins(e.target.value);
  };

  const handleBillsChange = (e) => {
    const newBills = parseInt(e.target.value, 10);
    setBills(newBills);
  };

  const handleInsertMoney = () => {
    const parsedCoins = coins.split(',').map(coin => parseInt(coin.trim(), 10));
    onInsertMoney(parsedCoins, bills);
  };

  return (
    <div>
      <h2>3. Ingresar Dinero</h2>
      <label>Monedas (separadas por coma):</label>
      <input type="text" value={coins} onChange={handleCoinsChange} />
      <label>Billetes:</label>
      <input type="number" min="0" value={bills} onChange={handleBillsChange} />
      <button onClick={handleInsertMoney}>Ingresar Dinero</button>
    </div>
  );
};

export default IngresarDinero;
