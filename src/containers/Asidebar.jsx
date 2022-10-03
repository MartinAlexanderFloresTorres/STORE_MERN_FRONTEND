/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Unirte from '../components/Unirte';
import {
	ArrowLeftOnRectangleIcon,
	HeartIcon,
	ShoppingBagIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import '../styles/Asidebar.css';

const Asidebar = ({ children }) => {
	// useLocation
	const { pathname } = useLocation();

	// useAuth
	const { cerrarSesion } = useAuth();

	// si la ruta es unirse o crear cuenta que no muestre el sidebar
	if (['/cuenta/unirse', '/cuenta/crear-producto'].includes(pathname)) {
		return <section>{children}</section>;
	}

	return (
		<section className='contenedor asidebar'>
			<div className='asidebar__left'>
				<div className='asidebar__links'>
					<Link
						to={'/cuenta'}
						className={pathname === '/cuenta' ? 'active' : ''}
					>
						<UserIcon />
						Inicio de cuenta
					</Link>
					<Link
						to={'/cuenta/pedidos'}
						className={pathname === '/cuenta/pedidos' ? 'active' : ''}
					>
						<ShoppingBagIcon />
						Pedidos
					</Link>
					<Link
						to={'/cuenta/favoritos'}
						className={pathname === '/cuenta/favoritos' ? 'active' : ''}
					>
						<HeartIcon />
						Favoritos
					</Link>
				</div>
				<div className='asidebar__opciones'>
					<button title='Cerrar Sesión' onClick={cerrarSesion}>
						<ArrowLeftOnRectangleIcon />
						Cerrar sesión
					</button>
				</div>
				<div className='asidebar__unirse'>
					<Unirte />
				</div>
			</div>
			<div>{children}</div>
			<div className='asidebar__unirseMovil'>
				<Unirte />
			</div>
		</section>
	);
};

export default Asidebar;
