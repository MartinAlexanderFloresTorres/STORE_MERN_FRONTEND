/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../../styles/Coleccion.css';

function PreviaColeccion({ titulo, enlace, border, children }) {
	return (
		<section className={`${border ? 'border-b' : ''} coleccion`}>
			<div className='contenedor'>
				<div className='coleccion__top'>
					<h2>{titulo}</h2>
					<Link to={enlace}>Ver todos los productos</Link>
				</div>
				<div className='coleccion__bottom'>{children}</div>
			</div>
		</section>
	);
}

PreviaColeccion.defaultProps = {
	titulo: '',
	enlace: '/colecciones',
	border: false,
};

export default PreviaColeccion;
