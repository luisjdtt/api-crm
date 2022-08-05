import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'
import EditarCliente from './paginas/EditarCliente'
import Home from './paginas/Home'

function App() {

	console.log(import.meta.env.VITE_API_URL)
	return (
		<BrowserRouter> 
			<Routes>
				<Route path="/clientes" element={<Layout />}>
					<Route index element={<Inicio />}/>
					<Route path="nuevo" element={<NuevoCliente />}/>
					<Route path="editar/:id" element={<EditarCliente />}/>
					<Route path=":id" element={<VerCliente />}/>
				</Route>

				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>

			</Routes>
		</BrowserRouter>
	)
}

export default App
