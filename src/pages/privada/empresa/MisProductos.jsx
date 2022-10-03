import { useState, useEffect } from 'react';
import getProductosCreador from '../../../api/getProductosCreador';
import ColeccionContenedor from '../../../components/ColeccionContenedor/ColeccionContenedor';
import PreviaProducto from '../../../components/ColeccionProducto/PreviaProducto';
import PreviaProductoLoader from '../../../components/loaders/PreviaProductoLoader';
import useColecciones from '../../../hooks/useColecciones';

const MisProductos = () => {
	// Estados
	const [productos, setProductos] = useState([]);
	const [filtro, setFiltro] = useState('');
	const [noProductos, setNoProductos] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// useColecciones
	const { genero, cargandoEliminacion, productoEliminado } = useColecciones();

	// Efecto de traer los productos por el filtro, pagina y genero
	useEffect(() => {
		(async () => {
			try {
				setProductos([]);
				setTotalPages(1);
				setNoProductos(false);
				const { data } = await getProductosCreador({
					orden: filtro,
					page,
					genero,
				});
				setProductos(data.docs);
				setTotalPages(data.totalPages);
				const vacio = data.docs.length === 0;
				setNoProductos(vacio);
			} catch (error) {
				setTotalPages(1);
				setNoProductos(true);
				setProductos([]);
				console.log(error?.response?.data?.msg);
			}
		})();
	}, [filtro, page, genero]);

	// Efecto de  Actualizar el estado cuando se elimina un producto
	useEffect(() => {
		const actualizados = productos.filter(
			producto => producto._id !== productoEliminado
		);
		setProductos(actualizados);
	}, [productoEliminado]);

	// Cambiar la pagina de los productos
	const handlePage = (event, value) => {
		setPage(value);
	};

	return (
		<>
			{cargandoEliminacion && (
				<section className='overlay overlay--bienvenido'>
					<div>
						<h2>Eliminando...</h2>
						<div className='spinner'>
							<div className='bounce1'></div>
							<div className='bounce2'></div>
							<div className='bounce3'></div>
						</div>
					</div>
				</section>
			)}

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
							id='editar-producto'
						/>
					))
				) : (
					<>
						{noProductos ? (
							<h1 className='center col-full px-3 py-3'>
								No se encontraron productos
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
		</>
	);
};

export default MisProductos;
