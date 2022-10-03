import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ButtonLoad from '../../../components/Botones/ButtonLoad';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { PAISES } from '../../../constants';
import { formatearCantidad } from '../../../helpers';
import useColecciones from '../../../hooks/useColecciones';
import ProductoPasarela from '../../../components/Carrito/ProductoPasarela';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const Pago = () => {
	// Estado
	const [cargando, setCargando] = useState(false);
	const [campos, setCampos] = useState({
		nombre: '',
		apellidos: '',
		email: '',
		direccion: '',
		ciudad: '',
		pais: '',
		codigoPostal: '',
		telefono: '',
		referencia: '',
	});

	// useNavegivate
	const navitate = useNavigate();

	// useAuth
	const { autenticado } = useAuth();

	// useLocation
	const location = useLocation();

	// autenticado¡
	const auth = autenticado();
	// useColecciones
	const { carrito, handleComprar, handleLimpiarCarrito } = useColecciones();

	// Total
	const total = carrito.reduce(
		(total, producto) => total + producto.precioDescuento * producto.cantidad,
		0
	);

	// Handle change
	const handleChange = e => {
		const { name, value } = e.target;
		setCampos({ ...campos, [name]: value });
	};

	// Handle submit
	const handleSubmit = async e => {
		e.preventDefault();
		// Validar campos
		if (Object.values(campos).includes('')) {
			Swal.fire({
				title: 'Todos los campos son obligatorios',
				text: 'Por favor, rellena todos los campos',
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
			return;
		}
		// Validar email
		const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		if (!regexEmail.test(campos.email)) {
			Swal.fire({
				title: 'Email no válido',
				text: 'Por favor, introduce un email válido',
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
			return;
		}
		// Validar teléfono
		const regexTelefono = /^[0-9]{9}$/;
		if (!regexTelefono.test(campos.telefono)) {
			Swal.fire({
				title: 'Teléfono no válido',
				text: 'Por favor, introduce un teléfono válido',
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
			return;
		}
		// Validar código postal
		const regexCodigoPostal = /^[0-9]{5}$/;
		if (!regexCodigoPostal.test(campos.codigoPostal)) {
			Swal.fire({
				title: 'Código postal no válido',
				text: 'Por favor, introduce un código postal válido',
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
			return;
		}
		// Validar carrito
		if (carrito.length === 0) {
			Swal.fire({
				title: 'Carrito vacío',
				text: 'Por favor, añade algún producto al carrito',
				icon: 'info',
				confirmButtonText: 'Aceptar',
			});
			return;
		}
		// Enviar formulario
		try {
			setCargando(true);
			const { data } = await handleComprar({ datos: campos });
			// Mostar mensaje
			Swal.fire({
				title: 'Pedido realizado',
				text: data.msg,
				icon: 'success',
				confirmButtonText: 'Aceptar',
			});
			// Limpiar campos
			setCampos({
				nombre: '',
				apellidos: '',
				email: '',
				direccion: '',
				ciudad: '',
				pais: '',
				codigoPostal: '',
				telefono: '',
				referencia: '',
			});
			// Limpiar carrito
			handleLimpiarCarrito();
			// Redirigir
			navitate('/cuenta/pedidos');
		} catch (error) {
			const e = error?.response?.data?.msg;
			console.log(e);
			Swal.fire({
				title: 'Fallo al realizar el pedido',
				text: e,
				icon: 'error',
				confirmButtonText: 'Aceptar',
			});
		}
		setCargando(false);
	};

	// No esta autenticado redirigir
	if (!auth) {
		return Navigate({ to: '/cuenta/iniciar-sesion', state: location });
	}
	return (
		<>
			<div className='navegacion'>
				<div className='contenedor'>
					<div className='navegacion__top'>
						<Link to={'/'}>Inicio</Link>
						<ChevronRightIcon />
						<Link to={'/carrito'}>Carrito</Link>
						<ChevronRightIcon />
						<span className='active'>Pago</span>
					</div>
				</div>
			</div>

			{carrito.length === 0 ? (
				<div className='carrito__noProductos'>
					<h2>Tu carro está vacío</h2>

					<div>
						<h3>No dejes tu carro vacío.</h3>
						<p>
							Echa un vistazo a las colecciones que tenemos para ti, compra lo
							nuevo y lo mejor o personaliza tus productos.
						</p>
						<Link to={'/colecciones'} className='boton'>
							Ver las colecciones
						</Link>
					</div>
				</div>
			) : (
				<section className='contenedor p-2 pasarela__grid'>
					<section className='border'>
						<form className='formulario__form' onSubmit={handleSubmit}>
							<legend className='fomulario__titulo'>Confirma tu pedido</legend>

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
									<label htmlFor='pais'>Pais</label>

									<select
										id='pais'
										name='pais'
										value={campos.pais}
										onChange={handleChange}
									>
										{PAISES.map(({ pais }) => (
											<option key={pais} value={pais}>
												{pais}
											</option>
										))}
									</select>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='ciudad'>Ciudad</label>
									<input
										type='text'
										id='ciudad'
										name='ciudad'
										value={campos.ciudad}
										onChange={handleChange}
										placeholder='Escriba su ciudad'
									/>
								</div>
							</div>

							<div className='formulario__grid'>
								<div className='fomulario__item mb-3'>
									<label htmlFor='direccion'>Dirección</label>
									<input
										type='text'
										id='direccion'
										name='direccion'
										value={campos.direccion}
										onChange={handleChange}
										placeholder='Ingrese su dirección'
									/>
								</div>

								<div className='fomulario__item'>
									<label htmlFor='codigoPostal'>Codigo Postal</label>
									<input
										type='number'
										id='codigoPostal'
										name='codigoPostal'
										value={campos.codigoPostal}
										onChange={handleChange}
										placeholder='ejem: 20000'
									/>
								</div>
							</div>
							<div className='fomulario__item'>
								<label htmlFor='telefono'>Telefono</label>
								<input
									type='number'
									id='telefono'
									name='telefono'
									value={campos.telefono}
									onChange={handleChange}
									placeholder='Escriba su Telefono'
								/>
							</div>

							<div className='fomulario__item'>
								<label htmlFor='referencia'>Referencia</label>
								<textarea
									id='referencia'
									name='referencia'
									value={campos.referencia}
									onChange={handleChange}
									placeholder='Referencia donde se encuentra su domicilio'
								/>
							</div>

							<ButtonLoad type='submit' estado={cargando} disabled={cargando}>
								{cargando ? 'Procesando...' : 'Procesar Pago'}
							</ButtonLoad>

							<div className='formulario__bottom'>
								<Link to={'/carrito'} className='d-flex'>
									<ChevronLeftIcon />
									Volver al carrito
								</Link>
							</div>
						</form>
					</section>

					<div className='w-full'>
						<div className='border p-3 mb-3 w-full'>
							<h2 className='center titulo'>Total a pagar</h2>
							<h3 className='center sky'>{formatearCantidad(total)}</h3>
						</div>

						<div className='carrito__productos'>
							{carrito.length > 0 &&
								carrito.map(producto => (
									<ProductoPasarela key={producto._id} producto={producto} />
								))}
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Pago;
