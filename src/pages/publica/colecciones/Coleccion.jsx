import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import getColeccionProductos from '../../../api/getColeccionProductos';
import Banner from '../../../components/Banners/Banner';
import ColeccionContenedor from '../../../components/ColeccionContenedor/ColeccionContenedor';
import PreviaProducto from '../../../components/ColeccionProducto/PreviaProducto';
import PreviaProductoLoader from '../../../components/loaders/PreviaProductoLoader';
import useColecciones from '../../../hooks/useColecciones';

const Coleccion = () => {
	// Estados
	const [productos, setProductos] = useState([]);
	const [nombreColeccion, setNombreColeccion] = useState('');
	const [filtro, setFiltro] = useState('');
	const [noProductos, setNoProductos] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// useSearchParams
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	// useParams
	const { nombre } = useParams();

	// useColecciones
	const { genero, handleAddVistos } = useColecciones();

	// Efecto de traer los productos de la coleccion por el filtro, pagina y genero
	useEffect(() => {
		(async () => {
			try {
				setNoProductos(false);
				setProductos([]);
				setTotalPages(1);
				const { data } = await getColeccionProductos({
					id,
					orden: filtro,
					page,
					genero,
				});
				setNombreColeccion(nombre);
				setTotalPages(data.totalPages);
				setProductos(data.docs);
				// eslint-disable-next-line no-unneeded-ternary
			} catch (error) {
				setProductos([]);
				setNoProductos(true);
				console.log(error?.response?.data?.msg);
			}
		})();
	}, [filtro, genero, page, nombre]);

	// Cambiar la pagina de los productos
	const handlePage = (event, value) => {
		setPage(value);
	};

	return (
		<>
			<Banner
				video={false}
				url='/img/banner-1.webp'
				titulo={
					productos.length > 0
						? 'Coleccion - ' + nombreColeccion
						: noProductos
						? 'No hay productos'
						: 'Cargando...'
				}
				texto={'Disfruta cada momento de tu vida'}
			/>

			<ColeccionContenedor
				titulo={`${productos?.length || '0'} productos`}
				setFiltro={setFiltro}
				totalPages={totalPages}
				page={page}
				handlePage={handlePage}
				paginacion={!noProductos}
			>
				{productos.length > 0 ? (
					productos.map(producto => (
						<PreviaProducto
							key={producto._id}
							producto={producto}
							className='width-2'
							onClick={() => handleAddVistos(producto)}
						/>
					))
				) : noProductos ? (
					<h2 className='center py-2 px-3 col-full'>
						No hay productos por el momento
					</h2>
				) : (
					<>
						<PreviaProductoLoader className='width-2' />
						<PreviaProductoLoader className='width-2' />
						<PreviaProductoLoader className='width-2' />
						<PreviaProductoLoader className='width-2' />
						<PreviaProductoLoader className='width-2' />
						<PreviaProductoLoader className='width-2' />
					</>
				)}
			</ColeccionContenedor>
		</>
	);
};

export default Coleccion;
