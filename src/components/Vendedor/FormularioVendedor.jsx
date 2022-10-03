/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import putConvertirVendedor from '../../api/putConvertirVendedor';
import ButtonLoad from '../Botones/ButtonLoad';
import useAuth from '../../hooks/useAuth';
import putActualizarVendedor from '../../api/putActualizarVendedor';
import { PAISES, ROLES_ACCESO } from '../../constants';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';

const FormularioVendedor = ({ terminos }) => {
	// Estados
	const [imagen, setImagen] = useState('/svg/usuario_default.svg');
	const [campos, setCampos] = useState({
		nombreEmpresa: '',
		descripcionEmpresa: '',
		imagenEmpresa: '',
		direccionEmpresa: '',
		paisEmpresa: '',
		ciudadEmpresa: '',
		codigoPostalEmpresa: '',
	});
	const [cargando, setCargando] = useState(false);

	// useAuth
	const { usuario, setUsuario } = useAuth();

	// useNavigate
	const navigate = useNavigate();

	// Efecto de actualizar empresa
	useEffect(() => {
		if (
			usuario?.rol === 'empresa' ||
			usuario?.rol === 'admin' ||
			usuario?.empresa
		) {
			setCampos({
				nombreEmpresa: usuario?.empresa?.nombre,
				descripcionEmpresa: usuario?.empresa?.descripcion,
				direccionEmpresa: usuario?.empresa?.direccion,
				paisEmpresa: usuario?.empresa?.pais,
				ciudadEmpresa: usuario?.empresa?.ciudad,
				codigoPostalEmpresa: usuario?.empresa?.codigoPostal,
				imagenEmpresa: usuario.empresa?.imagen?.secure_url,
			});
			setImagen(usuario.empresa?.imagen?.secure_url);
		}
	}, [usuario]);

	// Handle change
	const handleChange = e => {
		const { name, value } = e.target;
		setCampos({
			...campos,
			[name]: value,
		});
	};

	// Handle imagen
	const handleImagen = e => {
		const img = e.target.files[0];
		if (img) {
			const url = URL.createObjectURL(img);
			setImagen(url);
			setCampos({
				...campos,
				imagenEmpresa: img,
			});
		}
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		if (Object.values(campos).includes('')) {
			Swal.fire({
				title: 'Todo los campos son obligatorios incluida la imagen',
				text: 'Debes ingresar todos los campos para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// El nombre de la empresa no puede tener menos de 5 caracteres y mas de 36
		if (campos.nombreEmpresa.length < 5 || campos.nombreEmpresa.length > 36) {
			Swal.fire({
				title: 'El nombre de la empresa debe tener entre 5 y 36 caracteres',
				text: 'Debes ingresar un nombre de empresa valido para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Validad el codigo postal que sean solo numeros
		if (!/^[0-9]+$/.test(campos.codigoPostalEmpresa)) {
			Swal.fire({
				title: 'El codigo postal debe ser un numero',
				text: 'Debes ingresar un codigo postal valido para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Validad el codigo postal que tenga minimo 5 digitos y maximo 10
		if (
			campos.codigoPostalEmpresa.length < 5 ||
			campos.codigoPostalEmpresa.length > 10
		) {
			Swal.fire({
				title: 'El codigo postal debe tener entre 5 y 10 digitos',
				text: 'Debes ingresar un codigo postal valido para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// La descripcion es mayor a 360 caracteres
		if (campos.descripcionEmpresa.length > 360) {
			Swal.fire({
				title: 'La descripcion excedió el limite',
				text: 'Debes ingresar maximo 360 caracteres.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Si los terminos no estan aceptados o el usuario no es el rol de empresa o admin
		if (!terminos && !ROLES_ACCESO.includes(usuario?.rol)) {
			Swal.fire({
				title: 'Acepta los terminos y condiciones',
				text: 'Debes aceptar los terminos y condiciones para continuar.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Si la imagen esta vacia
		if (!campos.imagenEmpresa) {
			Swal.fire({
				title: 'La imagen es requeridad',
				text: 'Por favor sube una imagen para tu empresa.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Realizar la peticion
		try {
			setCargando(true);
			const formData = new FormData();
			formData.append('nombreEmpresa', campos.nombreEmpresa);
			formData.append('descripcionEmpresa', campos.descripcionEmpresa);
			formData.append('direccionEmpresa', campos.direccionEmpresa);
			formData.append('paisEmpresa', campos.paisEmpresa);
			formData.append('ciudadEmpresa', campos.ciudadEmpresa);
			formData.append('codigoPostalEmpresa', campos.codigoPostalEmpresa);

			// Solucinando bug de subir imagen
			if (
				!ROLES_ACCESO.includes(usuario?.rol) ||
				!usuario?.empresa?.imagen?.secure_url ||
				campos.imagenEmpresa !== usuario?.empresa?.imagen?.secure_url
			) {
				formData.append('file', campos.imagenEmpresa);
			} else {
				// Crear un binario con la url de la imagen para poderla envia en el form data
				const binario = await fetch(campos.imagenEmpresa);
				await binario.blob().then(blobFile => {
					formData.append('file', blobFile);
				});
			}

			if (ROLES_ACCESO.includes(usuario?.rol)) {
				const { data } = await putActualizarVendedor(formData);
				setUsuario(data);
				// Mostrar mensaje
				Swal.fire({
					title: 'Empresa actualizada',
					text: 'La empresa se actualizo correctamente.',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			} else {
				const { data } = await putConvertirVendedor(formData);
				setUsuario(data);
				// Mostrar mensaje
				Swal.fire({
					title: 'Felicidades',
					text: 'Felicidades ya forma parte del equipo de ventas.',
					icon: 'success',
					confirmButtonText: 'Entendido',
				});
			}

			if (!ROLES_ACCESO.includes(usuario?.rol)) {
				// limpiar campos
				setCampos({
					nombreEmpresa: '',
					descripcionEmpresa: '',
					imagenEmpresa: '',
					direccionEmpresa: '',
					paisEmpresa: '',
					ciudadEmpresa: '',
					codigoPostalEmpresa: '',
				});
				setImagen('/svg/usuario_default.svg');
				// Redireccionar
				navigate('/empresa/crear-producto');
			}
		} catch (error) {
			const e = error?.response?.data?.msg;
			Swal.fire({
				title: 'Ups algo salio mal',
				text: e,
				icon: 'error',
				confirmButtonText: 'Cerrar',
			});
			console.log(e);
		}
		setCargando(false);
	};

	return (
		<form
			className='p-3 contenedor'
			onSubmit={handleSubmit}
			accept='image/png,image/jpeg,image/webp,image/avif'
			encType='multipart/form-data'
		>
			<legend className={`center mb-5 fomulario__titulo`}>
				{ROLES_ACCESO.includes(usuario?.rol)
					? 'Actualiza los datos de tu empresa'
					: 'Completa los datos de tu empresa'}
			</legend>
			<div className='formulario__grid--3'>
				<div className='formulario__usuarioImagen'>
					<label htmlFor='imagen'>
						<img src={imagen} alt='usuario' width={100} height={100} />
						<input
							type='file'
							name='imagen'
							accept='image/png,image/jpeg,image/webp,image/avif'
							onChange={handleImagen}
							id='imagen'
						/>
						<span>
							Subir Imagen
							<CloudArrowDownIcon />
						</span>
					</label>

					<div>
						<p>JPG, PNG, WEBP o AVIF. Peso máximo de 1Mb</p>
					</div>
				</div>
				<div>
					<div className='fomulario__item'>
						<label htmlFor='nombreEmpresa'>Nombre de la empresa</label>
						<input
							type='text'
							id='nombreEmpresa'
							name='nombreEmpresa'
							value={campos.nombreEmpresa}
							onChange={handleChange}
							placeholder='Escriba el nombre para su empresa'
						/>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='descripcionEmpresa'>
							Descripción de la empresa
						</label>
						<textarea
							id='descripcionEmpresa'
							name='descripcionEmpresa'
							value={campos.descripcionEmpresa}
							onChange={handleChange}
							placeholder='Escriba una descripcion para su empresa'
						/>
					</div>

					<div className='formulario__grid'>
						<div className='fomulario__item'>
							<label htmlFor='direccionEmpresa'>Dirección de la empresa</label>
							<input
								type='text'
								id='direccionEmpresa'
								name='direccionEmpresa'
								value={campos.direccionEmpresa}
								onChange={handleChange}
								placeholder='Escriba la dirección de su empresa'
							/>
						</div>

						<div className='fomulario__item'>
							<label htmlFor='paisEmpresa'>Pais</label>

							<select
								id='paisEmpresa'
								name='paisEmpresa'
								value={campos.paisEmpresa}
								onChange={handleChange}
							>
								{PAISES.map(({ pais }) => (
									<option key={pais} value={pais}>
										{pais}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='formulario__grid'>
						<div className='fomulario__item'>
							<label htmlFor='ciudadEmpresa'>Ciudad</label>
							<input
								type='text'
								id='ciudadEmpresa'
								name='ciudadEmpresa'
								value={campos.ciudadEmpresa}
								onChange={handleChange}
								placeholder='Escriba la ciudad de su empresa'
							/>
						</div>

						<div className='fomulario__item'>
							<label htmlFor='codigoPostalEmpresa'>Codigo Postal</label>
							<input
								type='text'
								id='codigoPostalEmpresa'
								name='codigoPostalEmpresa'
								value={campos.codigoPostalEmpresa}
								onChange={handleChange}
								placeholder='Codigo Postal ejem: 20000'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='cuenta__botonesForm'>
				<ButtonLoad
					type='submit'
					title='Convertirme en vendedor'
					estado={cargando}
				>
					{cargando
						? ROLES_ACCESO.includes(usuario?.rol)
							? 'Guardando...'
							: 'Verificando...'
						: ROLES_ACCESO.includes(usuario?.rol)
						? 'Guardar Cambios'
						: 'Convertirme en vendedor'}
				</ButtonLoad>
				{!ROLES_ACCESO.includes(usuario?.rol) && (
					<Link
						to={'/cuenta'}
						className='boton--white'
						type='button'
						title='Volver'
					>
						Volver
					</Link>
				)}
			</div>
		</form>
	);
};

FormularioVendedor.defaultProps = {
	terminos: false,
};

export default FormularioVendedor;
