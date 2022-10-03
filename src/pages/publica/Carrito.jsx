import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import ProductoCarrito from '../../components/Carrito/ProductoCarrito';
import Desplegable from '../../components/Desplegables/Desplegable';
import VistosRecientemente from '../../components/VistosRecientemente';
import { formatearCantidad } from '../../helpers';
import useColecciones from '../../hooks/useColecciones';
import '../../styles/Carrito.css';

const Carrito = () => {
	// useColecciones
	const { carrito } = useColecciones();

	// Subtotal
	const subTotal = carrito.reduce(
		(total, producto) => total + producto.precio * producto.cantidad,
		0
	);

	// Total
	const total = carrito.reduce(
		(total, producto) => total + producto.precioDescuento * producto.cantidad,
		0
	);

	// Total de descuento
	const totalDescuento = carrito.reduce(
		(total, producto) =>
			(total + producto.precio - producto.precioDescuento) * producto.cantidad,
		0
	);

	return (
		<>
			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<Link to={'/'}>Inicio</Link>
						<ChevronRightIcon />
						<span className='active'>Carrito</span>
					</div>
				</div>
			</div>

			<section className='contenedor carrito'>
				{carrito.length > 0 ? (
					<>
						<h2 className='carrito__titulo'>
							Tu Carrito<span> ({carrito?.length?.toString()})</span>
						</h2>
						<div className='carrito__grid'>
							<div>
								<div className='carrito__productos'>
									{carrito.map(producto => (
										<ProductoCarrito
											key={producto._id}
											producto={producto}
											className='border'
										/>
									))}
								</div>
							</div>
							<div className='carrito__pasarela'>
								<h2 className='carrito__tituloPedido'>Resumen del pedido</h2>
								<div className='carrito__resumen'>
									<div>
										<p>
											Subtotal <span>{formatearCantidad(subTotal)}</span>
										</p>
										<p>
											Entrega del pedido <span>{formatearCantidad(0)}</span>
										</p>
										<p>
											Descuento Total:{' '}
											<span>{formatearCantidad(-totalDescuento)}</span>
										</p>
										<p>
											IGV incluido. <span>{formatearCantidad(0.15)}</span>
										</p>
										<p className='carrito__precioTotal'>
											Precio Total: <span>{formatearCantidad(total)}</span>
										</p>
									</div>
									<div className='carrito__botones'>
										<Link
											to={'/carrito/pago'}
											className='boton--black'
											title='Procesar Pago'
										>
											Procesar Pago
										</Link>
										<Link
											to={'/carrito/pago'}
											className='boton--paypal'
											title='PayPal'
										>
											<img
												width={80}
												height={80}
												src='/svg/paypal.svg'
												alt='paypal'
											/>
										</Link>
									</div>
									<div className='carrito__seguridad'>
										<ShieldExclamationIcon />
										Paga con rapidez y seguridad
									</div>
									<div>
										<Desplegable titulo='Añadir un código promocional'>
											<div className='carrito__codigoPromocional'>
												<input type='text' placeholder='Código Promocional' />
												<button>Aplicar</button>
											</div>
											<span className='error'>
												Por el momento no disponible.
											</span>
										</Desplegable>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className='carrito__noProductos'>
						<h2>Tu carro está vacío</h2>

						<div>
							<h3>No dejes tu carro vacío.</h3>
							<p>
								Echa un vistazo a las colecciones que tenemos para ti, compra lo
								nuevo y lo mejor o personaliza tus productos.
							</p>
							<Link to={'/colecciones'} className='boton'>
								Ver las colecciones
							</Link>
						</div>
					</div>
				)}
				<VistosRecientemente />
			</section>
		</>
	);
};

export default Carrito;
