import { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import getVentas from '../../../api/getVentas';
import { fomatearFecha } from '../../../helpers';
import '../../../styles/Ventas.css';
import { Link } from 'react-router-dom';

const Ventas = () => {
	// Estados
	const [ventas, setVentas] = useState([]);
	const [cargando, setCargando] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Effecto que trae las ventas del vendedor
	useEffect(() => {
		(async () => {
			try {
				setVentas([]);
				setCargando(true);
				const { data } = await getVentas({ page });
				setVentas(data.docs);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.log(error);
				setVentas([]);
				setPage(1);
			}
			setCargando(false);
		})();
	}, [page]);

	/* new Date(venta.createdAt.split('T')[0]).getMonth() */

	// Function de paginacion
	const handlePage = (e, value) => {
		setPage(value);
	};
	return (
		<>
			<h2 className='center border-b p-3'>Tus Productos Vendidos</h2>

			<div className='contenedor'>
				<div className='p-3 ventas__flex'>
					{ventas.length > 0 ? (
						ventas.map(venta => (
							<Link
								to={`/productos/${venta.url}`}
								key={venta._id}
								title={venta.nombre}
								className='ventas__item'
							>
								<img src={venta.portadas[0].secure_url} alt={venta.nombre} />
								<h3 title='Tus ventas'>{venta.ventas}</h3>
								<div>
									<h2>{venta.nombre}</h2>
									<p title='Fecha de creación'>
										{fomatearFecha(venta.createdAt)}
									</p>
								</div>
							</Link>
						))
					) : cargando ? (
						<>
							<div className='ventas__item ventas__item--loader'>
								<div className='loader-item'></div>
								<div className='loader-item'></div>
							</div>
							<div className='ventas__item ventas__item--loader'>
								<div className='loader-item'></div>
								<div className='loader-item'></div>
							</div>
							<div className='ventas__item ventas__item--loader'>
								<div className='loader-item'></div>
								<div className='loader-item'></div>
							</div>
							<div className='ventas__item ventas__item--loader'>
								<div className='loader-item'></div>
								<div className='loader-item'></div>
							</div>
							<div className='ventas__item ventas__item--loader'>
								<div className='loader-item'></div>
								<div className='loader-item'></div>
							</div>
						</>
					) : (
						<div className='center py-2'>No tenes ventas aun</div>
					)}
				</div>

				{totalPages !== 1 && !cargando && (
					<div className='ventas__paginacion'>
						<Pagination
							count={totalPages}
							page={page}
							onChange={handlePage}
							color='primary'
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default Ventas;
