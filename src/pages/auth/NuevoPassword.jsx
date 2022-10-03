import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Password from '../../components/Password';
import postNuevoPassword from '../../api/postNuevoPassword';
import ButtonLoad from '../../components/Botones/ButtonLoad';
import getComprobarToken from '../../api/getComprobarToken';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import '../../styles/Formulario.css';

const NuevoPassword = () => {
	// Estados
	const [campos, setCampos] = useState({
		password: '',
		password2: '',
	});
	const [cargando, setCargando] = useState(false);
	const [cargandoToken, setCargandoToken] = useState(true);
	const [tokenValido, setTokenValido] = useState(false);

	// useParams
	const { token } = useParams();

	// useNavigate
	const navigate = useNavigate();

	// Efecto para comprobar el token y si es valido permitir cambiar la contraseña
	useEffect(() => {
		(async () => {
			try {
				setCargandoToken(true);
				await getComprobarToken({ token });
				setTokenValido(true);
			} catch (error) {
				console.log(error?.response?.data?.msg);
				setTokenValido(false);
				// Si el token es invalido o expiro redireccionar a la pagina de inicio
				setTimeout(() => {
					navigate('/');
				}, 5000);
			}
			setCargandoToken(false);
		})();
	}, []);

	// Llenar campos
	const handleChange = e => {
		const { value, name } = e.target;
		setCampos({ ...campos, [name]: value });
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		// Validar campos
		if (campos.password.trim() === '' || campos.password2.trim() === '') {
			Swal.fire({
				title: 'Password requeridos',
				text: 'Todos los campos son obligatorios',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}
		// Password no son iguales
		if (campos.password !== campos.password2) {
			Swal.fire({
				title: 'Password no son iguales',
				text: 'Los password deben ser iguales',
				icon: 'info',
				confirmButtonText: 'Ententido',
			});
			return;
		}

		// Enviar datos
		try {
			setCargando(true);
			const { data } = await postNuevoPassword({
				token,
				password: campos.password,
			});
			// Limpiar campos
			setCampos({
				password: '',
				password2: '',
			});
			// Mostrar mensaje
			Swal.fire({
				title: 'Password cambiado',
				text: data?.msg,
				icon: 'success',
				confirmButtonText: 'Ententido',
			});
			// Redireccionar
			navigate('/cuenta/iniciar-sesion');
		} catch (error) {
			const e = error?.response?.data?.msg;
			Swal.fire({
				title: 'Fallo al cambiar el password',
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
						<span>Inicio</span>
						<ChevronRightIcon />
						<span>Recuperación</span>
						<ChevronRightIcon />
						<span className='active'>Password</span>
					</div>
				</div>
			</div>

			{cargandoToken ? (
				<div className='p-5'>
					<div className='spinner'>
						<div className='bounce1'></div>
						<div className='bounce2'></div>
						<div className='bounce3'></div>
					</div>
					<h2 className='center mt-3'>Veficicando...</h2>
				</div>
			) : tokenValido ? (
				<section className='formulario border mb-2'>
					<form className='formulario__form' onSubmit={handleSubmit}>
						<legend className='fomulario__titulo'>
							Restablece tu Password
						</legend>
						<div className='mb-3'>
							<h2 className='mb-1'>
								Hola hemos recibido tu solicitud para restablecer tu password
							</h2>
							<p className='formulario__texto'>
								Introduce tu nuevo password y no olvides calificarnos, Gracias.
							</p>
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
							<label htmlFor='password2'>Repita su Password</label>
							<Password
								id='password2'
								name='password2'
								value={campos.password2}
								onChange={handleChange}
								placeholder='Repita su Password'
							/>
						</div>

						<ButtonLoad type='submit' estado={cargando} disabled={cargando}>
							{cargando ? 'Restableciendo...' : 'Restablecer'}
						</ButtonLoad>
					</form>
				</section>
			) : (
				<section className='formulario border mb-2'>
					<div className='formulario__form'>
						<>
							<h1 className='fomulario__titulo'>Fallo de recuperación</h1>
							<div className='mb-3'>
								<h2 className='mb-1'>Lo sentimos el token no es valido</h2>
								<p className='formulario__texto mb-4'>
									Hola hubo un error al recuperar su cuenta, Puede ser por que
									el token no es válido o ya halla expirado.
								</p>
								<h2 className='formulario__texto sky'>
									Rediriéndote a la página de inicio...
								</h2>
							</div>

							<div className='formulario__botones'>
								<Link to={'/cuenta/iniciar-sesion'} className='boton'>
									Iniciar Sesión
								</Link>

								<Link to={'/'} className='boton'>
									Ir a Inicio
								</Link>
							</div>
						</>
					</div>
				</section>
			)}
		</>
	);
};

export default NuevoPassword;
