import { Link } from 'react-router-dom';
import '../../styles/NotFound.css';

const NotFound = () => {
	return (
		<section className='notFound'>
			<div className='contenedor notFound__contenido'>
				<div className='notFound__item'>
					<h2>ERROR 404</h2>
					<h1>Vaya, parece que la página que estás buscando ya no existe.</h1>
					<p>
						Pero no te vayas, sigue comprando para encontrar la ropa perfecta
						para ti.
					</p>
					<Link to={'/'}>Volver al Inicio</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
