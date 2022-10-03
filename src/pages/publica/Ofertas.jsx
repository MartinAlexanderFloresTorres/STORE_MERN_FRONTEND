import { useState, useEffect } from 'react';
import getOfertas from '../../api/getOfertas';
import Banner from '../../components/Banners/Banner';
import ColeccionContenedor from '../../components/ColeccionContenedor/ColeccionContenedor';
import PreviaProducto from '../../components/ColeccionProducto/PreviaProducto';
import PreviaProductoLoader from '../../components/loaders/PreviaProductoLoader';
import useColecciones from '../../hooks/useColecciones';

function Ofertas() {
	// Estados
	const [filtro, setFiltro] = useState('');
	const [noOfertas, setNoOfertas] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [ofertas, setOfertas] = useState([]);
	const [cargando, setCargando] = useState(true);

	// useColecciones
	const { genero } = useColecciones();

	// useEffects
	useEffect(() => {
		(async () => {
			try {
				setNoOfertas(false);
				const { data } = await getOfertas({
					orden: filtro,
					page,
					genero,
				});
				setOfertas(data.docs);
				setTotalPages(data.totalPages);
			} catch (error) {
				setNoOfertas(true);
				setTotalPages(1);
				setOfertas([]);
				console.log(error.response.data);
			}
			setCargando(false);
		})();
	}, [filtro, genero, page]);

	// Cambiar la pagina de los productos
	const handlePage = (event, value) => {
		setPage(value);
	};
	return (
		<>
			<Banner
				video={false}
				url='/img/banner-4.webp'
				titulo='Ofertas de la semana'
				texto={
					'Hemos nacido para ser libres y así es como nos gusta vivir. Nuestra vida es nuestra, de nadie mas. Quiérela tanto como puedas, disfrútala.'
				}
			/>

			<ColeccionContenedor
				titulo={`Productos en oferta ( ${ofertas.length} )`}
				setFiltro={setFiltro}
				totalPages={totalPages}
				page={page}
				handlePage={handlePage}
				paginacion={!noOfertas}
			>
				{ofertas.length > 0 ? (
					ofertas.map(producto => (
						<PreviaProducto
							key={producto._id}
							producto={producto}
							className='width-2'
						/>
					))
				) : cargando ? (
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
				) : (
					<h1 className='center px-3 py-2 col-full'>
						No se encontraron ofertas de decuentos por el momento
					</h1>
				)}
			</ColeccionContenedor>
		</>
	);
}

export default Ofertas;
