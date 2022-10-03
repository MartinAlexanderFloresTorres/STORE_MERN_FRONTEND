/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
	ArrowLeftOnRectangleIcon,
	ArrowRightOnRectangleIcon,
	BuildingStorefrontIcon,
	CurrencyDollarIcon,
	HeartIcon,
	InboxStackIcon,
	MoonIcon,
	RectangleStackIcon,
	ShoppingBagIcon,
	SunIcon,
	UserIcon,
} from '@heroicons/react/24/outline';
import '../styles/CuentaOpciones.css';
import { ROLES_ACCESO } from '../constants';

const CuentaOpciones = ({ cuenta, handleCuenta }) => {
	// useAuth
	const { tema, setTema, usuario, autenticado, cerrarSesion } = useAuth();

	// autenticado¡
	const auth = autenticado();

	return (
		<>
			<div className={`${cuenta ? 'active' : ''} menuCuenta`}>
				<button
					title='Cuenta'
					className='itemLink itemLink--usuario'
					onClick={handleCuenta}
				>
					{auth ? (
						<div>
							<img
								src={usuario?.imagen?.secure_url}
								alt={usuario.nombre}
								width='50'
								height='50'
							/>
						</div>
					) : (
						<UserIcon />
					)}
				</button>

				{auth ? (
					<div className='menuCuenta__opciones'>
						<div className='menuCuenta__usuario'>
							<div>
								<img src={usuario?.imagen?.secure_url} alt='usuario' />
							</div>
							<p className='menuCuenta__texto'>
								Bievenido <span>{usuario?.nombre}</span>
							</p>
							<a href={`mailto:${usuario?.email}`}>{usuario?.email}</a>
						</div>
						<Link
							to={'/cuenta'}
							className='menuCuenta__link'
							onClick={handleCuenta}
						>
							<UserIcon />
							Cuenta
						</Link>

						{ROLES_ACCESO.includes(usuario?.rol) && (
							<Link
								className='menuCuenta__link'
								to={'/empresa'}
								onClick={handleCuenta}
							>
								<BuildingStorefrontIcon />
								Tu empresa ({usuario?.empresa?.nombre})
							</Link>
						)}

						<Link
							className='menuCuenta__link'
							to={'/colecciones'}
							onClick={handleCuenta}
						>
							<InboxStackIcon />
							Colecciónes
						</Link>

						<Link
							className='menuCuenta__link'
							to={'/productos'}
							onClick={handleCuenta}
						>
							<RectangleStackIcon />
							Productos
						</Link>

						<button
							title='Cambiar Tema'
							className='menuCuenta__link'
							onClick={() =>
								tema === 'claro' ? setTema('dark') : setTema('claro')
							}
						>
							{tema !== 'claro' ? (
								<>
									<SunIcon />
									Modo claro
								</>
							) : (
								<>
									<MoonIcon />
									Modo oscuro
								</>
							)}
						</button>

						<Link
							className='menuCuenta__link'
							to={'/ofertas'}
							onClick={handleCuenta}
						>
							<CurrencyDollarIcon />
							Ofertas
						</Link>

						<Link
							className='menuCuenta__link'
							to={'/cuenta/favoritos'}
							onClick={handleCuenta}
						>
							<HeartIcon />
							Favoritos
						</Link>
						<Link
							className='menuCuenta__link'
							to={'/carrito'}
							onClick={handleCuenta}
						>
							<ShoppingBagIcon />
							Carrito
						</Link>
						<button
							className='menuCuenta__login'
							title='Cerrar Sesión'
							onClick={cerrarSesion}
						>
							<ArrowLeftOnRectangleIcon />
							Cerrar Sesión
						</button>
					</div>
				) : (
					<div className='menuCuenta__opciones'>
						<p className='menuCuenta__texto'>Enlaces rapidos</p>
						<Link
							className='menuCuenta__link'
							to={'/colecciones'}
							onClick={handleCuenta}
						>
							<InboxStackIcon />
							Colecciónes
						</Link>
						<Link
							className='menuCuenta__link'
							to={'/productos'}
							onClick={handleCuenta}
						>
							<RectangleStackIcon />
							Productos
						</Link>
						<button
							title='Cambiar Tema'
							className='menuCuenta__link'
							onClick={() =>
								tema === 'claro' ? setTema('dark') : setTema('claro')
							}
						>
							{tema !== 'claro' ? (
								<>
									<SunIcon />
									Modo claro
								</>
							) : (
								<>
									<MoonIcon />
									Modo oscuro
								</>
							)}
						</button>
						<Link
							className='menuCuenta__link'
							to={'/ofertas'}
							onClick={handleCuenta}
						>
							<CurrencyDollarIcon />
							Ofertas
						</Link>

						<Link
							className='menuCuenta__link'
							to={auth ? `/cuenta/favoritos` : `/cuenta/iniciar-sesion`}
							onClick={handleCuenta}
						>
							<HeartIcon />
							Favoritos
						</Link>
						<Link
							className='menuCuenta__link'
							to={'/carrito'}
							onClick={handleCuenta}
						>
							<ShoppingBagIcon />
							Carrito
						</Link>

						<div className='menuCuenta__crear'>
							<p>¿Aun no tienes una cuenta? </p>
							<Link to={'/cuenta/crear-cuenta'} onClick={handleCuenta}>
								Crea tu Cuenta
							</Link>
						</div>
						<Link
							className='menuCuenta__login'
							to={'/cuenta/iniciar-sesion'}
							onClick={handleCuenta}
						>
							Iniciar Sesión
							<ArrowRightOnRectangleIcon />
						</Link>
					</div>
				)}
			</div>

			{cuenta && <div onClick={handleCuenta} className='overlay'></div>}
		</>
	);
};

export default CuentaOpciones;
