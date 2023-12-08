import React from 'react';

const ResultadoCompra = ({ change }) => {
  return (
    <div>
      <h2>5. Resultado de la Compra</h2>
      {change ? (
        <>
          <p>{`Su vuelto es de ${calculateTotalChange(change)} colones.`}</p>
          <p>Desglose:</p>
          <ul>
            {Object.entries(change).map(([coin, count]) => (
              <li key={coin}>{`${count} moneda(s) de ${coin} colones`}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Fallo al realizar la compra. Insuficientes monedas para el vuelto.</p>
      )}
    </div>
  );
};

const calculateTotalChange = (change) => {
  return Object.entries(change).reduce((total, [coin, count]) => total + coin * count, 0);
};

export default ResultadoCompra;
