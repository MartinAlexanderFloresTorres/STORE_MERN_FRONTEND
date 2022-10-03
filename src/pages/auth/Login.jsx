import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Password from '../../components/Password';
import Swal from 'sweetalert2';
import '../../styles/Formulario.css';
import getLogin from '../../api/getLogin';
import ButtonLoad from '../../components/Botones/ButtonLoad';
import useAuth from '../../hooks/useAuth';

const Login = () => {
	// Estados
	const [campos, setCampos] = useState({
		email: '',
		password: '',
	});
	const [cargando, setCargando] = useState(false);

	// useAuth
	const { setUsuario, autenticado } = useAuth();

	// autenticado¡
	const auth = autenticado();

	// si ya esta autenticado lo redirecciona a la pagina de inicio
	if (auth) {
		return <Navigate to='/' />;
	}

	// useLocation
	const { state } = useLocation();

	// useNavigate
	const navigate = useNavigate();

	// Llenar campos
	const handleChange = e => {
		const { value, name } = e.target;
		setCampos({ ...campos, [name]: value });
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		// Validar campos
		if (campos.email.trim() === '' || campos.password.trim() === '') {
			Swal.fire({
				title: 'Email y Password requeridos',
				text: 'Todos los campos son obligatorios',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}
		// Enviar datos
		try {
			setCargando(true);
			const { data } = await getLogin(campos);
			// Limpiar campos
			setCampos({
				email: '',
				password: '',
			});
			// Guardar el token en el localStorage
			localStorage.setItem('token-ecommerce', data.token);
			// Guardar el genero el el localStorage
			localStorage.setItem('genero-ecommerce', data?.genero);

			// Guardar el usuario en el context
			setUsuario(data);

			// Redireccionar
			if (state) {
				navigate(state?.pathname || '/');
			} else {
				navigate('/');
			}
			// Mostrar mensaje
			Swal.fire({
				title: 'Bienvenido',
				text: 'Has iniciado sesión correctamente',
				icon: 'success',
				confirmButtonText: 'Cerrar',
			});
		} catch (error) {
			const e = error?.response?.data?.msg;
			Swal.fire({
				title: 'Autenticación fallida',
				text: e,
				icon: 'error',
				confirmButtonText: 'Ententido',
			});
			localStorage.removeItem('token-ecommerce');
			console.log(e);
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
						<Link to={auth ? '/cuenta' : '/cuenta/iniciar-sesion'}>Cuenta</Link>
						<ChevronRightIcon />
						<span className='active'>Iniciar Sesión</span>
					</div>
				</div>
			</div>

			<section className='formulario border mb-2'>
				<form className='formulario__form' onSubmit={handleSubmit}>
					<legend className='fomulario__titulo'>Iniciar Sesión</legend>

					<div className='fomulario__item'>
						<label htmlFor='email'>Correo Electrónico</label>
						<input
							type='email'
							name='email'
							value={campos.email}
							onChange={handleChange}
							id='email'
							placeholder='Escriba su correo'
						/>
					</div>

					<div className='fomulario__item mb-2'>
						<label htmlFor='password'>Password</label>
						<Password
							id='password'
							name='password'
							value={campos.password}
							onChange={handleChange}
							placeholder='Ingrese un Password'
						/>
					</div>

					<ButtonLoad type='submit' estado={cargando} disabled={cargando}>
						{cargando ? 'Autenticando...' : 'Iniciar Sesión'}
					</ButtonLoad>

					<div className='formulario__bottom'>
						<div>
							<span>¿No tienes una cuenta? </span>
							<Link to={'/cuenta/crear-cuenta'}>Registrate</Link>
						</div>
						<Link to={'/cuenta/olvide-password'}>Olvide mi Password</Link>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
