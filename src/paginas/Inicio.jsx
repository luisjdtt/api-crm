import { useState, useEffect } from "react"
import Cliente from "../components/Cliente"
import { useNavigate } from "react-router-dom"
import { array } from "yup"

const Inicio = () => {

    const [clientes, setClientes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {  
        const obtenerClientesAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setClientes(resultado)
            } catch (error) {
                
            }
        }

        obtenerClientesAPI()
    }, [])

    const handleEliminar = async (id) => {
        const confirmar = confirm('Confirme la eliminacion del registro')
        if(confirmar){

            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                })
                await respuesta.json()
                
                //location.reload() para actualizar los clientes. no es optimo hacer un llamado de api

                const arrayClientes = clientes.filter(cliente => cliente.id !== id)
                setClientes(arrayClientes)
            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className="mt-3">Administra tus clientes</p>

            <table className="w-full mt-5 table-auto shadow bg-white">
                <thead className="text-white bg-blue-800">
                    <tr>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Contacto</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {clientes.map(cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}

                </tbody>
            </table>

		</>
    )
}

export default Inicio