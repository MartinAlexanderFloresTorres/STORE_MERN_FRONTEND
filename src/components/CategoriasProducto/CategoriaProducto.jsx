/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import '../../styles/CategoriaProducto.css';

const CategoriaProducto = ({ coleccion, ...props }) => {
	const {
		nombre,
		imagen: { secure_url, original_filename },
		url,
		_id,
	} = coleccion;

	const { id } = props;

	return (
		<article className='categoria' {...props}>
			<Link to={`/colecciones/${url}?id=${_id}`} title={nombre}>
				<div className='categoria__imagen'>
					<img
						src={secure_url}
						alt={original_filename}
						width={200}
						height={200}
					/>
				</div>
				<h3>{nombre}</h3>
			</Link>

			{id === 'categoria__opciones' && (
				<div className='categoria__opciones'>
					<div>
						<Link
							to={`/empresa/administrador/actualizar-coleccion/${url}`}
							state={coleccion}
							title={nombre}
						>
							Editar
						</Link>
						<Link to={`/colecciones/${url}?id=${_id}`} title={nombre}>
							Visualizar
						</Link>
					</div>
				</div>
			)}
		</article>
	);
};

export default CategoriaProducto;
