import { useCallback, useMemo, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants"

const Resultado = () => {

    const { resultado, datos } = useCotizador()
    const { marca, plan, year} = datos
    //Congela el valor del year par que no se renderice al seleccionar otro desde el select
    const yearRef = useRef(year)

    //useCallback evita los rerenders
    const [nombreMarca] = useCallback( 
        MARCAS.filter(m => m.id === Number(marca)), 
        [resultado] 
    )

    //useMemo hace return de forma implicita mediante arrow function
    const [nombrePlan] = useMemo( () =>  
        PLANES.filter(p => p.id === Number(plan)), 
        [resultado] 
    )

    //console.log(nombreMarca)

    if(resultado === 0) return null

  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-700 font-black text-3xl">
            Resumen
        </h2>

        <p className="my-2">
            <span className="font-bold">Marca: </span>
            {nombreMarca.nombre}
        </p>

        <p className="my-2">
            <span className="font-bold">Plan: </span>
            {nombrePlan.nombre}
        </p>

        <p className="my-2">
            <span className="font-bold">Año del auto: </span>
            {yearRef.current}
        </p>

        <p className="my-2 text-2xl">
            <span className="font-bold">Total cotizacion: </span>
            {resultado}
        </p>
    </div>
  )
}

export default Resultado
