import MaquinaDeCafe from '../tu/ruta/MaquinaDeCafe';

describe('MaquinaDeCafe', () => {
  // Mock de la base de datos
  const mockData = {
    tiposDeCafe: [
      { nombre: "Café Americano", cantidad: 10, precio: 850 },
      { nombre: "Capuchino", cantidad: 8, precio: 950 },
      { nombre: "Latte", cantidad: 10, precio: 1150 },
      { nombre: "Mocachino", cantidad: 15, precio: 1300 }
    ],
    divisa: [
      { tipodeMoneda: 500, cantidad: 20, formato: "moneda" },
      { tipodeMoneda: 100, cantidad: 30, formato: "moneda" },
      { tipodeMoneda: 50, cantidad: 50, formato: "moneda" },
      { tipodeMoneda: 25, cantidad: 25, formato: "moneda" }
    ],
    divisaDisponible: [
      { tipodeMoneda: 500, formato: "moneda" },
      { tipodeMoneda: 100, formato: "moneda" },
      { tipodeMoneda: 50, formato: "moneda" },
      { tipodeMoneda: 25, formato: "moneda" },
      { tipodeMoneda: 1000, formato: "billete" }
    ]
  };

  // Inicialización de la máquina de café con el mock de datos
  const maquinaDeCafe = new MaquinaDeCafe(mockData);

  it('debería obtener tipos de café correctamente', () => {
    const tiposDeCafe = maquinaDeCafe.obtenerTiposDeCafe();
    expect(tiposDeCafe).toEqual(mockData.tiposDeCafe);
  });

  it('debería obtener la divisa disponible correctamente', () => {
    const divisaDisponible = maquinaDeCafe.obtenerDivisaDisponible();
    expect(divisaDisponible).toEqual(mockData.divisaDisponible);
  });

  it('debería calcular el cambio correctamente', () => {
    const precioTotal = 1000;
    const pago = 1500;

    const cambio = maquinaDeCafe.calcularCambio(precioTotal, pago);
    expect(cambio).toEqual(expect.any(Array));
  });

});

