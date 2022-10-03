import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import PreviaProductoLoader from '../../components/loaders/PreviaProductoLoader';
import Pedido from '../../components/Pedido';
import getPedidos from '../../api/getPedidos';
import { fomatearFecha } from '../../helpers';
import '../../styles/Pedidos.css';

const Pedidos = () => {
	// Estados
	const [cargando, setCargando] = useState(true);
	const [pedidos, setPedidos] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Efecto para obtener los pedidos
	useEffect(() => {
		(async () => {
			try {
				setCargando(true);
				const { data } = await getPedidos({ page });
				setPedidos(data.docs);
				setTotalPages(data.totalPages);
			} catch (error) {
				console.log(error.message);
				setTotalPages(1);
				setPedidos([]);
			}
			setCargando(false);
		})();
	}, [page]);

	// handle page change
	const handlePage = (event, value) => {
		setPage(value);
	};
	return (
		<section className='pedidos'>
			<div className='pedidos__top'>
				<h2 className='titulo'>Mis pedidos</h2>
				<p className='texto'>
					Ve y administra tus pedidos anteriores y pendientes.
				</p>
			</div>

			{cargando ? (
				<div className='pedidos__contenido'>
					<div className='pedidos__loaderTop'>
						<div className='loader-item'></div>
						<div className='loader-item'></div>
					</div>

					<div className='pedidos__grid'>
						<PreviaProductoLoader className='pedido__loader' />
						<PreviaProductoLoader className='pedido__loader' />
						<PreviaProductoLoader className='pedido__loader' />
						<PreviaProductoLoader className='pedido__loader' />
						<PreviaProductoLoader className='pedido__loader' />
						<PreviaProductoLoader className='pedido__loader' />
					</div>
				</div>
			) : pedidos?.length > 0 ? (
				pedidos?.map(pedido => (
					<div key={pedido._id} className='pedidos__contenido'>
						<div className='pedidos__encabezado'>
							<h3>
								Fecha del pedido: <span>{fomatearFecha(pedido.createdAt)}</span>
							</h3>
							<p>
								Total Pagado: <span className='sky'>{pedido.total}</span>
							</p>
						</div>
						<div className='pedidos__grid'>
							{pedido.productos.length > 0 &&
								pedido.productos.map(producto => (
									<Pedido key={producto._id} producto={producto} />
								))}
						</div>

						{totalPages !== 1 && (
							<div className='pedidos__paginacion'>
								<Pagination
									count={totalPages}
									page={page}
									onChange={handlePage}
									color='primary'
								/>
							</div>
						)}
					</div>
				))
			) : (
				<div className='border--top pedidos__top'>
					<p className='titulo'>Aún no hay pedidos</p>
					<p className='texto'>
						Parece que no ha realizado ningún pedido reciente.
					</p>
				</div>
			)}
		</section>
	);
};

export default Pedidos;
