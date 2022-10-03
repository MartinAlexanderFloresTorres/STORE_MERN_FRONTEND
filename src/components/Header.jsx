/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CuentaOpciones from './CuentaOpciones';
import PreviaCarrito from './Carrito/PreviaCarrito';
import Footer from './Footer';
import Unirte from './Unirte';
import Busqueda from './Busqueda';
import { overflowBody } from '../helpers';
import useAuth from '../hooks/useAuth';
import {
	UserIcon,
	HeartIcon,
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import '../styles/Header.css';
import useColecciones from '../hooks/useColecciones';

const Header = ({ subHeader }) => {
	// Estados
	const [menu, setMenu] = useState(false);
	const [cuenta, setCuenta] = useState(false);
	const [mostrarCarrito, setMostrarCarrito] = useState(false);

	// useColecciones
	const { colecciones, favoritos } = useColecciones();

	// useAuth
	const { usuario, autenticado } = useAuth();

	// autenticado¡
	const auth = autenticado();

	//  useLocation
	const { pathname } = useLocation();

	// Efectos
	useEffect(() => {
		overflowBody(menu);
	}, [menu]);

	// Mostrar el menu
	const handleCuenta = () => {
		setMostrarCarrito(false);
		setCuenta(!cuenta);
	};

	// Mostrar el carrito
	const handleMostrarCarrito = () => {
		setMostrarCarrito(!mostrarCarrito);
		setCuenta(false);
	};

	// Mostrar el menu de navegacion
	const handleMenu = () => {
		setMenu(!menu);
	};
	return (
		<>
			<header className='header'>
				<section className='contenedor'>
					<section className='header__top'>
						<button className='header__menu' title='Menu' onClick={handleMenu}>
							<Bars3Icon />
						</button>

						<div className='header__left'>
							<Link className='header__logo' to='/' title='Ecommerce'>
								<svg
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path d='M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM8.823 15.343C8.428 14.866 7.937 14.696 7.344 14.834L7.194 14.875L6.604 15.891C6.49273 16.0721 6.45587 16.2893 6.50115 16.497C6.54643 16.7048 6.67033 16.8869 6.8469 17.0053C7.02347 17.1237 7.23901 17.1692 7.44837 17.1322C7.65772 17.0953 7.84465 16.9787 7.97 16.807L8.032 16.714L8.822 15.343H8.823ZM13.21 8.66C12.722 9.064 12.23 10.257 12.92 11.447L15.96 16.713C16.0653 16.8919 16.2342 17.0245 16.433 17.0842C16.6318 17.144 16.8458 17.1265 17.0322 17.0353C17.2187 16.9441 17.3639 16.7859 17.4387 16.5923C17.5136 16.3986 17.5126 16.1839 17.436 15.991L17.387 15.891L16.585 14.499H17.775C17.8831 14.4993 17.9902 14.4781 18.0901 14.4369C18.19 14.3956 18.2808 14.335 18.3572 14.2585C18.4336 14.182 18.4941 14.0911 18.5353 13.9912C18.5764 13.8912 18.5974 13.7841 18.597 13.676C18.5975 13.4755 18.5245 13.2817 18.3919 13.1314C18.2592 12.981 18.076 12.8845 17.877 12.86L17.774 12.854H15.634L13.44 9.057L13.21 8.661V8.66ZM13.488 5.616C13.3153 5.51681 13.1126 5.48343 12.9172 5.52203C12.7218 5.56062 12.547 5.66859 12.425 5.826L12.363 5.918L11.996 6.551L11.637 5.918C11.5317 5.7391 11.3628 5.60652 11.164 5.54677C10.9652 5.48702 10.7512 5.50449 10.5648 5.5957C10.3783 5.68691 10.2331 5.84514 10.1583 6.03874C10.0834 6.23235 10.0844 6.44708 10.161 6.64L10.21 6.74L11.048 8.197L8.363 12.85H6.266C6.15798 12.8497 6.05097 12.8708 5.95112 12.912C5.85127 12.9532 5.76055 13.0138 5.68417 13.0902C5.60779 13.1666 5.54725 13.2573 5.50603 13.3571C5.46482 13.457 5.44374 13.564 5.444 13.672C5.444 14.093 5.756 14.438 6.163 14.489L6.266 14.495H13.746C14.086 13.855 13.686 12.946 12.936 12.857L12.815 12.85H10.262L13.79 6.74C13.899 6.5509 13.9284 6.32625 13.8718 6.11546C13.8151 5.90467 13.6771 5.72501 13.488 5.616Z' />
								</svg>
								<span>Store</span>
							</Link>
							<nav className='header__navegacion'>
								{colecciones.length > 0 ? (
									colecciones.map(({ _id, nombre, url }) => (
										<Link key={_id} to={`/colecciones/${url}?id=${_id}`}>
											{nombre}
										</Link>
									))
								) : (
									<>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
									</>
								)}
								<Link to={`/ofertas`} className='header__oferta'>
									Ofertas
								</Link>
							</nav>
						</div>

						<div className='header__right'>
							{usuario.rol && usuario.rol !== 'usuario' && (
								<span className='header__rol'>{usuario.rol}</span>
							)}

							<Link
								to={auth ? `/cuenta/favoritos` : `/cuenta/iniciar-sesion`}
								title='Favoritos'
								className='itemLink header__favoritos PreviaCarrito__cantidad'
							>
								{auth && favoritos.length > 0 ? (
									<HeartIconSolid style={{ color: 'var(--red-1)' }} />
								) : (
									<HeartIcon />
								)}
								{auth && favoritos.length > 0 && (
									<span>{favoritos.length}</span>
								)}
							</Link>
							<PreviaCarrito
								mostrar={mostrarCarrito}
								handleMostrar={handleMostrarCarrito}
							/>
							<CuentaOpciones cuenta={cuenta} handleCuenta={handleCuenta} />
						</div>
					</section>
				</section>
			</header>

			{subHeader && (
				<section className='subHeader'>
					<div className='contenedor'>
						<div className='subHeader__bottom'>
							<div className='subHeader__auth'>
								{!pathname?.includes('/cuenta') && !auth && (
									<>
										<Link to={`/cuenta/iniciar-sesion`} title='Iniciar Sesión'>
											Iniciar Sesión
										</Link>
										<Link to={`/cuenta/crear-cuenta`} title='Registrate'>
											Crear Cuenta
										</Link>
									</>
								)}
							</div>
							<Busqueda />
						</div>
					</div>
				</section>
			)}

			<section className={`${menu ? 'active' : ''} menu`}>
				<div className='menu__top'>
					{auth ? (
						<Link
							title='Cuenta'
							to={'/cuenta'}
							className='menu__login'
							onClick={handleMenu}
						>
							{auth ? (
								<div className='itemLink itemLink--usuario itemLink--ml0'>
									<div>
										<img
											src={usuario?.imagen?.secure_url}
											alt={usuario?.nombre}
										/>
									</div>
								</div>
							) : (
								<UserIcon />
							)}
							<span>{usuario?.nombre}</span>
						</Link>
					) : (
						<Link
							to={'/cuenta/iniciar-sesion'}
							className='menu__login'
							onClick={handleMenu}
						>
							<UserIcon />
							<span>Iniciar Sesión</span>
						</Link>
					)}
					<div className='menu__botones'>
						<Link to={`/ofertas`} className='menu__oferta' onClick={handleMenu}>
							Ofertas
						</Link>
						<Link
							to={`/cuenta/favoritos`}
							title='Favoritos'
							className='itemLink PreviaCarrito__cantidad'
							onClick={handleMenu}
						>
							{auth && favoritos.length > 0 ? (
								<HeartIconSolid style={{ color: 'var(--red-1)' }} />
							) : (
								<HeartIcon />
							)}
							{auth && favoritos.length > 0 && <span>{favoritos.length}</span>}
						</Link>
						<button className='itemLink' onClick={handleMenu}>
							<XMarkIcon />
						</button>
					</div>
				</div>
				<nav className='menu__navegacion'>
					{colecciones.length > 0 ? (
						colecciones.map(({ _id, nombre, url }) => (
							<Link
								key={_id}
								to={`/colecciones/${url}?id=${_id}`}
								onClick={handleMenu}
							>
								{nombre}
							</Link>
						))
					) : (
						<>
							<div
								className='loader-item'
								style={{ width: 200, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 300, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 230, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 400, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 100, height: 20 }}
							></div>
						</>
					)}
				</nav>
				<div className='menu__unirse'>
					<Unirte handleMenu={handleMenu} />
				</div>
				<div className='menu__destacados'></div>
				<div className='menu__ayuda'>
					<h2>¿Necesitas ayuda?</h2>
					<a href='#'>+51 982938293</a>
					<p>
						Te brindaremos mas información sobre nosotros, no dudes en
						contactarnos
					</p>
				</div>
				<Footer handleMenu={handleMenu} />
			</section>
		</>
	);
};

Header.defaultProps = {
	subHeader: true,
};
export default Header;
