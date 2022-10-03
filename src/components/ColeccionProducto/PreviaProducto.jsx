/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { DESCUENTOS } from '../../constants';
import { formatearCantidad } from '../../helpers';
import useColecciones from '../../hooks/useColecciones';
import '../../styles/PreviaProducto.css';

const PreviaProducto = ({ producto, ...props }) => {
	const { descuento, marca, nombre, portadas, precio, unidades, url, _id } =
		producto;

	const { id } = props;

	const descuentoValue = DESCUENTOS.find(d => d.descuento === descuento)?.value;

	// Total del descuento
	const totalDescuento = precio * descuentoValue;
	// total a pagar
	const totalPagar = precio - totalDescuento;

	// useColeccion
	const { handleEliminarProducto } = useColecciones();

	return (
		<article {...props}>
			<Link
				to={id === 'editar-producto' ? '' : `/productos/${url}`}
				className='previaProducto'
			>
				<span>
					<div className='previaProducto__imagenes'>
						{portadas.length > 0 &&
							portadas.map(({ public_id, secure_url, original_filename }) => (
								<img
									key={public_id}
									src={secure_url}
									width={200}
									height={200}
									alt={original_filename}
								/>
							))}
					</div>

					<div className='previaProducto__novedad'>
						{descuento !== '0%' && unidades !== 0 ? (
							<div className='previaProducto__oferta'>- {descuento}</div>
						) : (
							unidades === 0 && (
								<div className='previaProducto__agotado'>Agotado</div>
							)
						)}
					</div>

					<div className='previaProducto__informacion'>
						<div>
							<h2 className='previaProducto__nombre'>{nombre}</h2>
							<p className='previaProducto__descripcion'>{marca}</p>
						</div>
						<div className='previaProducto__bottom'>
							<div className='previaProducto__precios'>
								{descuento !== '0%' ? (
									<>
										<p>{formatearCantidad(totalPagar)}</p>
										<p className='precio__tachado'>
											{formatearCantidad(precio)}
										</p>
									</>
								) : (
									<p>{formatearCantidad(precio)}</p>
								)}
							</div>

							{descuentoValue > 0 && (
								<p className='previaProducto__ahorro'>
									<span>Te ahorras: </span> {formatearCantidad(totalDescuento)}
								</p>
							)}
						</div>
					</div>
				</span>
			</Link>
			{id === 'editar-producto' && (
				<div className='previaProducto__Opciones'>
					<div>
						<Link to={`/empresa/editar-producto/${url}`}>Editar</Link>
						<button onClick={() => handleEliminarProducto({ id: _id, nombre })}>
							Eliminar
						</button>
						<Link to={`/productos/${url}`}>Ver Producto</Link>
					</div>
				</div>
			)}
		</article>
	);
};

export default PreviaProducto;
