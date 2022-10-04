import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper';
import Swal from 'sweetalert2';
import Desplegable from '../../../components/Desplegables/Desplegable';
import VistosRecientemente from '../../../components/VistosRecientemente';
import Modal from '../../../components/Modales/Modal';
import useAuth from '../../../hooks/useAuth';
import getProducto from '../../../api/getProducto';
import { DESCUENTOS } from '../../../constants';
import { formatearCantidad, fomatearFecha } from '../../../helpers';
import useColecciones from '../../../hooks/useColecciones';
import ProductoLoader from '../../../components/loaders/ProductoLoader';
import {
	ArrowsPointingOutIcon,
	CheckCircleIcon,
	ChevronRightIcon,
	GlobeAltIcon,
	HeartIcon,
	NoSymbolIcon,
	ShoppingBagIcon,
	ShoppingCartIcon,
} from '@heroicons/react/24/outline';

import '../../../styles/Producto.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

const Producto = () => {
	// Estados
	const [index, setIndex] = useState(0);
	const [noProducto, setNoProducto] = useState(false);
	const [modal, setModal] = useState(false);
	const [modal2, setModal2] = useState(false);
	const [imgPreview, setImgPreview] = useState('');
	const [producto, setProducto] = useState({});
	const [cargando, setCargando] = useState(true);
	const [campos, setCampos] = useState({
		talla: '',
		color: '',
		cantidad: 1,
	});

	// useParams
	const { url } = useParams();

	// useColecciones
	const {
		carrito,
		handleAddCarrito,
		handleAddFavoritos,
		favoritos,
		handleDeleteFavoritos,
	} = useColecciones();

	// Informacion
	const {
		caracteristicas,
		coleccion,
		colores,
		creador,
		createdAt,
		descripcion,
		descuento,
		empresa,
		galeria,
		portadas,
		informacion,
		marca,
		nombre,
		precio,
		tallas,
		unidades,
		updatedAt,
		genero,
		ventas,
		_id,
	} = producto;

	// useAuth
	const { autenticado } = useAuth();

	// Autenticado
	const auth = autenticado();

	// Obtener el producto del carrito
	const productoCarrito = carrito.find(p => p._id === _id) || null;

	// Obtener el producto de favoritos
	const productoFavoritos = favoritos.find(p => p._id === _id) || null;

	// Efecto para obtener el producto
	useEffect(() => {
		(async () => {
			try {
				setCampos({
					talla: '',
					color: '',
					cantidad: 1,
				});
				setNoProducto(false);
				setCargando(true);
				const { data } = await getProducto({ url });
				setProducto(data);
			} catch (error) {
				setNoProducto(true);
				console.log(error?.response?.data?.msg);
			}
			setCargando(false);
		})();
	}, [url]);

	// Efecto que sincroniza los campos con el producto del carrito
	useEffect(() => {
		if (productoCarrito) {
			setCampos({
				talla: productoCarrito.talla,
				color: productoCarrito.color,
				cantidad: productoCarrito.cantidad,
			});
		}
	}, [productoCarrito]);

	// Handle Change Campos
	const handleChangeCampos = e => {
		const { name, value } = e.target;
		setCampos({ ...campos, [name]: value });
	};

	// Handle previa de imagen
	const handlePreview = e => {
		const { target } = e;
		setImgPreview(target.querySelector('img').src);
		setModal2(true);
	};

	// Obtener el descuento
	const descuentoValue = DESCUENTOS.find(d => d.descuento === descuento)?.value;
	// Total del descuento
	const totalDescuento = precio * descuentoValue;
	// total a pagar
	const totalPagar = precio - totalDescuento;

	// Agregar al carrito
	const handleAgregarCarrito = () => {
		// Validar campos
		if (!campos.talla && !campos.color) {
			Swal.fire({
				title: 'Selecciona una talla y un color',
				icon: 'info',
				text: 'Debes seleccionar una talla y un color',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Agregar
		handleAddCarrito({
			_id,
			imagen: portadas[0],
			nombre,
			marca,
			genero,
			url: producto.url,
			precio,
			totalPagar: totalPagar * campos.cantidad,
			precioDescuento: totalPagar,
			descuento,
			coleccion: coleccion.nombre,
			cantidad: Number(campos.cantidad),
			talla: campos.talla,
			color: campos.color,
			creador: creador._id,
		});
	};

	// Si esta cargando...
	if (cargando) {
		return <ProductoLoader />;
	}
	// Si no hay productos
	if (noProducto) {
		return (
			<div>
				<h2>No se encontro el producto</h2>
			</div>
		);
	}

	return (
		<section>
			<article className='contenedor producto'>
				<div className='producto__grid'>
					<div className='producto__imagenes'>
						<div className='producto__headding'>
							<div className='navegacion__top mb-3'>
								<Link to={'/'}>Inicio</Link>
								<ChevronRightIcon />
								<Link to={'/colecciones'}>Colecciones</Link>
								<ChevronRightIcon />
								<Link to={`/colecciones/${coleccion?.url}`}>
									{coleccion?.nombre}
								</Link>
							</div>
							<h2 className='producto__nombre'>{nombre}</h2>
						</div>

						<div className='producto__swiper'>
							<Swiper
								pagination={{
									type: 'progressbar',
									clickable: true,
								}}
								zoom={true}
								navigation={true}
								onSlideChange={e => setIndex(e.activeIndex)}
								modules={[Zoom, Pagination, Navigation]}
								className='mySwiper zoom'
							>
								{galeria.length > 0 &&
									galeria.map(img => (
										<SwiperSlide key={img.asset_id}>
											<div className='swiper-zoom-container'>
												<img src={img.secure_url} alt={img.original_filename} />
											</div>
										</SwiperSlide>
									))}
							</Swiper>

							<button
								className='producto__agrandarbtn'
								title='Agrandar'
								onClick={() => setModal(true)}
							>
								<ArrowsPointingOutIcon />
							</button>
						</div>

						<div className='producto__selecionar'>
							{galeria.length > 0 &&
								galeria.map((img, i) => (
									<button
										key={img.asset_id}
										className={index === i ? 'active' : ''}
										onClick={handlePreview}
										title='Visualizar'
									>
										<img src={img.secure_url} alt='producto' />
									</button>
								))}
						</div>
					</div>

					<div className='producto__right'>
						<div>
							<div className='producto__textoTop'>
								<div className='navegacion__top'>
									<Link to={'/'}>Inicio</Link>
									<ChevronRightIcon />
									<Link to={'/colecciones'}>Colecciones</Link>
									<ChevronRightIcon />
									<Link to={`/colecciones/${coleccion?.url}`}>
										{coleccion?.nombre}
									</Link>
								</div>
							</div>

							<div className='producto__empresa'>
								<button>
									<img
										src={creador?.empresa?.imagen?.secure_url}
										alt={creador?.empresa?.nombre}
										title={creador?.empresa?.nombre}
									/>
								</button>

								<div className='producto__empresaContenido'>
									<div className='producto__empresaTop'>
										<h2>
											Empresa: <span>{creador?.empresa?.nombre}</span>
										</h2>
										<img
											src={creador?.empresa?.imagen?.secure_url}
											alt='Empresa'
											title={empresa?.nombre}
										/>
									</div>

									<div>
										<div className='producto__empresaInformacion'>
											<p>
												Descripción:
												<span> {creador?.empresa?.descripcion}</span>
											</p>
											<p>
												Dirección: <span>{creador?.empresa?.direccion}</span>
											</p>
											<p>
												Email:{' '}
												<span>
													<a className='sky' href={`mailto:${creador?.email}`}>
														{creador?.email}
													</a>
												</span>
											</p>
											<p>
												Pais: <span>{creador?.empresa?.pais}</span>
											</p>
											<p>
												Ciudad: <span>{creador?.empresa?.ciudad}</span>
											</p>
											<p>
												Codigo Postal:
												<span> {creador?.empresa?.codigoPostal}</span>
											</p>
										</div>
									</div>

									<div className='producto__empresaCreador'>
										<img
											src={creador?.imagen?.secure_url}
											alt='Creador'
											title={creador?.nombre}
										/>
										<p>
											Creador: <span>{creador?.nombre}</span>
										</p>
									</div>
								</div>
							</div>

							<h2 className='producto__nombre'>{nombre}</h2>
							<div>
								<div className='producto__descripcion'>
									<p className='mb-2'>Marca: {marca}</p>
									<p>{descripcion}</p>
								</div>
								<div className='producto__precios'>
									{descuento > '0%' ? (
										<>
											<h2>{formatearCantidad(totalPagar)}</h2>
											<div className='mb-2'>
												<span>Antes: </span>
												<span className='precio__tachado'>
													{formatearCantidad(precio)}
												</span>
											</div>

											{descuentoValue > 0 && (
												<div>
													<span className='sky'>Te ahorras: </span>{' '}
													{formatearCantidad(totalDescuento)}
												</div>
											)}
										</>
									) : (
										<p>Precio: {formatearCantidad(precio)}</p>
									)}
								</div>

								<div className='producto__novedad'>
									{descuento !== '0%' && unidades !== 0 ? (
										<div className='producto__oferta'>
											Descuento -{descuento}
										</div>
									) : (
										unidades === 0 && (
											<div className='producto__agotado'>Agotado</div>
										)
									)}
								</div>
								{descuento > 0 && (
									<p className='producto__ahorro'>
										<span>Te ahorras: </span>{' '}
										{formatearCantidad(descuentoValue)}
									</p>
								)}
							</div>

							<div className='producto__tallasAndColor'>
								<div>
									<label htmlFor='talla'>Talla</label>
									<select
										name='talla'
										id='talla'
										value={campos.talla}
										onChange={handleChangeCampos}
									>
										<option value='' disabled>
											Seleccione talla
										</option>
										{tallas?.map(({ id, talla }) => (
											<option value={talla} key={id}>
												{talla}
											</option>
										))}
									</select>
								</div>

								<div>
									<label htmlFor='color'>Color</label>
									<select
										name='color'
										id='color'
										value={campos.color}
										onChange={handleChangeCampos}
									>
										<option value='' disabled>
											Seleccione color
										</option>
										{colores?.map(({ id, color }) => (
											<option value={color} key={id}>
												{color}
											</option>
										))}
									</select>
								</div>
								{unidades > 0 && (
									<div>
										<label htmlFor='cantidad'>Cantidad</label>
										<select
											name='cantidad'
											id='cantidad'
											value={campos.cantidad}
											onChange={handleChangeCampos}
										>
											{Array.from(
												new Array(unidades > 10 ? 10 : unidades),
												(e, i) => i
											).map(unidad => (
												<option value={unidad + 1} key={unidad}>
													{unidad + 1}
												</option>
											))}
										</select>
									</div>
								)}
							</div>

							<div className='producto__ventas'>
								<ShoppingBagIcon />
								<p>
									<span className='sky'>{ventas}</span> Personas compraron este
									producto
								</p>
							</div>

							{unidades > 0 && (
								<div className='producto__disponibles'>
									<div>
										<div
											style={{ width: `${unidades}%`, maxWidth: '100%' }}
										></div>
									</div>
									<p>
										Últimas <span>{unidades}</span> unidades disponibles
									</p>
								</div>
							)}

							<div className='producto__botones'>
								<button
									className={`pagarbtn`}
									disabled={unidades <= 0}
									onClick={() => (unidades <= 0 ? {} : handleAgregarCarrito())}
								>
									{unidades <= 0 ? (
										<>
											Agotado
											<NoSymbolIcon />
										</>
									) : (
										<>
											{productoCarrito
												? 'Actualizar carrito'
												: 'Agregar al carrito'}
											<ShoppingCartIcon />
										</>
									)}
								</button>
								<button
									disabled={!auth}
									className={` favoritobtn`}
									onClick={() =>
										auth
											? productoFavoritos
												? handleDeleteFavoritos(_id)
												: handleAddFavoritos(producto)
											: {}
									}
								>
									{auth
										? productoFavoritos
											? 'Quitar de favoritos'
											: 'Favoritos'
										: 'Inicia sesión'}

									<HeartIcon />
								</button>
							</div>
							<p className='producto__excluido'>
								Este producto queda excluido de las promociones y descuentos del
								sitio web.
							</p>
						</div>
						<div className='producto__envios'>
							<div>
								<GlobeAltIcon />
								<p>
									Envío gratis a todo el mundo en pedidos superiores a S/.299.00
								</p>
							</div>
							<div>
								<CheckCircleIcon />
								<p>
									Devolución GRATUITA si no quedas satisfecho. Nosotros nos
									ocupamos de todo.
								</p>
							</div>
						</div>
					</div>

					<section className='producto__informacion'>
						<Desplegable titulo={'Información'}>
							<div>
								<div className='producto__informacionEmpresa'>
									<div className='producto__empresaTop'>
										<h2>
											Empresa: <span>{creador?.empresa?.nombre}</span>
										</h2>
										<img
											src={creador?.empresa?.imagen?.secure_url}
											alt='Empresa'
											title={empresa?.nombre}
										/>
									</div>

									<div>
										<div className='producto__empresaInformacion'>
											<p>
												Descripción:
												<span> {creador?.empresa?.descripcion}</span>
											</p>
											<p>
												Dirección: <span>{creador?.empresa?.direccion}</span>
											</p>
											<p>
												Email:{' '}
												<span>
													<a className='sky' href={`mailto:${creador?.email}`}>
														{creador?.email}
													</a>
												</span>
											</p>
											<p>
												Pais: <span>{creador?.empresa?.pais}</span>
											</p>
											<p>
												Ciudad: <span>{creador?.empresa?.ciudad}</span>
											</p>
											<p>
												Codigo Postal:
												<span> {creador?.empresa?.codigoPostal}</span>
											</p>
										</div>
									</div>

									<div className='producto__empresaCreador'>
										<img
											src={creador?.imagen?.secure_url}
											alt='Creador'
											title={creador?.nombre}
										/>
										<p>
											Creador: <span>{creador?.nombre}</span>
										</p>
									</div>

									<div className='producto__fechas'>
										<h2>Producto Creado:</h2> <p>{fomatearFecha(createdAt)}</p>
									</div>
									<div className='producto__fechas'>
										<h2>Ultima Actualización:</h2>{' '}
										<p>{fomatearFecha(updatedAt)}</p>
									</div>
								</div>
								<p>{informacion}</p>
							</div>
						</Desplegable>

						<Desplegable titulo={'Características'}>
							<ul>
								{caracteristicas?.map(({ id, caracteristica }) => (
									<li key={id}>{caracteristica}</li>
								))}
							</ul>
						</Desplegable>

						<Desplegable titulo={'Devolución Gratuita'}>
							<p>
								Si cuando recibas tu producto, algo no te gusta, no te
								preocupes, nos lo puedes devolver sin ningún tipo de problema y
								sin dar explicación alguna. Y si han pasado menos de 14 días,
								nosotros, nos encargamos del coste de la devolución.
							</p>
							<p>
								Cuando quieras devolvernos algo, puedes escribirnos un mensaje y
								te explicamos como proceder con la devolución. Es muy muy fácil.
							</p>
						</Desplegable>

						<Desplegable titulo={'Comentarios'}>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
								delectus veritatis? Dolore, et! Adipisci animi neque quo cumque
								quos quas excepturi! Ullam dolor totam eum laudantium? A
								consectetur similique laboriosam?
							</p>
						</Desplegable>
					</section>
				</div>

				<VistosRecientemente />
			</article>

			<Modal
				bg='var(--white)'
				estado={modal2}
				setEstado={setModal2}
				border={false}
			>
				{imgPreview !== '' && (
					<Swiper
						zoom={true}
						modules={[Zoom]}
						className='mySwiper zoom visualizar'
					>
						<SwiperSlide>
							<div className='swiper-zoom-container'>
								<img draggable={false} src={imgPreview} alt='Imagen Previa' />
							</div>
						</SwiperSlide>
					</Swiper>
				)}
			</Modal>

			<Modal
				titulo='Nombre del producto'
				radius='2px'
				bg='var(--white)'
				estado={modal}
				setEstado={setModal}
			>
				<Swiper
					navigation={true}
					pagination={{
						type: 'bullets',
						clickable: true,
					}}
					zoom={true}
					loop={true}
					modules={[Zoom, Pagination, Navigation]}
					className='mySwiper zoom producto__visualizar'
				>
					{galeria.length > 0 &&
						galeria.map(img => (
							<SwiperSlide key={img.asset_id}>
								<div className='swiper-zoom-container'>
									<img
										draggable={false}
										src={img.secure_url}
										alt={img.original_filename}
									/>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</Modal>
		</section>
	);
};

export default Producto;
