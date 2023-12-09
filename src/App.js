import React, { useState } from 'react';
import axios from 'axios';
import Cafes from './components/Cafes'
import Compra from './components/Compra';
import IngresarDinero from './components/IngresarDinero';
import ConfirmarCompra from './components/ConfirmarCompra';
import ResultadoCompra from './components/ResultadoCompra';
import cafesData from '../src/datos/cafes.json';

function App() {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(null);
  const [cafes, setCafes] = useState(cafesData);

  const handleCafeSelection = (type) => {
    setSelectedCafe({ type, ...cafes[type] });
  };

  const handleUpdateTotal = (newTotal) => {
    setTotal(newTotal);
  };

  const handleInsertMoney = (coins, bills) => {
    axios.post('http://localhost:5000/insert-money', { coinsInserted: coins, billsInserted: bills })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error inserting money:', error);
      });
  };

  const handleConfirmPurchase = (total) => {
    axios.post('http://localhost:5000/confirm-purchase', { totalPrice: total })
      .then(response => {
        setChange(response.data.change);
      })
      .catch(error => {
        console.error('Error confirming purchase:', error);
      });
  };

  return (
    <div>
      <Cafes cafes={cafes} onSelect={handleCafeSelection} />
      {selectedCafe && (
        <>
          <Compra selectedCafe={selectedCafe} onUpdateTotal={handleUpdateTotal} />
          <IngresarDinero onInsertMoney={handleInsertMoney} />
          <ConfirmarCompra total={total} onConfirmPurchase={handleConfirmPurchase} />
          {change !== null && <ResultadoCompra change={change} />}
        </>
      )}
    </div>
  );
}

export default App;
