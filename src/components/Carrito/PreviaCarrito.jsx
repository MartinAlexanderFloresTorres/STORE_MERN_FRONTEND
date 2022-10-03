/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import ProductoCarrito from './ProductoCarrito';
import { formatearCantidad } from '../../helpers';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useColecciones from '../../hooks/useColecciones';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import '../../styles/PreviaCarrito.css';

const PreviaCarrito = ({ mostrar, handleMostrar }) => {
	// useColecciones
	const { carrito } = useColecciones();

	// Total a pagar
	const total = carrito.reduce(
		(total, producto) => total + producto.precioDescuento * producto.cantidad,
		0
	);

	return (
		<>
			<section
				className={`${
					mostrar ? (carrito.length === 0 ? 'vacio' : 'active') : ''
				} previaCarrito`}
			>
				<button
					title='Carrito'
					className='itemLink PreviaCarrito__cantidad'
					onClick={handleMostrar}
				>
					{carrito.length > 0 ? <ShoppingBagIcon /> : <ShoppingCartIcon />}
					{carrito.length > 0 && <span>{carrito.length}</span>}
				</button>

				{carrito.length === 0 ? (
					<div className='previaCarrito_vacio'>
						<span>El carrito esta vacio</span>
					</div>
				) : (
					<div className='previaCarrito__contenido'>
						<div className='previaCarrito__top'>
							<h3>
								Carrito <span>({carrito?.length})</span>
							</h3>
							<button title='Cerrar' onClick={handleMostrar}>
								<XMarkIcon />
							</button>
						</div>
						<div className='previaCarrito__center'>
							{carrito.map(producto => (
								<ProductoCarrito
									key={producto._id}
									producto={producto}
									className='border--bottom'
									handleMostrar={handleMostrar}
								/>
							))}
						</div>
						<div className='previaCarrito__bottom'>
							<p className='previaCarrito__subTotal'>
								Subtotal <span>{formatearCantidad(total)}</span>
							</p>
							<Link
								to={'/carrito'}
								className='boton--black'
								title='Procesar Pago'
								onClick={handleMostrar}
							>
								Finalizar Pago
							</Link>
							<Link
								to={'/carrito/pago'}
								className='boton--paypal'
								title='PayPal'
								onClick={handleMostrar}
							>
								<img
									width={80}
									height={80}
									src='/svg/paypal.svg'
									alt='paypal'
								/>
							</Link>
							<p className='previaCarrito__codigo'>
								Los códigos de descuento, los costes de envío y los impuestos se
								añaden durante el pago.
							</p>
						</div>
					</div>
				)}
			</section>
			{mostrar && <div onClick={handleMostrar} className='overlay'></div>}
		</>
	);
};

export default PreviaCarrito;
