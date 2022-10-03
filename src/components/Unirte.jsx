/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES_ACCESO } from '../constants';
import { CheckIcon } from '@heroicons/react/24/outline';
import '../styles/Unirte.css';

const Unirte = ({ handleMenu }) => {
	// useAuth
	const { usuario } = useAuth();

	if (ROLES_ACCESO.includes(usuario?.rol)) {
		return (
			<div className='unirte'>
				<h3>Comienza creado tus productos </h3>
				<ul>
					<li>
						<CheckIcon />
						<span>Crealos gratis</span>
					</li>
					<li>
						<CheckIcon />
						<span>Con un solo click</span>
					</li>
					<li>
						<CheckIcon />
						<span>Ofrece productos de calidad</span>
					</li>
					<li>
						<CheckIcon />
						<span>Usa el sitio con responsabilidad</span>
					</li>
					<li>
						<CheckIcon />
						<span>No olvides contactarnos por las redes</span>
					</li>
				</ul>
				<Link
					className='boton--black'
					to={'/empresa/crear-producto'}
					onClick={handleMenu}
				>
					Crear Producto
				</Link>
			</div>
		);
	}

	return (
		<div className='unirte'>
			<h3>Unete a nuestro gran equipo de proveedores de productos</h3>
			<ul>
				<li>
					<CheckIcon />
					<span>Pago remunerado</span>
				</li>
				<li>
					<CheckIcon />
					<span>Atención las 24 horas</span>
				</li>
				<li>
					<CheckIcon />
					<span>Ofrece productos de calidad</span>
				</li>
				<li>
					<CheckIcon />
					<span>Experiencia en ventas</span>
				</li>
				<li>
					<CheckIcon />
					<span>y muchas cosas mas</span>
				</li>
			</ul>
			<Link className='boton--black' to={'/cuenta/unirse'} onClick={handleMenu}>
				Unirte Ahora
			</Link>
		</div>
	);
};
Unirte.defaultProps = {
	handleMenu: () => {},
};

export default Unirte;
