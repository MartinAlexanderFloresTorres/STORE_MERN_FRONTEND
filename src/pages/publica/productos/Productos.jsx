import { useState, useEffect } from 'react';
import getProductos from '../../../api/getProductos';
import ColeccionContenedor from '../../../components/ColeccionContenedor/ColeccionContenedor';
import PreviaProducto from '../../../components/ColeccionProducto/PreviaProducto';
import PreviaProductoLoader from '../../../components/loaders/PreviaProductoLoader';
import useColecciones from '../../../hooks/useColecciones';

const Productos = () => {
	// Estados
	const [productos, setProductos] = useState([]);
	const [filtro, setFiltro] = useState('');
	const [noProductos, setNoProductos] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// useColecciones
	const { genero } = useColecciones();

	// Efecto de traer los productos por el filtro, pagina y genero
	useEffect(() => {
		(async () => {
			try {
				setNoProductos(false);
				const { data } = await getProductos({ orden: filtro, page, genero });
				setProductos(data.docs);
				setTotalPages(data.totalPages);
			} catch (error) {
				setTotalPages(1);
				setNoProductos(true);
				setProductos([]);
				console.log(error?.response?.data?.msg);
			}
		})();
	}, [filtro, page, genero]);

	// Cambiar la pagina de los productos
	const handlePage = (event, value) => {
		setPage(value);
	};
	return (
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
					/>
				))
			) : (
				<>
					{noProductos ? (
						<h1 className='center col-full px-3 py-3'>
							No se encontraron productos disponibles
						</h1>
					) : (
						<>
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
							<PreviaProductoLoader className='width-2' />
						</>
					)}
				</>
			)}
		</ColeccionContenedor>
	);
};

export default Productos;
