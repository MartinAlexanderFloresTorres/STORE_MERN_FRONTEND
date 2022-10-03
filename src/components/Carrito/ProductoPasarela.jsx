/* eslint-disable react/prop-types */

import { formatearCantidad } from '../../helpers';

const ProductoPasarela = ({ producto }) => {
	const { nombre, imagen, coleccion, totalPagar, descuento } = producto;

	return (
		<article className='producto__pasarela'>
			<img src={imagen?.secure_url} alt={`Producto - ${nombre}`} />
			<div>
				<h4 className='mb-1'>{nombre}</h4>
				<p>{coleccion}</p>
			</div>
			<p className='mt-2 texto'>{formatearCantidad(totalPagar)}</p>
			<div className='producto__pasarelaDescuento'>- {descuento}</div>
		</article>
	);
};

export default ProductoPasarela;
