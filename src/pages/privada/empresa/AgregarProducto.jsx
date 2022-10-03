import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import setAddProducto from '../../../api/setAddProducto';
import generarId from '../../../helpers/generarId';
import { DESCUENTOS, GENEROS } from '../../../constants';
import {
	ChevronRightIcon,
	PhotoIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import '../../../styles/AgregarProducto.css';
import putActualizarProducto from '../../../api/putActualizarProducto';
import useColecciones from '../../../hooks/useColecciones';
import getProducto from '../../../api/getProducto';

const defaultState = {
	id: '',
	nombre: '',
	url: '',
	file: {},
};

const AgregarProducto = () => {
	// Estados
	const [producto, setProducto] = useState({});
	const [cargandoProducto, setCargandoProducto] = useState(true);
	const [noProducto, setNoProducto] = useState(false);
	const [campos, setCampos] = useState({
		nombre: '',
		marca: '',
		unidades: '',
		descuento: '0%',
		precio: '',
		coleccion: '',
		genero: '',
		talla: '',
		color: '',
		caracteristica: '',
		descripcion: '',
		informacion: '',
	});
	const [galeria, setGaleria] = useState([]);
	const [portadas, setPortadas] = useState({
		portada1: defaultState,
		portada2: defaultState,
	});
	const [tallas, setTallas] = useState([]);
	const [colores, setColores] = useState([]);
	const [caracteristicas, setCaracteristicas] = useState([]);
	const [cargando, setCargando] = useState(false);

	// useParams
	const { url } = useParams();

	// useNavigate
	const navigate = useNavigate();

	// useColecciones
	const { colecciones, productoModificado, setProductoModificado } =
		useColecciones();

	// Efecto que llena los campos si es que se esta editando
	useEffect(() => {
		if (url) {
			(async () => {
				try {
					setCargandoProducto(true);
					const { data } = await getProducto({ url });
					setProducto(data);
					// Llenar campos
					if (data) {
						setCampos({
							nombre: data?.nombre || '',
							marca: data?.marca || '',
							unidades: data?.unidades || '',
							descuento: data?.descuento || '0%',
							precio: data?.precio || '',
							coleccion: data?.coleccion._id || '',
							genero: data?.genero || '',
							talla: '',
							color: '',
							caracteristica: '',
							descripcion: data?.descripcion || '',
							informacion: data?.informacion || '',
						});
						setTallas(data?.tallas || []);
						setCaracteristicas(data?.caracteristicas || []);
						setColores(data?.colores || []);
						setPortadas({
							portada1: {
								id: generarId(),
								nombre: data?.portadas[0]?.original_filename || '',
								url: data?.portadas[0]?.secure_url || '',
								file: data?.portadas[0]?.secure_url || '',
							},
							portada2: {
								id: generarId(),
								nombre: data?.portadas[1]?.original_filename || '',
								url: data?.portadas[1]?.secure_url || '',
								file: data?.portadas[1]?.secure_url || '',
							},
						});
						setGaleria(
							[
								...data?.galeria
									.map((img, i) => ({
										id: generarId(),
										nombre: img?.original_filename || '',
										url: img?.secure_url || '',
									}))
									.filter(
										(img, i) =>
											i > 1 && {
												id: generarId(),
												nombre: img?.original_filename || '',
												url: img?.secure_url || '',
											}
									),
							] || []
						);
					}
				} catch (error) {
					setNoProducto(true);
					console.log(error?.response?.data?.msg);
				}
				setCargandoProducto(false);
			})();
		}
	}, []);

	// Llenar campos
	const handleCampos = e => {
		const { value, name } = e.target;
		setCampos({ ...campos, [name]: value.trimStart() });
	};

	// Agregar talla
	const addTalla = () => {
		const { talla } = campos;
		// Talla vacia¡
		if (talla === '') {
			Swal.fire({
				title: 'Agrege una talla',
				text: 'Recuerda que las tallas deben ser validas.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Talla repetida¡
		if (tallas.some(n => n.talla.toUpperCase() === talla.toUpperCase())) {
			Swal.fire({
				title: 'Tallas repetidas¡',
				text: 'Hay tallas repetidas por favor las tallas no se deben repetir.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Agregar Talla
		const obj = {
			id: generarId(),
			// Elimine los espacios en blanco y no deje ningun espacio en blanco
			talla: talla.replace(/\s+/g, '').toUpperCase(),
		};
		setTallas([...tallas, obj]);
		setCampos({ ...campos, talla: '' });
	};

	// Eliminar talla
	const deleteTalla = id => {
		const actualizadas = tallas.filter(n => n.id !== id);
		setTallas(actualizadas);
	};

	// Agregar talla
	const addColor = () => {
		const { color } = campos;
		// Color vacia¡
		if (color === '') {
			Swal.fire({
				title: 'Agrege un color',
				text: 'Recuerda que los color deben ser validos.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Color repetida¡
		if (colores.some(n => n.color.toLowerCase() === color.toLowerCase())) {
			Swal.fire({
				title: 'Colores repetidos¡',
				text: 'Hay colores repetidos por favor los colores no se deben repetir.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Agregar Color
		const obj = {
			id: generarId(),
			// convetir texto del color a Capitalize
			color: color.replace(
				/\w\S*/g,
				txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
			),
		};
		setColores([...colores, obj]);
		setCampos({ ...campos, color: '' });
	};

	// Eliminar talla
	const deleteColor = id => {
		const actualizadas = colores.filter(n => n.id !== id);
		setColores(actualizadas);
	};

	// Agregar caracteristica
	const addCaracteristica = () => {
		const { caracteristica } = campos;
		// caracteristica vacia¡
		if (caracteristica === '') {
			Swal.fire({
				title: 'Agrege una caracteristica',
				text: 'Recuerda que las caracteristica deben ser validas.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// caracteristica repetida¡
		if (
			caracteristicas.some(
				c =>
					c.caracteristica.toLocaleLowerCase() ===
					caracteristica.toLocaleLowerCase()
			)
		) {
			Swal.fire({
				title: 'Caracteristica repetidas¡',
				text: 'Hay caracteristicas repetidas por favor las caracteristica no se deben repetir.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Agregar caracteristica
		const obj = {
			id: generarId(),
			caracteristica,
		};
		setCaracteristicas([...caracteristicas, obj]);
		setCampos({ ...campos, caracteristica: '' });
	};

	const deleteCaracteristica = id => {
		const actualizadas = caracteristicas.filter(c => c.id !== id);
		setCaracteristicas(actualizadas);
	};
	// Almacenar las portadas
	const handleFiles = async e => {
		const { name, files } = e.target;

		// No hay files¡
		if (!files[0]?.name) return;

		if (files?.length === 1) {
			const obj = {
				id: generarId(),
				nombre: files[0].name,
				url: URL.createObjectURL(files[0]),
				file: files[0],
			};
			setPortadas({ ...portadas, [name]: obj });
		}
	};

	// Almacenar las imagenes en la galeria
	const handleGaleria = e => {
		const { files } = e.target;

		// No existe valor
		if (files.length === 0) return;

		// Existe solo un valor
		if (files.length === 1) {
			if (galeria.length > 4) {
				Swal.fire({
					title: 'Ha superado el liminte de subida de imagenes',
					text: 'Recuerda que solo se pueden subir maximo 4 imagenes por producto.',
					icon: 'warning',
					confirmButtonText: 'Entendido',
				});
			} else {
				if (galeria.some(item => item.name === files[0].name)) {
					Swal.fire({
						title: 'Las imagenes son iguales 😢',
						text: 'Por favor no subir imagenes repetidas,Ya que esto dañara la experiencia de usuario, Gracias.',
						icon: 'warning',
						confirmButtonText: 'Entendido',
					});
				} else {
					const obj = {
						id: generarId(),
						nombre: files[0].name,
						url: URL.createObjectURL(files[0]),
						file: files[0],
					};
					setGaleria([obj, ...galeria]);
				}
			}
		}
		// Existe mas de un valor
		else {
			// Limite alcanzado
			if (galeria.length > 2 || files.length > 4) {
				Swal.fire({
					title: 'Ha superado el liminte de subida de imagenes',
					text: 'Recuerda que solo se pueden subir maximo 6 imagenes por producto.',
					icon: 'warning',
					confirmButtonText: 'Entendido',
				});
			} else {
				let items = galeria;
				for (let i = 0; i < files.length; i++) {
					const elemento = files[i];
					if (galeria.some(item => item.nombre === elemento.name)) {
						Swal.fire({
							title: 'Las imagenes son iguales 😢',
							text: 'Por favor no subir imagenes repetidas,Ya que esto dañara la experiencia de usuario, Gracias.',
							icon: 'warning',
							confirmButtonText: 'Entendido',
						});
					} else {
						const obj = {
							id: generarId(),
							nombre: elemento.name,
							url: URL.createObjectURL(elemento),
							file: elemento,
						};
						items = [obj, ...items];
					}
				}
				if (items.length > 4) {
					Swal.fire({
						title: 'Ha superado el liminte de subida de imagenes',
						text: 'Recuerda que solo se pueden subir maximo 6 imagenes por producto.',
						icon: 'warning',
						confirmButtonText: 'Entendido',
					});
				} // Limite alcanzado
				else setGaleria(items);
			}
		}
	};

	// Quitar imagen de galeria
	const handleQuitarGaleria = (e, id) => {
		e.preventDefault();
		const actualizados = galeria.filter(imagen => imagen.id !== id);
		setGaleria(actualizados);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const values = {
			nombre: campos.nombre,
			marca: campos.marca,
			unidades: campos.unidades,
			descuento: campos.descuento,
			precio: campos.precio,
			coleccion: campos.coleccion,
			genero: campos.genero,
			descripcion: campos.descripcion,
			informacion: campos.informacion,
			tallas,
			colores,
			caracteristicas,
		};

		// Validar campos
		if (Object.values(values).includes('')) {
			Swal.fire({
				title: 'Rellene todo los campos',
				text: 'Todo los campos son olbligatorios.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Validad que las unidades sean solo numero
		if (!/^[0-9]+$/.test(campos.unidades)) {
			Swal.fire({
				title: 'Unidades invalidas',
				text: 'Debes ingresar unidades validas para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (values.unidades < 1) {
			Swal.fire({
				title: 'Agrege minimo una unidad del producto',
				text: 'Agrega las unidades de los producto.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Validad que el precio sea numero
		if (!/^[0-9]+$/.test(campos.precio)) {
			Swal.fire({
				title: 'Precio invalido',
				text: 'Debes ingresar un precio valido para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		if (values.precio < 10) {
			Swal.fire({
				title: 'Los precios deben ser mayores a 10 soles',
				text: 'Agrega un precio adecuado para tu producto.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (values.precio > 5000) {
			Swal.fire({
				title: 'Precio exedido',
				text: 'El precio a superado los limites para tu producto.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (tallas.length === 0) {
			Swal.fire({
				title: 'Agrege una talla',
				text: 'Recuerda que las tallas deben ser validas.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (colores.length === 0) {
			Swal.fire({
				title: 'Agrege un color',
				text: 'Recuerda que los colores deben ser validos.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (caracteristicas.length === 0) {
			Swal.fire({
				title: 'Agrege una caracteristica',
				text: 'Recuerda que las caracteristica deben ser validas.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		if (
			Object.values(portadas.portada1).includes('') ||
			Object.values(portadas.portada2).includes('')
		) {
			Swal.fire({
				title: 'Las portadas son requeridas',
				text: 'Las portadas son obligatorias, recuerda subir imagenes no tan pesadas.',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (portadas.portada1.nombre === portadas.portada2.nombre) {
			Swal.fire({
				title: 'Las portadas son iguales',
				text: 'Las portadas deben ser diferentes.',
				icon: 'warning',
				confirmButtonText: 'Cerrar',
			});
			return;
		}
		if (galeria.length < 2) {
			Swal.fire({
				title: 'Agrege imagenes a la galeria',
				text: 'Recuerda que solo se pueden subir maximo de 4 imagenes',
				icon: 'warning',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		if (values.descripcion.length > 800) {
			Swal.fire({
				title: 'Descripción exedida',
				text: 'La descripción debe tene maximo 800 caracteres.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		if (values.informacion.length > 3860) {
			Swal.fire({
				title: 'Información exedida',
				text: 'La informacion debe tene maximo 3860 caracteres.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Generar un form data
		const formData = new FormData();
		formData.append('nombre', values.nombre);
		formData.append('marca', values.marca);
		formData.append('unidades', values.unidades);
		formData.append('descuento', values.descuento);
		formData.append('precio', values.precio);
		formData.append('coleccion', values.coleccion);
		formData.append('tallas', JSON.stringify(values.tallas));
		formData.append('colores', JSON.stringify(colores));
		formData.append('genero', values.genero);
		formData.append('caracteristicas', JSON.stringify(caracteristicas));
		formData.append('descripcion', values.descripcion);
		formData.append('informacion', values.informacion);

		const urls = [portadas.portada1, portadas.portada2, ...galeria];

		// Crear un buffer con las urls de las imagenes
		const buffer = urls.map(({ url }) => {
			return fetch(url)
				.then(res => res.blob())
				.then(blob => {
					return new File([blob], 'image.jpg', { type: 'image/jpeg' });
				});
		});

		// Esperar a que se resuelvan todas las promesas
		await Promise.all(buffer).then(files => {
			files.forEach(file => {
				formData.append('file', file);
			});
		});

		// Realizar la petición
		try {
			setCargando(true);
			if (url) {
				await putActualizarProducto({
					id: producto._id,
					data: formData,
				});
				// Mostrar mensaje de exito
				Swal.fire({
					title: 'Producto actualizado',
					text: 'El producto se actualizo correctamente.',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			} else {
				await setAddProducto(formData);
				// Mostrar mensaje de exito
				Swal.fire({
					title: 'Producto agregado',
					text: 'El producto se agrego correctamente.',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			}
			setProductoModificado(!productoModificado);
			// Receterar los valores
			setCampos({
				nombre: '',
				marca: '',
				unidades: '',
				descuento: 0,
				precio: '',
				coleccion: '',
				genero: '',
				talla: '',
				color: '',
				caracteristica: '',
				descripcion: '',
				informacion: '',
			});
			setGaleria([]);
			setPortadas({
				portada1: defaultState,
				portada2: defaultState,
			});
			setTallas([]);
			setCaracteristicas([]);

			// Redireccionar
			navigate('/empresa/mis-productos');
		} catch (error) {
			const e = error?.response?.data?.msg;
			console.log(e);
			Swal.fire({
				title: 'Ocurro algo inesperado',
				text: e,
				icon: 'error',
				confirmButtonText: 'Volver a intentar',
			});
		}
		setCargando(false);
	};
	return (
		<>
			{cargando && (
				<section className='overlay overlay--producto'>
					<div>
						<h2>{url ? 'Actualizando' : 'Creando Producto'}</h2>
						<div className='spinner'>
							<div className='bounce1'></div>
							<div className='bounce2'></div>
							<div className='bounce3'></div>
						</div>
					</div>
				</section>
			)}

			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<Link to={'/'}>Inicio</Link>
						<ChevronRightIcon />
						<Link to={'/cuenta'}>Cuenta</Link>
						<ChevronRightIcon />
						<span className='active'>Crear Producto</span>
					</div>
				</div>
			</div>

			<section className='agregarProducto'>
				<div className='agregarProducto__encabezado'>
					<p className='titulo'>
						{url
							? 'Actualizar tu producto ahora mismo'
							: 'Comienza agregando tus productos'}
					</p>
					<p className='texto'>
						Tus productos seran mostrado inmediatamente cuando lo{' '}
						{url ? 'actualices' : 'publiques'} 🎁
					</p>
				</div>

				{cargandoProducto && url ? (
					<div className='px-5 pt-3 pb-5 border-b center'>
						<div className='spinner' style={{ marginTop: 0 }}>
							<div className='bounce1'></div>
							<div className='bounce2'></div>
							<div className='bounce3'></div>
						</div>
					</div>
				) : noProducto ? (
					<div className='p-4  border-b center'>
						<p className='titulo'>No se encontro el producto</p>
					</div>
				) : (
					<section className='agregarProducto__formulario mb-2'>
						<form
							onSubmit={handleSubmit}
							accept='image/png,image/jpeg,image/webp,image/avif'
							encType='multipart/form-data'
						>
							<div className='border agregarProducto__item'>
								<legend className='fomulario__titulo'>
									{url ? 'Actualizar tu producto' : 'Crear producto'}
								</legend>
								<div className='formulario__grid'>
									<div className='fomulario__item'>
										<label htmlFor='nombre'>Nombre del producto</label>
										<input
											type='text'
											id='nombre'
											name='nombre'
											value={campos.nombre}
											onChange={handleCampos}
											placeholder='Ingrese nombre del producto'
										/>
									</div>

									<div className='fomulario__item'>
										<label htmlFor='marca'>Marca</label>
										<input
											type='text'
											id='marca'
											name='marca'
											value={campos.marca}
											onChange={handleCampos}
											placeholder='Ingrese marca del producto'
										/>
									</div>
								</div>

								<div className='formulario__grid'>
									<div className='fomulario__item'>
										<label htmlFor='unidades'>Unidades</label>
										<input
											type='number'
											id='unidades'
											name='unidades'
											value={campos.unidades}
											onChange={handleCampos}
											placeholder='Ingrese unidades del producto'
										/>
									</div>
									<div className='fomulario__item'>
										<label htmlFor='descuento'>Descuento</label>
										<select
											id='descuento'
											name='descuento'
											value={campos.descuento}
											onChange={handleCampos}
										>
											{DESCUENTOS.map(descuento => (
												<option
													key={descuento.descuento}
													value={descuento.descuento}
												>
													{descuento.descuento}
												</option>
											))}
										</select>
									</div>
								</div>

								<div className='formulario__grid'>
									<div className='fomulario__item'>
										<label htmlFor='precio'>Precio</label>
										<input
											type='number'
											id='precio'
											name='precio'
											value={campos.precio}
											onChange={handleCampos}
											placeholder='Ingrese precio del producto'
										/>
									</div>

									<div className='fomulario__item mb-3'>
										<label htmlFor='coleccion'>Coleccion</label>
										<select
											id='coleccion'
											name='coleccion'
											value={campos.coleccion}
											onChange={handleCampos}
										>
											<option value='' disabled>
												Seleccione
											</option>
											{colecciones.length > 0 &&
												colecciones.map(({ _id, nombre, url }) => (
													<option key={_id} value={_id}>
														{nombre}
													</option>
												))}
										</select>
									</div>
								</div>

								<div className='fomulario__item mb-3'>
									<label htmlFor='genero'>Genero</label>
									<select
										id='genero'
										name='genero'
										value={campos.genero}
										onChange={handleCampos}
									>
										<option value='' disabled>
											Seleccione
										</option>
										{GENEROS.map(({ genero }) => (
											<option key={genero} value={genero}>
												{genero}
											</option>
										))}
									</select>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='tallas'>Tallas</label>
									<div className='formulario__flex'>
										<input
											className='uppercase'
											type='text'
											id='tallas'
											name='talla'
											value={campos.talla}
											onChange={handleCampos}
											placeholder='Añade una talla'
										/>
										<button
											className='boton--black'
											type='button'
											title='Agregar Talla'
											onClick={addTalla}
										>
											Agregar
										</button>
									</div>

									<div className='fomulario__append'>
										{tallas.length > 0 &&
											tallas.map(({ talla, id }) => (
												<p className='texto talla' key={id}>
													{talla}
													<button
														type='button'
														title='Quitar'
														onClick={() => deleteTalla(id)}
													>
														<XMarkIcon />
													</button>
												</p>
											))}
									</div>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='color'>Color</label>
									<div className='formulario__flex'>
										<input
											type='text'
											id='color'
											name='color'
											value={campos.color}
											onChange={handleCampos}
											placeholder='Añade un color'
										/>
										<button
											className='boton--black'
											type='button'
											title='Agregar Color'
											onClick={addColor}
										>
											Agregar
										</button>
									</div>
									<div className='fomulario__append'>
										{colores.length > 0 &&
											colores.map(({ color, id }) => (
												<p className='texto color' key={id}>
													{color}
													<button
														type='button'
														title='Quitar'
														onClick={() => deleteColor(id)}
													>
														<XMarkIcon />
													</button>
												</p>
											))}
									</div>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='caracteristica'>
										Caracteristicas del producto
									</label>
									<div className='formulario__flex'>
										<input
											type='text'
											id='caracteristica'
											name='caracteristica'
											value={campos.caracteristica}
											onChange={handleCampos}
											placeholder='Añade una caracteristica'
										/>
										<button
											className='boton--black'
											type='button'
											title='Agregar Caracteristica'
											onClick={addCaracteristica}
										>
											Agregar
										</button>
									</div>

									<div className='fomulario__append'>
										{caracteristicas.length > 0 &&
											caracteristicas.map(({ caracteristica, id }) => (
												<p className='texto' key={id}>
													{caracteristica}
													<button
														type='button'
														title='Quitar'
														onClick={() => deleteCaracteristica(id)}
													>
														<XMarkIcon />
													</button>
												</p>
											))}
									</div>
								</div>
							</div>

							<div className='border agregarProducto__item'>
								<div className='formulario__grid'>
									<label
										htmlFor='portada1'
										className='fomulario__item formulario__imagen'
										title='Agregar Portada'
									>
										Portada 1
										{portadas.portada1.url !== '' && (
											<img
												src={portadas.portada1.url}
												alt={portadas.portada1.nombre}
											/>
										)}
										<input
											type='file'
											accept='image/png,image/jpeg,image/webp,image/avif'
											id='portada1'
											name='portada1'
											onChange={handleFiles}
										/>
										<PhotoIcon />
									</label>

									<label
										htmlFor='portada2'
										className='fomulario__item formulario__imagen'
										title='Agregar segunda portada'
									>
										{portadas.portada2.url !== '' && (
											<img
												src={portadas.portada2.url}
												alt={portadas.portada2.nombre}
											/>
										)}
										Portada 2
										<PhotoIcon />
										<input
											type='file'
											accept='image/png,image/jpeg,image/webp,image/avif'
											id='portada2'
											name='portada2'
											onChange={handleFiles}
										/>
									</label>
								</div>

								<div className='mb-3'>
									<label
										htmlFor='galeria'
										title='Agregar varias imagenes'
										className={`${
											galeria.length === 4 ? 'disabled' : ''
										} formulario__galeria`}
									>
										{galeria.length === 0 && (
											<div className='formulario__galeriaText'>
												Galeria de imagenes maximo (4)
												<PhotoIcon />
											</div>
										)}
										{galeria.length > 0 &&
											galeria.map(({ id, nombre, url }) => (
												<div key={id}>
													<img src={url} alt={nombre} />
													<button
														type='button'
														title='Quitar'
														onClick={e => handleQuitarGaleria(e, id)}
													>
														<TrashIcon />
													</button>
												</div>
											))}
										<input
											type='file'
											multiple
											accept='image/png,image/jpeg,image/webp,image/avif'
											id='galeria'
											onChange={handleGaleria}
										/>
										{galeria.length < 4 && (
											<button className='agregar-imagenes' type='button'>
												Agregar Imagenes
											</button>
										)}
									</label>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='descripcion'>descripción</label>
									<textarea
										id='descripcion'
										name='descripcion'
										value={campos.descripcion}
										onChange={handleCampos}
										placeholder='Añade una descripción del producto'
									/>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='informacion'>Informacion</label>
									<textarea
										id='informacion'
										name='informacion'
										value={campos.informacion}
										onChange={handleCampos}
										placeholder='Añade informacion del producto'
									/>
								</div>
								<button
									className='boton--black uppercase full'
									type='submit'
									disabled={cargando}
								>
									{url ? 'Guardar Cambios' : 'Publicar Producto'}
								</button>

								<div className='formulario__bottom'>
									<div>
										<span>Asegurese de brindar información valida</span>
									</div>
								</div>
							</div>
						</form>
					</section>
				)}
			</section>
		</>
	);
};

export default AgregarProducto;
