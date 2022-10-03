/* eslint-disable react/no-unknown-property */
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import getColeccion from '../../api/getColeccion';
import postCrearColeccion from '../../api/postCrearColeccion';
import putActualizarColeccion from '../../api/putActualizarColeccion';
import useColecciones from '../../hooks/useColecciones';
import ButtonLoad from '../Botones/ButtonLoad';

const FormularioColeccion = () => {
	// Estado para la colección
	const [coleccion, setColeccion] = useState({});
	const [noColeccion, setNoColeccion] = useState(false);
	const [cargandoColeccion, setCargandoColeccion] = useState(true);
	const [campos, setCampos] = useState({
		nombre: '',
		encabezado: '',
		descripcion: '',
	});
	const [previaImagen, setPreviaImagen] = useState('');
	const [previaBanner, setPreviaBanner] = useState({
		type: '',
		url: '',
	});
	const [cargando, setCargando] = useState(false);

	// useParam para obtener el url de la colección
	const { url } = useParams();

	// useNavigate
	const navigate = useNavigate();

	// useColecciones
	const { colecciones, setColecciones } = useColecciones();

	useEffect(() => {
		if (url) {
			(async () => {
				try {
					setCargandoColeccion(true);
					const { data } = await getColeccion({ url });
					setColeccion(data);
					setCampos({
						nombre: data.nombre,
						encabezado: data.banner.encabezado,
						descripcion: data.banner.descripcion,
					});
					setPreviaImagen(data.imagen.secure_url);
					setPreviaBanner({
						type: data.banner.data.format,
						url: data.banner.data.secure_url,
					});
				} catch (error) {
					setColeccion({});
					setNoColeccion(true);
					console.log(error?.response?.data?.msg);
				}
				setCargandoColeccion(false);
			})();
		}
	}, []);

	// Handle para la imagen
	const handleImagen = e => {
		const imagen = e.target.files[0];
		if (imagen) {
			const url = URL.createObjectURL(imagen);
			setPreviaImagen(url);
		}
	};

	// Handle para el video
	const handleVideo = e => {
		const video = e.target.files[0];
		if (video) {
			const url = URL.createObjectURL(video);
			setPreviaBanner({
				type: video.type,
				url,
			});
		}
	};

	// Handle change para los campos
	const handleChange = e => {
		const { name, value } = e.target;
		setCampos({
			...campos,
			[name]: value,
		});
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();

		// Validar campos
		if (
			Object.values({ ...campos, previaImagen, ...previaBanner.url }).includes(
				''
			)
		) {
			Swal.fire({
				title: 'Rellena todos los campos',
				text: 'Todos los campos son obligatorios',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Validar si no hay una imagen
		if (previaImagen === '') {
			Swal.fire({
				title: 'La imagen es obligatoria',
				text: 'Todos los campos son obligatorios',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Validar si el nombre de la colección es igual a otro nombre
		if (coleccion?.nombre === campos.nombre.trim()) return;

		// Crear FormData
		const formData = new FormData();
		formData.append('nombre', campos.nombre);
		formData.append('encabezado', campos.encabezado);
		formData.append('descripcion', campos.descripcion);

		const urls = [previaImagen, previaBanner.url];

		// Crear un buffer con las urls de las imagenes y videos
		const buffer = urls.map(url => {
			return fetch(url)
				.then(res => res.blob())
				.then(blob => {
					return new File([blob], `${url.split('/').pop()}`, {
						type: blob.type,
					});
				});
		});

		// Esperar a que se resuelvan todas las promesas
		await Promise.all(buffer).then(files => {
			files.forEach(file => {
				formData.append('file', file);
			});
		});

		// Enviar datos
		try {
			setCargando(true);
			// Actualizar colección
			if (url && coleccion?._id) {
				const { data } = await putActualizarColeccion({
					id: coleccion._id,
					data: formData,
				});

				// Actualizar colecciones
				const nuevasColecciones = colecciones.map(coleccion => {
					if (coleccion._id === data._id) {
						return data;
					}
					return coleccion;
				});
				setColecciones(nuevasColecciones);

				// Mostar mensaje de éxito
				Swal.fire({
					title: 'Colección actualizada',
					text: 'La colección se actualizó correctamente',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			} else {
				// Crear colección
				const { data } = await postCrearColeccion(formData);

				// Actualizar colecciones
				setColecciones([...colecciones, data]);

				// Mostar mensaje de éxito
				Swal.fire({
					title: 'Colección Creada',
					text: 'La colección se a creado correctamente',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			}

			// Redireccionar
			navigate('/empresa/administrador/colecciones');
		} catch (error) {
			const e = error?.response?.data?.msg;
			console.log(e);
			Swal.fire({
				title: 'Ups! Algo salió mal',
				text: e,
				icon: 'error',
				confirmButtonText: 'Entendido',
			});
		}
		setCargando(false);
	};

	if (cargandoColeccion && url) {
		return (
			<div className='contenedor'>
				<div className='formulario__grid--2'>
					<div className='border p-3'>
						<div className='loader-item p-3'></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-5' style={{ height: 200 }}></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-3'></div>
						<div className='loader-item p-1'></div>
					</div>
					<div className='border p-3'>
						<div className='loader-item p-3'></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-5' style={{ height: 200 }}></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-1'></div>
						<div className='loader-item p-3'></div>
						<div className='loader-item p-1'></div>
					</div>
				</div>
			</div>
		);
	}
	if (noColeccion) {
		return (
			<div className='contenedor'>
				<div className='contenedor__cargando'>
					<h2>No se encontro la colección</h2>
				</div>
			</div>
		);
	}
	return (
		<form
			className='contenedor formulario__grid--2'
			onSubmit={handleSubmit}
			encType='multipart/form-data'
		>
			<div className='border p-3'>
				<legend className={`center mb-5 fomulario__titulo`}>
					{coleccion?.nombre
						? 'Actualiza los datos de la colección'
						: 'Crea una nueva colección'}
				</legend>

				<label className='fomulario__item' htmlFor='imagen'>
					{previaImagen && (
						<img
							className='formulario__imgColeccion'
							src={previaImagen}
							alt='usuario'
						/>
					)}
					<span className='formulario__subir'>
						Subir Imagen
						<CloudArrowDownIcon />
					</span>
					<input
						type='file'
						accept='image/png,image/jpeg,image/webp,image/avif'
						onChange={handleImagen}
						id='imagen'
						className='formulario__file'
					/>
				</label>

				<p className='formulario__formatos'>
					JPG, PNG, WEBP o AVIF. Peso máximo de 1Mb
				</p>

				<div className='fomulario__item'>
					<label htmlFor='nombre'>Nombre de la colección</label>
					<input
						type='text'
						id='nombre'
						name='nombre'
						value={campos.nombre}
						onChange={handleChange}
						placeholder='Escriba el nombre de la colección'
					/>
					{url && (
						<div className='center'>
							<p className='mt-2'>
								si no quieres actualizar el nombre de la colección coloca el
								siguiente signo
							</p>
							<span className='sky titulo'> ?</span>
						</div>
					)}
				</div>
			</div>

			<div className='border p-3'>
				<h2 className='center mb-5 fomulario__titulo'>Banner</h2>
				<div>
					<div>
						<label className='fomulario__item' htmlFor='video'>
							{previaBanner.url &&
								(previaBanner.type.includes('mp4') ? (
									<video
										className='formulario__imgColeccion'
										src={previaBanner.url}
										autoPlay
										muted
										loop
									/>
								) : (
									<img
										className='formulario__imgColeccion'
										src={previaBanner.url}
										alt='banner'
									/>
								))}

							<span className='formulario__subir'>
								Subir Banner
								<CloudArrowDownIcon />
							</span>

							<input
								type='file'
								accept='video/mp4,image/png,image/jpeg,image/webp,image/avif'
								onChange={handleVideo}
								id='video'
								className='formulario__file'
							/>
						</label>

						<p className='formulario__formatos'>
							El banner puede ser imagen o video de peso máximo de 10Mb
						</p>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='encabezado'>Encabezado</label>
						<input
							type='text'
							id='encabezado'
							name='encabezado'
							value={campos.encabezado}
							onChange={handleChange}
							placeholder='Escriba el nombre de la colección'
						/>
					</div>
					<div className='fomulario__item'>
						<label htmlFor='descripcion'>Descripción</label>
						<textarea
							id='descripcion'
							name='descripcion'
							value={campos.descripcion}
							onChange={handleChange}
							placeholder='Escriba el nombre de la colección'
						/>
					</div>
				</div>

				<div>
					{(coleccion?.nombre !== campos.nombre.trim() ||
						coleccion?.banner?.encabezado !== campos.encabezado.trim() ||
						coleccion?.banner?.descripcion !== campos.descripcion.trim()) && (
						<ButtonLoad type='submit' estado={cargando}>
							{cargando
								? coleccion?.nombre
									? 'Guardando...'
									: 'Verificando...'
								: coleccion?.nombre
								? 'Guardar Cambios'
								: 'Crear Colección'}
						</ButtonLoad>
					)}
				</div>
			</div>
		</form>
	);
};

export default FormularioColeccion;
