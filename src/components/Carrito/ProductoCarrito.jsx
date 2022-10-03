/* eslint-disable react/prop-types */
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { formatearCantidad } from '../../helpers';
import useColecciones from '../../hooks/useColecciones';
import '../../styles/ProductoCarrito.css';

const ProductoCarrito = ({ producto, handleMostrar, ...props }) => {
	const {
		_id,
		url,
		nombre,
		imagen,
		color,
		talla,
		precio,
		totalPagar,
		precioDescuento,
		descuento,
		cantidad,
	} = producto;

	// useColecciones
	const { handleDeleteCarrito } = useColecciones();

	return (
		<article {...props}>
			<div className='productoCarrito'>
				<div className='productoCarrito__grid'>
					<Link to={`/productos/${url}`} title={nombre} onClick={handleMostrar}>
						<img
							src={imagen?.secure_url}
							alt={`Producto - ${nombre}`}
							className='productoCarrito__imagen'
						/>
					</Link>

					<div className='productoCarrito__contenido'>
						{descuento !== '0%' && (
							<div className='productoCarritoDescuento'>- {descuento}</div>
						)}
						<div>
							<Link
								to={`/productos/${url}`}
								title={nombre}
								onClick={handleMostrar}
							>
								<h3>{nombre}</h3>
							</Link>
							<p>
								Color: <span>{color}</span>
							</p>
							<p>
								Talla: <span>{talla}</span>
							</p>
							<p>
								Cantidad: <span>{cantidad}</span>
							</p>
							<p>
								Precio Antes: <span>{formatearCantidad(precio)}</span>
							</p>
							<p>
								Precio Ahora: <span>{formatearCantidad(precioDescuento)}</span>
							</p>
						</div>
						<div className='productoCarritoRight'>
							<p>{formatearCantidad(totalPagar)}</p>
							<div className='productoCarrito__opciones'>
								<div>
									<Link
										to={`/productos/${url}`}
										onClick={handleMostrar}
										title='Editar'
									>
										<PencilIcon />
									</Link>
									<button
										title='Eliminar'
										onClick={() => handleDeleteCarrito(_id)}
									>
										<TrashIcon />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

ProductoCarrito.defaultProps = {
	handleMostrar: () => {},
};

export default ProductoCarrito;
