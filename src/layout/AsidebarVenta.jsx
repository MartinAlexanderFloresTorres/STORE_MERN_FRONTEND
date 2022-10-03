import {
	CreditCardIcon,
	FolderPlusIcon,
	InboxArrowDownIcon,
	InboxStackIcon,
	PencilIcon,
	TableCellsIcon,
	UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { ROLES_ACCESO } from '../constants';
import useAuth from '../hooks/useAuth';
import '../styles/AsidebarVenta.css';

const AsidebarVenta = () => {
	// useAuth
	const { usuario, autenticando, autenticado } = useAuth();

	// useLocation
	const { pathname } = useLocation();

	// useLocation
	const location = useLocation();

	// autenticado¡
	const auth = autenticado();

	// mientras se autentica que muestre el loading
	if (autenticando && !auth) {
		return (
			<section className='overlay overlay--bienvenido'>
				<div>
					<h2>Bienvenido</h2>
					<div className='spinner'>
						<div className='bounce1'></div>
						<div className='bounce2'></div>
						<div className='bounce3'></div>
					</div>
				</div>
			</section>
		);
	}
	// Si no esta autenticado lo redirecciona a la pagina de inicio
	if (!auth) {
		return <Navigate to='/cuenta' state={location} />;
	}
	// Si el usuario no es vendedor redireciona a la pagina de cuenta
	if (!ROLES_ACCESO.includes(usuario?.rol)) {
		return <Navigate to='/cuenta/iniciar-sesion' state={location} />;
	}

	return (
		<div>
			<Header subHeader={false} />

			<aside className='asidebarVenta'>
				<Link to={'/empresa'} className='asidebarVenta__logo'>
					<img
						src={usuario?.empresa?.imagen?.secure_url}
						alt={usuario?.empresa?.nombre}
					/>
					<h2>{usuario?.empresa?.nombre}</h2>
				</Link>

				<div className='asidebarVenta__links'>
					<Link
						to={'/empresa'}
						className={pathname === '/empresa' ? 'active' : ''}
					>
						<PencilIcon />
						<span>Actualizar Empresa</span>
					</Link>
					<Link
						to={'/empresa/crear-producto'}
						className={pathname === '/empresa/crear-producto' ? 'active' : ''}
					>
						<InboxArrowDownIcon />
						<span>Crea productos</span>
					</Link>
					<Link
						to={'/empresa/mis-productos'}
						className={pathname === '/empresa/mis-productos' ? 'active' : ''}
					>
						<TableCellsIcon />
						<span>Tus productos</span>
					</Link>
					<Link
						to={'/empresa/ventas'}
						className={pathname === '/empresa/ventas' ? 'active' : ''}
					>
						<CreditCardIcon />
						<span>Tus ventas</span>
					</Link>

					{usuario?.rol === 'admin' && (
						<>
							<Link
								to={'/empresa/administrador/colecciones'}
								className={
									pathname === '/empresa/administrador/colecciones'
										? 'active'
										: ''
								}
							>
								<InboxStackIcon />
								<span>Ver Colecciones</span>
							</Link>
							<Link
								to={'/empresa/administrador/crear-coleccion'}
								className={
									pathname === '/empresa/administrador/crear-coleccion'
										? 'active'
										: ''
								}
							>
								<FolderPlusIcon />
								<span>Crear Colección</span>
							</Link>
							<Link
								to={'/empresa/administrador/usuarios'}
								className={
									pathname === '/empresa/administrador/usuarios' ? 'active' : ''
								}
							>
								<UserGroupIcon />
								<span>Usuarios</span>
							</Link>
						</>
					)}
				</div>
			</aside>

			<main className='asidebarVenta__main'>
				<Outlet />
			</main>
		</div>
	);
};

export default AsidebarVenta;
