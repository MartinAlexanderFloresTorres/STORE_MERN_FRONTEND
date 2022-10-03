import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Inicio from './pages/home/Inicio';
import Colecciones from './pages/publica/colecciones/Colecciones';
import Coleccion from './pages/publica/colecciones/Coleccion';
import Producto from './pages/publica/productos/Producto';
import Productos from './pages/publica/productos/Productos';
import CrearCuenta from './pages/auth/CrearCuenta';
import Login from './pages/auth/Login';
import OlvidePassword from './pages/auth/OlvidePassword';
import NuevoPassword from './pages/auth/NuevoPassword';
import ConfirmarCuenta from './pages/auth/ConfirmarCuenta';
import Carrito from './pages/publica/Carrito';
import Cuenta from './pages/privada/Cuenta';
import Auth from './layout/Auth';
import Pedidos from './pages/privada/Pedidos';
import Favoritos from './pages/privada/Favoritos';
import Ofertas from './pages/publica/Ofertas';
import NotFound from './pages/404/NotFound';
import Search from './pages/publica/Search';
import Unirse from './pages/privada/unirse/Unirse';
import AgregarProducto from './pages/privada/empresa/AgregarProducto';
import Empresa from './pages/privada/empresa/Empresa';
import AsidebarVenta from './layout/AsidebarVenta';
import MisProductos from './pages/privada/empresa/MisProductos';
import Ventas from './pages/privada/empresa/Ventas';
import ActualizarColeccion from './pages/privada/admin/ActualizarColeccion';
import PerfilAdmin from './pages/privada/admin/PerfilAdmin';
import MostrarColecciones from './pages/privada/admin/MostrarColecciones';
import CrearColeccion from './pages/privada/admin/CrearColeccion';
import Usuarios from './pages/privada/admin/Usuarios';
import Admin from './layout/Admin';
import Pago from './pages/privada/shop/Pago';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />}>
					<Route index element={<Inicio />} />
					<Route path='colecciones' element={<Colecciones />} />
					<Route path='colecciones/:nombre' element={<Coleccion />} />
					<Route path='productos' element={<Productos />} />
					<Route path='productos/:url' element={<Producto />} />
					<Route path='carrito' element={<Carrito />} />
					<Route path='carrito/pago' element={<Pago />} />
					<Route path='ofertas' element={<Ofertas />} />
					<Route path='search' element={<Search />} />
				</Route>

				<Route path='/cuenta' element={<Dashboard />}>
					<Route element={<Auth />}>
						<Route index element={<Cuenta />} />
						<Route path='pedidos' element={<Pedidos />} />
						<Route path='favoritos' element={<Favoritos />} />
						<Route path='unirse' element={<Unirse />} />
					</Route>

					<Route path='iniciar-sesion' element={<Login />} />
					<Route path='crear-cuenta' element={<CrearCuenta />} />
					<Route path='olvide-password' element={<OlvidePassword />} />
				</Route>

				<Route path='empresa' element={<AsidebarVenta />}>
					<Route index element={<Empresa />} />
					<Route path='crear-producto' element={<AgregarProducto />} />
					<Route path='editar-producto/:url' element={<AgregarProducto />} />
					<Route path='mis-productos' element={<MisProductos />} />
					<Route path='ventas' element={<Ventas />} />
					<Route path='administrador' element={<Admin />}>
						<Route index element={<PerfilAdmin />} />
						<Route path='colecciones' element={<MostrarColecciones />} />
						<Route path='crear-coleccion' element={<CrearColeccion />} />
						<Route
							path='actualizar-coleccion/:url'
							element={<ActualizarColeccion />}
						/>
						<Route path='usuarios' element={<Usuarios />} />
					</Route>
				</Route>

				<Route path='/recuperacion/:token' element={<NuevoPassword />} />
				<Route path='/confirmar/:token' element={<ConfirmarCuenta />} />

				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
