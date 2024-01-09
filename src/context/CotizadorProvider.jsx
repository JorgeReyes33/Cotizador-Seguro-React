import { useState, createContext } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

//El provider es donde se define el state, algunos effects, funciones, etc (fuente de los datos)
const CotizadorProvider = ({children}) => {

    /*
    const hola = "Hola mundo"
    const fnHolaMundo = () => {
        console.log("Hola Mundo desde una funcion")
    }
    */

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        //console.log(e.target.name)
        //console.log(e.target.value)
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000

        //Obtener diferencia de years
        const diferencia = obtenerDiferenciaYear(datos.year)
        console.log(diferencia)

        //Hay que restar el 3% por cada year
        resultado -= ((diferencia * 3) * resultado) / 100
        console.log(resultado)

        // Americano 15%
        // Europeo 30%
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        console.log(resultado)

        // Basico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan)
        
        //resultado = resultado.toFixed(2)

        //Formatear dinero
        resultado = formatearDinero(resultado)
        
        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);

    }

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext