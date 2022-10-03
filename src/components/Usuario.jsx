/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import deleteCuenta from '../api/deleteCuenta';
import postCambiarRol from '../api/postCambiarRol';
import useAuth from '../hooks/useAuth';
import '../styles/Usuario.css';

const Usuario = ({ usuario, usuarios, setUsuarios }) => {
	// Estados
	const [tipo, setTipo] = useState('usuario');
	const [cargandoDelete, setCargandoDelete] = useState(false);
	const { usuario: user, setUsuario } = useAuth();
	const {
		nombre,
		apellidos,
		email,
		confirmado,
		empresa,
		genero,
		imagen,
		productosCreados,
		telefono,
		rol,
		_id,
	} = usuario;

	// Efecto de cambio de rol
	useEffect(() => {
		setTipo(rol);
	}, []);

	// Handle para cambiar el tipo de usuario
	const handleTipo = e => {
		setTipo(e.target.value);
		(async () => {
			try {
				await postCambiarRol({
					id: _id,
					rol: e.target.value,
				});
			} catch (error) {
				const e = error?.response?.data?.msg;
				toast(e, { type: 'error' });
			}
		})();
	};

	// Handle Eliminar cuenta
	const handleEliminarCuenta = async () => {
		// Mostrar mensaje de confirmación
		const { value } = await Swal.fire({
			title: '¿Estas seguro?',
			text: 'El usuario No podras recuperar esta cuenta',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'Cancelar',
		});

		if (value) {
			// Eliminar cuenta
			try {
				setCargandoDelete(true);
				await deleteCuenta({ id: _id });
				if (user._id === _id) {
					// Eliminar el token
					localStorage.removeItem('token-ecommerce');
					// Eliminar el usuario
					setUsuario({});
				}
				// Eliminar el usuario del estado
				const usuariosFiltrados = usuarios.filter(user => user._id !== _id);
				setUsuarios(usuariosFiltrados);
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
		<article className='usuario'>
			<div>
				<div className='usuario__perfil'>
					<img src={imagen?.secure_url} alt={nombre} />
					<h2>{nombre}</h2>
					<p>{apellidos}</p>
				</div>
				<div className='usuario__informacion'>
					<a className='sky' href={`mailto:${email}`}>
						{email}
					</a>
					<p>
						<span>Confirmado: </span>
						{confirmado.toString()}
					</p>

					<p>
						<span>Genero: </span>
						{genero}
					</p>
					<p>
						<span>Productos: </span>
						{productosCreados}
					</p>
					<p>
						<span>Telefono: </span>
						{telefono ? telefono.toString() : 'No tiene'}
					</p>
					<p>
						<span>Id: </span>
						{_id}
					</p>
				</div>
			</div>

			<div className='usuario__bottom'>
				<button
					className='usuario__eliminar'
					onClick={handleEliminarCuenta}
					title='Eliminar Usuario'
				>
					{cargandoDelete ? 'Eliminando...' : 'Eliminar'}
				</button>
				<select value={tipo} onChange={handleTipo}>
					<option value='admin'>Admin</option>
					<option value='usuario'>Usuario</option>
					<option value='empresa'>Empresa</option>
				</select>

				{(tipo === 'empresa' || empresa?.nombre) && (
					<div className='producto__empresa'>
						<button>
							<img
								src={empresa?.imagen?.secure_url}
								alt={empresa?.nombre}
								title={empresa?.nombre}
							/>
						</button>

						<div className='producto__empresaContenido'>
							<div className='producto__empresaTop'>
								<h2>
									Empresa: <span>{empresa?.nombre}</span>
								</h2>
								<img
									src={empresa?.imagen?.secure_url}
									alt='Empresa'
									title={empresa?.nombre}
								/>
							</div>

							<div>
								<div className='producto__empresaInformacion'>
									<p>
										Descripción:
										<span> {empresa?.descripcion}</span>
									</p>
									<p>
										Dirección: <span>{empresa?.direccion}</span>
									</p>
									<p>
										Email:{' '}
										<span>
											<a className='sky' href={`mailto:${email}`}>
												{email}
											</a>
										</span>
									</p>
									<p>
										Pais: <span>{empresa?.pais}</span>
									</p>
									<p>
										Ciudad: <span>{empresa?.ciudad}</span>
									</p>
									<p>
										Codigo Postal:
										<span> {empresa?.codigoPostal}</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</article>
	);
};

export default Usuario;
