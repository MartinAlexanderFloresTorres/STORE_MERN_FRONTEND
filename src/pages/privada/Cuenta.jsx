import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Desplegable from '../../components/Desplegables/Desplegable';
import Modal from '../../components/Modales/Modal';
import ButtonLoad from '../../components/Botones/ButtonLoad';
import Password from '../../components/Password';
import useAuth from '../../hooks/useAuth';
import putActualizarPerfil from '../../api/putActuzalizarPerfil';
import deleteCuenta from '../../api/deleteCuenta';
import { fomatearFecha } from '../../helpers';
import { GENEROS } from '../../constants';
import { CloudArrowDownIcon } from '@heroicons/react/24/outline';
import putActualizarPassword from '../../api/putActualizarPassword';
import { toast } from 'react-toastify';
import './../../styles/Cuenta.css';

const Cuenta = () => {
	// Estados
	const [modal, setModal] = useState(false);
	const [modalDelete, setModalDelete] = useState(false);
	const [confirmar, setConfirmar] = useState(false);
	const [modalPassword, setModalPassword] = useState(false);
	const [campos, setCampos] = useState({
		nombre: '',
		apellidos: '',
		email: '',
		fechaNacimiento: '',
		genero: '',
		repetirPassword: '',
		telefono: '',
		imagen: '',
	});
	const [imagen, setImagen] = useState('');
	const [passwords, setPasswords] = useState({
		passwordActual: '',
		passwordNuevo: '',
		passwordConfirmar: '',
	});
	const [cargando, setCargando] = useState(false);
	const [cargandoDelete, setCargandoDelete] = useState(false);
	const [cargandoPassword, setCargandoPassword] = useState(false);

	// Auth
	const { tema, usuario, setUsuario } = useAuth();

	// Efecto para cargar los datos del usuario
	useEffect(() => {
		if (usuario) {
			setCampos({
				nombre: usuario?.nombre,
				apellidos: usuario?.apellidos,
				email: usuario?.email,
				fechaNacimiento: usuario?.fechaNacimiento?.split('T')[0],
				genero: usuario?.genero,
				telefono: usuario?.telefono || '',
				imagen: usuario?.imagen?.secure_url || '',
			});
			setImagen(usuario?.imagen?.secure_url);
		}
	}, [usuario]);

	// Efecto para desmarcar el checkbox de confirmar
	useEffect(() => {
		setConfirmar(false);
	}, [modalDelete]);

	// Efecto de limpiar los campos de password
	useEffect(() => {
		setPasswords({
			passwordActual: '',
			passwordNuevo: '',
			passwordConfirmar: '',
		});
	}, [modalPassword]);

	// Cambiar el fondo del modal
	const bg = tema === 'dark' ? 'rgba(0,0,0, 0.9)' : 'rgba(0,0,0, 0.5)';

	// handle Change
	const handleChange = e => {
		const { name, value } = e.target;
		setCampos({ ...campos, [name]: value.trimStart() });
	};

	// handle Change Password
	const handleChangePassword = e => {
		const { name, value } = e.target;
		setPasswords({ ...passwords, [name]: value.trim() });
	};

	// handle imagen
	const handleImagen = e => {
		const { name, files } = e.target;
		if (files[0]) {
			const url = URL.createObjectURL(files[0]);
			setCampos({ ...campos, [name]: files[0] });
			setImagen(url);
		}
	};

	// handle submit
	const handleSubmit = async e => {
		e.preventDefault();

		// Validar campos
		if (
			campos.nombre === '' ||
			campos.apellidos === '' ||
			campos.email === '' ||
			campos.fechaNacimiento === '' ||
			campos.genero === ''
		) {
			Swal.fire({
				title: 'Campos requeridos',
				text: 'Todos los campos son obligatorios excepto la imagen y el telefono.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}

		// Nombre tiene que se menor a 20 caracteres y mayor a 3
		if (campos.nombre.trim().length < 3 || campos.nombre.trim().length > 20) {
			Swal.fire({
				title: 'Nombre',
				text: 'El nombre debe tener al menos 3 caracteres y no mas de 20',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Apellidos tiene que se menor a 20 caracteres y mayor a 3
		if (
			campos.apellidos.trim().length < 3 ||
			campos.apellidos.trim().length > 20
		) {
			Swal.fire({
				title: 'Apellidos',
				text: 'Los apellidos deben tener al menos 3 caracteres y no mas de 20',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Email tiene que ser un email valido
		const emailValido = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!emailValido.test(campos.email)) {
			Swal.fire({
				title: 'Email',
				text: 'El email no es valido',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// El año de nacimiento tiene que ser menor a 2008
		const fecha = new Date(campos.fechaNacimiento);
		const fechaActual = new Date();
		if (fecha.getFullYear() > fechaActual.getFullYear() - 14) {
			Swal.fire({
				title: 'Fecha de nacimiento',
				text: 'Debes ser mayor de 14 años para poder crear una cuenta',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Realizar la petición
		const formData = new FormData();
		formData.append('nombre', campos.nombre);
		formData.append('apellidos', campos.apellidos);
		formData.append('email', campos.email);
		formData.append('fechaNacimiento', campos.fechaNacimiento);
		formData.append('genero', campos.genero);
		formData.append('telefono', campos.telefono);
		formData.append('file', campos.imagen);

		try {
			setCargando(true);
			const { data } = await putActualizarPerfil(formData);
			// Actualizar el usuario
			setUsuario(data);
			// Guardar el genero el el localStorage
			localStorage.setItem('genero-ecommerce', data?.genero);
			// Mostrar mensaje
			toast('Perfil Actualizado', { type: 'success' });
			// Cerrar el modal
			setModal(false);
		} catch (error) {
			const e = error?.response?.data?.msg;
			console.log(e);
			// Mostrar mensaje de error
			toast('Fallo al actualizar', { type: 'error' });
		}
		setCargando(false);
	};

	// handle submit password
	const handleSubmitPassword = async e => {
		e.preventDefault();

		// Validar campos
		if (Object.values(passwords).includes('')) {
			Swal.fire({
				title: 'Campos requeridos',
				text: 'Todos los campos son obligatorios.',
				icon: 'info',
				confirmButtonText: 'Entendido',
			});
			return;
		}
		// Password tiene que ser mayor a 6 caracteres
		if (
			passwords.passwordNuevo.length < 6 ||
			passwords.passwordConfirmar.length < 6
		) {
			Swal.fire({
				title: 'Password',
				text: 'El password debe tener al menos 6 caracteres',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Password tiene que ser igual a la confirmación
		if (passwords.passwordNuevo !== passwords.passwordConfirmar) {
			Swal.fire({
				title: 'Password',
				text: 'Las contraseñas no coinciden',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Realizar la petición
		try {
			setCargandoPassword(true);
			await putActualizarPassword({
				password: passwords.passwordActual,
				passwordNuevo: passwords.passwordNuevo,
				passwordConfirmar: passwords.passwordConfirmar,
			});
			// Limpiar campos
			setPasswords({
				passwordActual: '',
				passwordNuevo: '',
				passwordConfirmar: '',
			});
			// Mostrar mensaje
			toast('Contraseña Actualizada correctamente', { type: 'success' });
			// Cerrar el modal
			setModalPassword(false);
		} catch (error) {
			const e = error?.response?.data?.msg;
			// Mostrar mensaje de error
			toast(e, { type: 'error' });
			console.log(e);
		}
		setCargandoPassword(false);
	};

	// Handle Eliminar cuenta
	const handleEliminarCuenta = async () => {
		// Validar
		if (!confirmar) {
			Swal.fire({
				title: 'Confirma la eliminación',
				text: 'Debes confirmar que quieres eliminar tu cuenta',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Mostrar mensaje de confirmación
		const { value } = await Swal.fire({
			title: '¿Estas seguro?',
			text: 'No podras recuperar tu cuenta',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'Cancelar',
		});

		if (value) {
			// Eliminar cuenta
			try {
				setCargandoDelete(true);
				setModalDelete(false);
				await deleteCuenta({ id: usuario._id });
				// Eliminar el token
				localStorage.removeItem('token-ecommerce');
				// Eliminar el carrito
				localStorage.removeItem('carrito-ecommerce');
				// Eliminar los favoritos
				localStorage.removeItem('favoritos-ecommerce');
				// Eliminar el usuario
				setUsuario({});
				// Mostrar mensaje
				toast('Cuenta eliminada', { type: 'success' });
			} catch (error) {
				// Mostrar mensaje de error
				const e = error?.response?.data?.msg;
				console.log(e);
				toast(e, { type: 'error' });
			}
			setCargandoDelete(false);
		}
	};
	return (
		<section className='cuenta'>
			<div>
				<div className='py-2'>
					<h2 className='titulo'>Configuración de la cuenta</h2>
					<p className='texto'>
						Edite la información que utilizó para configurar su cuenta de Store.
					</p>
				</div>
				<Desplegable titulo='Información de cuenta' active={true}>
					<div>
						<div>
							<div className='cuenta__item'>
								<button
									title='Imagen del usuario'
									onClick={() => setModal(true)}
								>
									<img
										className='cuenta__imagen'
										src={usuario?.imagen?.secure_url}
										alt='usuario'
									/>
								</button>
								<div className='cuenta__item'>
									<h5>Nombre</h5>
									<p>{usuario?.nombre}</p>
								</div>
							</div>
							<div className='cuenta__item'>
								<h5>Apellidos</h5>
								<p>{usuario?.apellidos}</p>
							</div>
							<div className='cuenta__item'>
								<h5>Correo electrónico</h5>
								<p>
									<a className='sky' href={`mailtro:${usuario?.email}`}>
										{usuario?.email}
									</a>
								</p>
							</div>
							<div className='cuenta__item'>
								<h5>Telefono</h5>
								<p>{usuario?.telefono || 'Ninguno'}</p>
							</div>
							<div className='cuenta__item'>
								<h5>Fecha de nacimiento</h5>
								<p>{fomatearFecha(usuario?.fechaNacimiento)}</p>
							</div>
							<div className='cuenta__item'>
								<h5>Genero</h5>
								<p>{usuario?.genero}</p>
							</div>
						</div>
						<div className='cuenta__botones'>
							<button
								className='boton--black px-3'
								onClick={() => setModal(!modal)}
								title='Editar'
							>
								Editar
							</button>
							{usuario?.rol === 'usuario' && (
								<button
									className='cuenta__eliminar'
									onClick={() => setModalDelete(!modalDelete)}
									title='Eliminar Cuenta'
								>
									Eliminar Cuenta
								</button>
							)}
						</div>
					</div>
				</Desplegable>

				<Desplegable titulo='Contraseña' active={true}>
					<div className='cuenta__contraseña'>
						<h5>••••••••</h5>
						<button
							onClick={() => setModalPassword(!modalPassword)}
							title='Editar'
						>
							Editar
						</button>
					</div>
				</Desplegable>
			</div>

			<Modal
				estado={modalDelete}
				setEstado={setModalDelete}
				radius='5px'
				container='900px'
				bg={bg}
			>
				<div className='padding-50'>
					<div className='cuenta__confirmacionEliminacion__top'>
						<h2>¿Seguro que quieres eliminar la cuenta?</h2>
						<p>Es una acción que no podrás deshacer.</p>
					</div>
					<div className='cuenta__confirmacionEliminacion__grid'>
						<div>
							<h2>Con una cuenta de store, consigues:</h2>
							<ul>
								<li>Compra más rápida</li>
								<li>Envíos y devoluciones gratuitos</li>
								<li>Una experiencia de compra más personalizada</li>
								<li>Notificaciones tempranas sobre ofertas</li>
								<li>especiales y lanzamientos</li>
							</ul>
							<p>Requiere registrarse con el correo electrónico.</p>
						</div>

						<div>
							<h2>Cuando eliminas tu cuenta:</h2>
							<ul>
								<li>Ya no tendrás acceso a tus preferencias de store</li>
								<li>Perderás tus favoritos guardados</li>
								<li>
									La información relacionada con cualquiera de sus pedidos no se
									eliminará para el cumplimiento de las obligaciones legales y
									estará disponible poniéndose en contacto con el servicio de
									atención al cliente.
								</li>
								<li>
									La información publicada en las redes sociales u otras
									plataformas fuera de store no se verá afectada.
								</li>
							</ul>
							<div className='cuenta__confirmacionEliminacion__aceptar'>
								<input
									type='checkbox'
									id='aceptar'
									checked={confirmar}
									onChange={() => setConfirmar(!confirmar)}
								/>
								<label htmlFor='aceptar'>Sí, quiero eliminar mi cuenta</label>
							</div>
						</div>
					</div>

					<div className='cuenta__botonesForm'>
						<ButtonLoad
							type='button'
							title='Confirmar Eliminación'
							onClick={handleEliminarCuenta}
							estado={cargandoDelete}
						>
							{cargandoDelete ? 'Eliminando...' : 'Confirmar Eliminación'}
						</ButtonLoad>
						<button
							className='boton--white uppercase'
							type='button'
							title='Cancelar'
							onClick={() => setModalDelete(!modalDelete)}
						>
							Cancelar
						</button>
					</div>
				</div>
			</Modal>

			<Modal estado={modal} setEstado={setModal} radius='5px' bg={bg}>
				<form
					className='padding-50'
					onSubmit={handleSubmit}
					accept='image/png,image/jpeg,image/webp,image/avif'
					encType='multipart/form-data'
				>
					<legend className='fomulario__titulo'>Actualiza tus datos</legend>
					<div className='formulario__grid'>
						<div className='formulario__usuarioImagen'>
							<label htmlFor='imagen'>
								<img src={imagen} alt='usuario' />
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
								<label htmlFor='nombre'>Nombre</label>
								<input
									type='text'
									id='nombre'
									name='nombre'
									value={campos.nombre}
									onChange={handleChange}
									placeholder='Escriba su nombre'
								/>
							</div>

							<div className='fomulario__item'>
								<label htmlFor='apellidos'>Apellido</label>
								<input
									type='text'
									id='apellidos'
									name='apellidos'
									value={campos.apellidos}
									onChange={handleChange}
									placeholder='Escriba sus apellidos'
								/>
							</div>
						</div>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='email'>Correo Electrónico</label>
						<input
							type='email'
							id='email'
							name='email'
							value={campos.email}
							onChange={handleChange}
							placeholder='Escriba su correo'
						/>
					</div>

					<div className='formulario__grid'>
						<div className='fomulario__item'>
							<label htmlFor='telefono'>Telefono</label>
							<input
								type='tel'
								id='telefono'
								name='telefono'
								value={campos.telefono}
								onChange={handleChange}
								placeholder='Escriba su telefono'
							/>
						</div>

						<div className='fomulario__item'>
							<label htmlFor='fechaNacimiento'>
								Fecha de nacimiento (DD/MM/AAAA){' '}
							</label>
							<input
								type='date'
								name='fechaNacimiento'
								value={campos.fechaNacimiento}
								onChange={handleChange}
								id='fechaNacimiento'
							/>
						</div>
					</div>

					<div className='formulario__grid'>
						<div className='fomulario__item mb-3'>
							<label htmlFor='genero'>Genero</label>
							<select
								id='genero'
								name='genero'
								value={campos.genero}
								onChange={handleChange}
							>
								{GENEROS.map(({ genero }) => (
									<option key={genero} value={genero}>
										{genero}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='cuenta__botonesForm'>
						<ButtonLoad
							type='submit'
							estado={cargando}
							disabled={cargando}
							title='Guardar Cambios'
						>
							{cargando ? 'Guardando...' : 'Guardar Cambios'}
						</ButtonLoad>
						<button
							className='boton--white uppercase'
							type='button'
							title='Cancelar'
							onClick={() => setModal(!modal)}
						>
							Cancelar
						</button>
					</div>
				</form>
			</Modal>

			<Modal
				estado={modalPassword}
				setEstado={setModalPassword}
				radius='5px'
				bg={bg}
			>
				<form className='padding-50' onSubmit={handleSubmitPassword}>
					<legend className='fomulario__titulo'>
						Crear una nueva contraseña
					</legend>
					<p className='texto mb-3'>
						Asegúrate de que tenga más de 8 caracteres y mezcla minúsculas y
						mayúsculas, números y caracteres especiales para hacerla más segura.
					</p>

					<div className='fomulario__item'>
						<label htmlFor='passwordActual'>Contraseña actual</label>
						<Password
							id='passwordActual'
							name='passwordActual'
							value={passwords.passwordActual}
							onChange={handleChangePassword}
							placeholder='Ingrese su contraseña actual'
						/>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='passwordNuevo'>Contraseña nueva</label>
						<Password
							id='passwordNuevo'
							name='passwordNuevo'
							value={passwords.passwordNuevo}
							onChange={handleChangePassword}
							placeholder='Ingrese su contaseña nueva'
						/>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='passwordConfirmar'>
							Confirmar nueva contraseña
						</label>
						<Password
							id='passwordConfirmar'
							name='passwordConfirmar'
							value={passwords.passwordConfirmar}
							onChange={handleChangePassword}
							placeholder='Confirme su contraseña'
						/>
					</div>

					<div className='cuenta__botonesForm'>
						<ButtonLoad
							type='submit'
							title='Actualizar Contraseña'
							estado={cargandoPassword}
						>
							{cargando ? 'Guardando...' : 'Actualizar Contraseña'}
						</ButtonLoad>
						<button
							className='boton--white uppercase'
							type='button'
							onClick={() => setModalPassword(!modalPassword)}
							title='Cancelar'
						>
							Cancelar
						</button>
					</div>
				</form>
			</Modal>
		</section>
	);
};

export default Cuenta;
