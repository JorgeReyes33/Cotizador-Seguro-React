import { CotizadorProvider } from './context/CotizadorProvider'
import AppSeguro from "./components/AppSeguro"

function App() {

    //El provider envuelve toda la aplicacion, y los componentes dentro de el hacen la funcion de hijos o children
    //El provider que rodea al resto de componentes tiene todos los datos, por lo tanto cualquier componente podra tener
    //acceso a ellos
  return (
    
    <CotizadorProvider>
        <AppSeguro />
    </CotizadorProvider>
    
  )
}

export default App
