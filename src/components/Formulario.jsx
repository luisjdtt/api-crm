import {Formik, Form, Field, ErrorMessage} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    //Usamos la libreria de YUP para la validacion de los campos del formulario
    //El formulario se realizo con la libreria de FORMIK

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del Cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la Empresa es obligatorio'),
        email: Yup.string()
                    .email('El email tiene que ser válido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .positive('Número inválido')
                    .integer('Número inválido')
                    .typeError('Solo números permitidos')
    })

    const handleSubmit = async (values) => {
        
        try {
            if(cliente.id){ //si existe un id entonces se tiene que editar el registro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
                console.log(respuesta)
                const resultado = await respuesta.json()
                console.log(resultado)

                navigate('/clientes')
            }else {
                const url = import.meta.env.VITE_API_URL

                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(respuesta)
                const resultado = await respuesta.json()
                console.log(resultado)

                navigate('/clientes')
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (

    cargando ? <Spinner /> : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
        </h1>

        <Formik 
            initialValues={{
                nombre: cliente?.nombre ?? "",  //ternario mejorado, checa si la prop existe y si no string vacio
                empresa: cliente?.empresa ?? "",
                email: cliente?.email ?? "",
                telefono: cliente?.telefono ?? "",
                notas: cliente?.notas ?? ""
            }}

            enableReinitialize={true}

            onSubmit = {async (values, {resetForm}) => {
                await handleSubmit(values)
                resetForm()
            }}

            validationSchema={nuevoClienteSchema}
        >

            {({errors, touched}) => {
                //console.log(data)
                return (
            
                <Form className='mt-10 '>
                    <div className='mb-4 '>
                        <label className="text-gray-800 " htmlFor='nombre'>Nombre: </label>
                        <Field 
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ) : null}


                    </div>

                    <div className='mb-4 '>
                        <label className="text-gray-800 " htmlFor='empresa'>Empresa: </label>
                        <Field 
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />

                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ) : null}

                    </div>

                    <div className='mb-4 '>
                        <label className="text-gray-800 " htmlFor='email'>Email: </label>
                        <Field 
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del Cliente"
                            name="email"
                        />

                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ) : null}

                    </div>

                    <div className='mb-4 '>
                        <label className="text-gray-800 " htmlFor='telefono'>Telefono: </label>
                        <Field 
                            id="number"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Telefono del Cliente"
                            name="telefono"
                        />

                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ) : null}
                    </div>

                    <div className='mb-4 '>
                        <label className="text-gray-800 " htmlFor='notas'>Notas: </label>
                        <Field 
                            as="textarea"
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>

                    <input 
                        type="submit"
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg '
                    />
                </Form>
            )}}
        </Formik>
    </div> )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario