import Formulario from "../components/Formulario"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const EditarCliente = () => {
	const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }

            setCargando(!cargando)
        }

        obtenerClienteAPI()
    }, [])

    return (
      <>
			<h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
			<p className="mt-3">Utiliza este formulario para editar los campos</p>


            {cargando ? <Spinner /> : cliente?.nombre ? (
                <Formulario 
				    cliente={cliente}
                    cargando={cargando}
			    />
            ) : (
                <p className="mt-10 mx-auto bg-orange-200 text-center font-bold text-blue-900 upppercase p-2 rounded-sm">
                    Cliente No Encontrado
                </p>
            )}
			

		</>
    )
}

export default EditarCliente