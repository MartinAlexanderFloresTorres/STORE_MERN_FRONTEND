/* eslint-disable react/prop-types */
import { formatearCantidad } from '../helpers';
import '../styles/Pedidos.css';

const Pedido = ({ producto }) => {
	const {
		nombre,
		marca,
		imagen,
		precio,
		precioDescuento,
		totalPagar,
		descuento,
		talla,
		color,
		cantidad,
		coleccion,
	} = producto;
	return (
		<article className='pedido'>
			<img
				src={imagen?.secure_url}
				alt={nombre}
				title={nombre}
				width={100}
				height={100}
			/>
			<div className='pedido__info'>
				<div className='pedido__descuento'>- {descuento}</div>
				<div className='pedido__header'>
					<h3 title={nombre}>{nombre}</h3>
					<p>{marca}</p>
					<div className='pedido__marca'>{coleccion}</div>
				</div>
				<div>
					<p>
						<span>Talla: </span>
						{talla}
					</p>
					<p>
						<span>Color: </span>
						{color}
					</p>
					<p>
						<span>Cantidad: </span>
						{cantidad}
					</p>
					<p>
						<span>Precio Antes: </span>
						{formatearCantidad(precio)}
					</p>
					<p>
						<span>Precio Ahora: </span>
						{formatearCantidad(precioDescuento)}
					</p>
					<p>
						<span>Total: </span>
						{formatearCantidad(totalPagar)}
					</p>
				</div>
			</div>
		</article>
	);
};

export default Pedido;
