import Banner from '../../../components/Banners/Banner';
import CategoriasProducto from '../../../components/CategoriasProducto/CategoriasProducto';
import PreviaColeccion from '../../../components/ColeccionProducto/PreviaColeccion';
import PreviaProducto from '../../../components/ColeccionProducto/PreviaProducto';
import ColeccionesLoader from '../../../components/loaders/ColeccionesLoader';
import useColecciones from '../../../hooks/useColecciones';

const Colecciones = () => {
	const { colecciones, cargandoColecciones } = useColecciones();

	return (
		<>
			<Banner
				video={false}
				url='/img/banner-3.webp'
				titulo='Colecciones Destacadas'
				texto={
					'Hemos nacido para ser libres y así es como nos gusta vivir. Nuestra vida es nuestra, de nadie mas. Quiérela tanto como puedas, disfrútala.'
				}
			/>
			<CategoriasProducto
				titulo={'Coleciones Destacadas'}
				className='contenedor py-3'
			/>

			{cargandoColecciones ? (
				Array.from(new Array(4), (v, k) => k).map(n => (
					<ColeccionesLoader
						key={n}
						className={n === 0 ? 'mt-3' : ''}
						banner={false}
					/>
				))
			) : colecciones.length > 0 ? (
				colecciones.map(coleccion => (
					<PreviaColeccion
						key={coleccion._id}
						titulo={coleccion.nombre}
						enlace={`/colecciones/${coleccion.url}`}
						border={true}
					>
						{coleccion?.productos?.length > 0 ? (
							coleccion?.productos.map(producto => (
								<PreviaProducto
									key={producto._id}
									producto={producto}
									className='width'
								/>
							))
						) : (
							<h2>No hay productos por el momento</h2>
						)}
					</PreviaColeccion>
				))
			) : (
				<h2>Cargando colecciones...</h2>
			)}
		</>
	);
};

export default Colecciones;
