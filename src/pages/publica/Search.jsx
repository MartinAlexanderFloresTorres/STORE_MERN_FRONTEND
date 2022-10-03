import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ColeccionContenedor from '../../components/ColeccionContenedor/ColeccionContenedor';
import PreviaProducto from '../../components/ColeccionProducto/PreviaProducto';
import useColecciones from '../../hooks/useColecciones';
import PreviaProductoLoader from '../../components/loaders/PreviaProductoLoader';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Search = () => {
	// useColecciones
	const {
		productosSearch,
		search,
		setFiltro,
		cargandoSearch,
		noProductosSearch,
		pageSearch,
		handlePageSearch,
		totalPagesSearch,
		handleAddVistos,
	} = useColecciones();

	// useMemo para el search
	const searchMemo = useMemo(() => search, [cargandoSearch]);
	return (
		<>
			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<Link to={'/'}>Inicio</Link>
						<ChevronRightIcon />
						<span>Search</span>
						{search && (
							<>
								<ChevronRightIcon />
								<span className='active'>{searchMemo}</span>
							</>
						)}
					</div>
				</div>
			</div>

			{search ? (
				<>
					{!cargandoSearch ? (
						<h1 className='center px-5 pt-3 pb-5 border--bottom'>
							Resultados para “{searchMemo || '--'}”
						</h1>
					) : (
						<h1 className='center px-5 pt-3 pb-5 border--bottom'>
							Buscando...
						</h1>
					)}
					<ColeccionContenedor
						titulo={`${searchMemo} (${productosSearch.length}) Resultados`}
						setFiltro={setFiltro}
						page={pageSearch}
						handlePage={handlePageSearch}
						totalPages={totalPagesSearch}
					>
						{productosSearch.length > 0 ? (
							productosSearch.map(producto => (
								<PreviaProducto
									key={producto._id}
									producto={producto}
									className='width-2'
									onClick={() => handleAddVistos(producto)}
								/>
							))
						) : !noProductosSearch ? (
							<>
								<PreviaProductoLoader className='width-2' />
								<PreviaProductoLoader className='width-2' />
								<PreviaProductoLoader className='width-2' />
								<PreviaProductoLoader className='width-2' />
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
							<h1 className='center px-5 pt-3 pb-5 col-full'>
								No se encontraron resultados de la busqueda ({searchMemo})
							</h1>
						)}
					</ColeccionContenedor>
				</>
			) : (
				<h1 className='center px-5 pt-3 pb-5 border-b'>Busca tus productos</h1>
			)}
		</>
	);
};

export default Search;
