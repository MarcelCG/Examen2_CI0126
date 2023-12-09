import { Component } from 'react';
import datos from '../datos/cafes.json'

class MaquinaDeCafe extends Component {
    constructor() {
        super();
        this.state = {
            tiposDeCafe: datos.tiposDeCafe,
            divisa: datos.divisa,
            divisaDisponible: datos.divisaDisponible,
        };
    }
        obtenerTiposDeCafe() {
            return this.state.tiposDeCafe;
        }
    
        obtenerDivisaDisponible() {
            return this.state.divisa;
        }
    
        obtenerDivisa() {
            return this.state.divisa;
        }
    
        actualizarDivisa(nuevasdivisa) {
            this.state.divisa = nuevasdivisa;
        }
    
        actualizarTiposDeCafe(nuevosTiposDeCafe) {
            this.state.tiposDeCafe = nuevosTiposDeCafe;
        }
    
        // Reducir la cantidad de monedas de cambio después de una compra
        reducirDivisa(cambio) {
            const nuevasdivisa = this.state.divisa.map((moneda) => {
                const monedaCambiada = cambio.find((c) => c.denominacion === moneda.denominacion);
                return monedaCambiada
                    ? { ...moneda, cantidad: moneda.cantidad - monedaCambiada.cantidad }
                    : moneda;
            });
    
            this.actualizarDivisa(nuevasdivisa);
        }
    
        // Procesar una compra de café
        comprarCafes(tiposDeCafe, credito) {
            // Calcular el precio total de los cafés seleccionados
            const precioTotal = tiposDeCafe.reduce((total, tipoDeCafe) => {
                return total + tipoDeCafe.precio * tipoDeCafe.cantidad;
            }, 0);
    
            // Verificar si el usuario tiene suficiente crédito
            if (precioTotal > credito)
                return {
                    error: 'Crédito insuficiente',
                    cambio: null
                };
    
            // Calcular y validar el cambio
            const cambio = this.calcularCambio(precioTotal, credito);
            if (cambio === null)
                return {
                    error: 'Cambio insuficiente',
                    cambio: null
                };
    
            // Actualizar el inventario de café y monedas de cambio
            this.reducirdivisa(cambio);
            const nuevosTiposDeCafe = [...this.state.tiposDeCafe];
    
            tiposDeCafe.forEach(tipoDeCafe => {
                const indice = nuevosTiposDeCafe.findIndex(tipo => tipo.nombre === tipoDeCafe.nombre);
                if (indice !== -1) {
                    nuevosTiposDeCafe[indice] = {
                        ...nuevosTiposDeCafe[indice],
                        cantidad: nuevosTiposDeCafe[indice].cantidad - tipoDeCafe.cantidad,
                    };
                }
            });
    
            this.actualizarTiposDeCafe(nuevosTiposDeCafe);
    
            // Devolver detalles de compra exitosa
            return {
                error: null,
                cambio: cambio
            };
        }
    
        // Calcular el cambio a devolver
        calcularCambio(precioTotal, pago) {
            let cambioRestante = pago - precioTotal;
            const divisa = this.obtenerDivisa();
            const cambio = [];
    
            // Iterar sobre las monedas de cambio disponibles
            for (const moneda of divisa) {
                const cantidadAUtilizar = Math.min(Math.floor(cambioRestante / moneda.denominacion), moneda.cantidad);
    
                if (cantidadAUtilizar > 0) {
                    cambio.push({
                        denominacion: moneda.denominacion,
                        tipo: moneda.tipo,
                        cantidad: cantidadAUtilizar,
                    });
    
                    cambioRestante -= moneda.denominacion * cantidadAUtilizar;
                }
    
                if (cambioRestante === 0) {
                    break;
                }
            }
    
            // Verificar si no hay suficiente cambio
            if (cambioRestante > 0) {
                return null;
            }
    
            return cambio;
        }
    }
    
    export default MaquinaDeCafe;