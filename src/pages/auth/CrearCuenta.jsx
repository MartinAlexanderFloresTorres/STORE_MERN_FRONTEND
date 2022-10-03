import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Password from '../../components/Password';
import useAuth from '../../hooks/useAuth';
import ButtonLoad from '../../components/Botones/ButtonLoad';
import Swal from 'sweetalert2';
import setCrearCuenta from '../../api/setCrearCuenta';
import '../../styles/Formulario.css';

const CrearCuenta = () => {
	// Estados
	const [campos, setCampos] = useState({
		nombre: '',
		apellidos: '',
		email: '',
		fechaNacimiento: '',
		genero: '',
		password: '',
		repetirPassword: '',
	});
	const [cargando, setCargando] = useState(false);

	// useAuth
	const { autenticado } = useAuth();

	// autenticado¡
	const auth = autenticado();

	// useNavigate
	const navigate = useNavigate();

	// si ya esta autenticado lo redirecciona a la pagina de inicio
	if (auth) {
		return <Navigate to='/' />;
	}

	// llenar los campos
	const handleChange = e => {
		const { name, value } = e.target;
		setCampos({ ...campos, [name]: value.trimStart() });
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		// Validar campos
		if (Object.values(campos).includes('')) {
			Swal.fire({
				title: 'Todos los campos son obligatorios',
				text: 'Por favor, rellena todos los campos del formulario para poder crear su cuenta.',
				icon: 'info',
				confirmButtonText: 'Ententido',
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

		// Passwords mayor a 6 caracteres
		if (campos.password.length < 6 || campos.repetirPassword.length < 6) {
			Swal.fire({
				title: 'Password muy corto',
				text: 'El password debe tener al menos 6 caracteres',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}
		// Validar password
		if (campos.password !== campos.repetirPassword) {
			Swal.fire({
				title: 'Las contraseñas no coinciden',
				text: 'Por favor, verifica que las contraseñas coincidan.',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Crear cuenta
		try {
			setCargando(true);
			const { data } = await setCrearCuenta(campos);

			// mostrar mensaje
			Swal.fire({
				title: 'Cuenta creada debes confirmar email.',
				text: data?.msg,
				icon: 'success',
				confirmButtonText: 'Ententido',
			});

			// Limpiar campos
			setCampos({
				nombre: '',
				apellidos: '',
				email: '',
				fechaNacimiento: '',
				genero: '',
				password: '',
				repetirPassword: '',
			});

			// Redireccionar a login
			navigate('/cuenta/iniciar-sesion');
		} catch (error) {
			// Si hay un error
			const e = error?.response?.data?.msg;
			Swal.fire({
				title: 'Fallo al crear cuenta',
				text: e,
				icon: 'error',
				confirmButtonText: 'Ententido',
			});
		}
		setCargando(false);
	};

	return (
		<>
			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<Link to={'/'}>Inicio</Link>
						<ChevronRightIcon />
						<Link to={auth ? '/cuenta' : '/cuenta/crear-cuenta'}>Cuenta</Link>
						<ChevronRightIcon />
						<span className='active'>Crear Cuenta</span>
					</div>
				</div>
			</div>

			<section className='formulario border mb-2'>
				<form className='formulario__form' onSubmit={handleSubmit}>
					<legend className='fomulario__titulo'>Crear Cuenta</legend>
					<div className='formulario__grid'>
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
							<label htmlFor='fechaNacimiento'>
								Fecha de nacimiento (DD/MM/AAAA){' '}
							</label>
							<input
								type='date'
								id='fechaNacimiento'
								name='fechaNacimiento'
								value={campos.fechaNacimiento}
								onChange={handleChange}
							/>
						</div>

						<div className='fomulario__item mb-3'>
							<label htmlFor='genero'>Genero</label>
							<select
								id='genero'
								name='genero'
								value={campos.genero}
								onChange={handleChange}
							>
								<option value=''>Seleccione</option>
								<option value='Hombre'>Hombre</option>
								<option value='Mujer'>Mujer</option>
								<option value='Unisex'>No especificar</option>
							</select>
						</div>
					</div>

					<div className='fomulario__item'>
						<label htmlFor='password'>Password</label>
						<Password
							id='password'
							name='password'
							value={campos.password}
							onChange={handleChange}
							placeholder='Ingrese un Password'
						/>
					</div>

					<div className='fomulario__item mb-2'>
						<label htmlFor='repetirPassword'>Repetir Contraseña</label>
						<Password
							id='repetirPassword'
							name='repetirPassword'
							value={campos.repetirPassword}
							onChange={handleChange}
							placeholder='Repita su Password'
						/>
					</div>

					<ButtonLoad type='submit' estado={cargando} disabled={cargando}>
						{cargando ? 'Creando cuenta...' : 'Crear cuenta'}
					</ButtonLoad>

					<div className='formulario__bottom'>
						<div>
							<span>¿Ya tiene una cuenta? </span>
							<Link to={'/cuenta/iniciar-sesion'}>Iniciar Sesión</Link>
						</div>
						<Link to={'/cuenta/olvide-password'}>Recuperar Password</Link>
					</div>
				</form>
			</section>
		</>
	);
};

export default CrearCuenta;
