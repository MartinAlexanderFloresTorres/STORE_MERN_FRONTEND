import { Link } from 'react-router-dom';
import Oferta from '../../components/Oferta';
import CategoriasProducto from '../../components/CategoriasProducto/CategoriasProducto';
import Banner from '../../components/Banners/Banner';
import PreviaColeccion from '../../components/ColeccionProducto/PreviaColeccion';
import PreviaProducto from '../../components/ColeccionProducto/PreviaProducto';
import useColecciones from '../../hooks/useColecciones';
import ColeccionesLoader from '../../components/loaders/ColeccionesLoader';

const Inicio = () => {
	const { colecciones, cargandoColecciones, handleAddVistos } =
		useColecciones();

	return (
		<>
			<Oferta />

			<Banner
				video={false}
				url='/img/banner-2.jpg'
				titulo='Nuevas colecciónes'
				texto={'Primavera / Verano / 2022.'}
			>
				<div>
					<Link to={'/colecciones'} className={'boton--claro px-4'}>
						Ver Colecciónes
					</Link>
				</div>
			</Banner>

			<CategoriasProducto
				titulo='Nuestras Colecciónes'
				className='contenedor py-3'
			/>

			{cargandoColecciones ? (
				Array.from(new Array(4), (v, k) => k).map(n => (
					<ColeccionesLoader key={n} className={n === 0 ? 'mt-3' : ''} />
				))
			) : colecciones.length > 0 ? (
				colecciones.map(coleccion => (
					<div key={coleccion._id}>
						<Banner
							video={coleccion.banner?.data?.format === 'mp4'}
							url={coleccion.banner?.data?.secure_url}
							titulo={coleccion.banner?.encabezado}
							texto={coleccion.banner?.descripcion}
						>
							<Link
								to={`colecciones/${coleccion.url}?id=${coleccion._id}`}
								className={'boton--claro px-4'}
							>
								Ver todos los productos
							</Link>
						</Banner>
						<PreviaColeccion
							titulo={coleccion.nombre}
							enlace={`/colecciones/${coleccion.url}?id=${coleccion._id}`}
						>
							{coleccion.productos.length > 0 ? (
								coleccion.productos?.map(producto => (
									<PreviaProducto
										key={producto._id}
										producto={producto}
										onClick={() => handleAddVistos(producto)}
										className='width'
									/>
								))
							) : (
								<h2>No hay productos por el momento</h2>
							)}
						</PreviaColeccion>
					</div>
				))
			) : (
				<h2 className='p-5 center titulo'>No hay colecciones</h2>
			)}
		</>
	);
};

export default Inicio;
