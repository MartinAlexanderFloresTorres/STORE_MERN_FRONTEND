import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import useAuth from '../../hooks/useAuth';
import ButtonLoad from '../../components/Botones/ButtonLoad';
import Swal from 'sweetalert2';
import postOlvidePassword from '../../api/postOlvidePassword';
import '../../styles/Formulario.css';

const OlvidePassword = () => {
	// Estados
	const [email, setEmail] = useState('');
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

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		// Validar campos
		if (email.trim() === '') {
			Swal.fire({
				title: 'Email requerido',
				text: 'El email es obligatorio, por favor ingrese un email valido para poder recuperar su contraseña.',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}
		// Enviar datos
		try {
			setCargando(true);
			const { data } = await postOlvidePassword({ email });

			// limpiar campos
			setEmail('');

			// Mostrar mensaje
			Swal.fire({
				title: 'Email enviado',
				text: data?.msg,
				icon: 'success',
				confirmButtonText: 'Ententido',
			});

			// Redireccionar a login
			navigate('/cuenta/iniciar-sesion');
		} catch (error) {
			const e = error?.response?.data?.msg;
			Swal.fire({
				title: 'Fallo al enviar el email',
				text: e,
				icon: 'error',
				confirmButtonText: 'Ententido',
			});
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
						<Link to={auth ? '/cuenta' : '/cuenta/olvide-password'}>
							Cuenta
						</Link>
						<ChevronRightIcon />
						<span className='active'>Olvide Password</span>
					</div>
				</div>
			</div>

			<section className='formulario border mb-2'>
				<form className='formulario__form' onSubmit={handleSubmit}>
					<legend className='fomulario__titulo'>Recuperación</legend>
					<div className='mb-3'>
						<h2 className='mb-1'>
							¡No te preocupes! Restablezcamos su contraseña.
						</h2>
						<p className='formulario__texto'>
							Introduce tu dirección de correo electrónico y te enviaremos las
							instrucciones para restablecer la contraseña. Gracias.
						</p>
					</div>
					<div className='fomulario__item mb-2'>
						<label htmlFor='email'>Correo Electrónico</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value.trim())}
							placeholder='Escriba su correo'
						/>
					</div>

					<ButtonLoad type='submit' estado={cargando} disabled={cargando}>
						{cargando ? 'Verificando...' : 'Enviar instrucciones'}
					</ButtonLoad>

					<div className='formulario__bottom'>
						<div>
							<span>¿Ya tiene una cuenta? </span>
							<Link to={'/cuenta/iniciar-sesion'}>Iniciar Sesión</Link>
						</div>

						<Link to={'/cuenta/crear-cuenta'}>Crear Cuenta</Link>
					</div>
				</form>
			</section>
		</>
	);
};

export default OlvidePassword;
