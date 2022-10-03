import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import getConfirmarCuenta from '../../api/getConfirmarCuenta';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import '../../styles/Formulario.css';

const ConfirmarCuenta = () => {
	// Estados
	const [confirmado, setConfirmado] = useState(false);
	const [cargando, setCargando] = useState(true);

	// useParams
	const { token } = useParams();

	// useNavigate
	const navigate = useNavigate();

	// Estado de confirmacion de cuenta
	useEffect(() => {
		(async () => {
			try {
				setCargando(true);
				await getConfirmarCuenta({ token });
				setConfirmado(true);
			} catch (error) {
				setConfirmado(false);
				console.log(error?.response?.data?.msg);
				// Si el token es invalido o expiro redireccionar a la pagina de inicio
				setTimeout(() => {
					navigate('/');
				}, 5000);
			}
			setCargando(false);
		})();
		setConfirmado(false);
	}, []);
	return (
		<>
			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<span>Inicio</span>
						<ChevronRightIcon />
						<span>Confirmar</span>
						<ChevronRightIcon />
						<span className='active'>Confirmar Cuenta</span>
					</div>
				</div>
			</div>

			<div className='contenedor'>
				{cargando ? (
					<div className='p-5'>
						<div className='spinner'>
							<div className='bounce1'></div>
							<div className='bounce2'></div>
							<div className='bounce3'></div>
						</div>
						<h2 className='center mt-3'>Veficicando...</h2>
					</div>
				) : (
					<section className='formulario border mb-2'>
						<div className='formulario__form'>
							{confirmado ? (
								<>
									<h1 className='fomulario__titulo'>Confirmación</h1>
									<div className='mb-3'>
										<h2 className='mb-1'>Tu cuenta a sido Confirmada</h2>
										<p className='formulario__texto'>
											Hola gracias por registrate, ya puedes realizar pedidos y
											muchas cosas mas, comienza ahora.
										</p>
									</div>
								</>
							) : (
								<>
									<h1 className='fomulario__titulo'>Fallo de confirmación</h1>
									<div className='mb-3'>
										<h2 className='mb-1'>Su cuenta no a sido confirmada</h2>
										<p className='formulario__texto mb-4'>
											Hola hubo un error al confirmar su cuenta, Puede ser por
											que el token no es válido o ya halla expirado.
										</p>
										<h2 className='formulario__texto sky'>
											Rediriéndote a la página de inicio...
										</h2>
									</div>
								</>
							)}

							<div className='formulario__botones'>
								<Link to={'/cuenta/iniciar-sesion'} className='boton'>
									Iniciar Sesión
								</Link>

								<Link to={'/'} className='boton'>
									Ir a Inicio
								</Link>
							</div>
						</div>
					</section>
				)}
			</div>
		</>
	);
};

export default ConfirmarCuenta;
