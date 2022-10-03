/* eslint-disable react/prop-types */
import CategoriaProducto from './CategoriaProducto';
import useColecciones from '../../hooks/useColecciones';
import PreviaProductoLoader from '../loaders/PreviaProductoLoader';
import '../../styles/CategoriasProducto.css';

const CategoriasProducto = ({ titulo, admin, ...props }) => {
	const { colecciones, cargandoColecciones } = useColecciones();

	return (
		<section {...props}>
			<div className='categorias'>
				{titulo && cargandoColecciones ? (
					<div
						className='loader-item mb-2'
						style={{ maxWidth: 400, height: 30 }}
					></div>
				) : (
					colecciones.length > 0 && <h2>{titulo}</h2>
				)}
				<section className='categorias__grid'>
					{cargandoColecciones ? (
						<>
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
							<PreviaProductoLoader className='previa' />
						</>
					) : colecciones.length > 0 ? (
						colecciones.map(({ _id, nombre, imagen, url }) => (
							<CategoriaProducto
								key={_id}
								coleccion={{ nombre, imagen, url, _id }}
								id={admin ? 'categoria__opciones' : ''}
							/>
						))
					) : (
						<div className='col-full center titulo'>
							No se encontraron las colecciones
						</div>
					)}
				</section>
			</div>
		</section>
	);
};
CategoriasProducto.defaultProps = {
	titulo: '',
	admin: false,
};

export default CategoriasProducto;
