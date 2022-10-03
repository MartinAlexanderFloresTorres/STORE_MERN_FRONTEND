import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormularioVendedor from '../../../components/Vendedor/FormularioVendedor';
import { ROLES_ACCESO } from '../../../constants';
import useAuth from '../../../hooks/useAuth';
import '../../../styles/Unirse.css';

const Unirse = () => {
	// Estados
	const [terminos, setTerminos] = useState(false);

	// useAuth
	const { usuario } = useAuth();

	if (ROLES_ACCESO.includes(usuario?.rol)) {
		return <Navigate to='/empresa/crear-producto' />;
	}

	return (
		<section className='unirse'>
			<div className='unirse__titulo'>
				<h2 className='titulo'>
					Comienza siendo parte de nuestro equipo de vendedores
				</h2>
				<p className='texto'>
					Comienza a ser parte de este ecommerce y creando tus propios productos
					con en esta pagina totalmente gratuita,
				</p>
			</div>

			<FormularioVendedor terminos={terminos} />

			<div className='contenedor'>
				<div className='unirse__terminos'>
					<input
						type='checkbox'
						checked={terminos}
						onChange={() => setTerminos(!terminos)}
						id='aceptar'
					/>
					<label htmlFor='aceptar'>
						Aceptar los terminos legales y condiciónes de la empresa.
					</label>
				</div>

				<div className='unirse__contenedor'>
					<div className='unirse__encabezado'>
						<p>Brindale una buena experiencia a tus usuarios.</p>
					</div>
					<div className='unirse__grid'>
						<div>
							<h2>Beneficios de ser un vendedor:</h2>
							<ul>
								<li>✅ Crear productos facilmente</li>
								<li>✅ Personaliza tus productos a tu gusto</li>
								<li>✅ Puedes crear maximo 30 productos</li>
								<li>✅ Promueve tus ofertas y decuentos</li>
								<li>✅ Pagos gratis</li>
								<li>✅ Compras gratis</li>
							</ul>
							<p>Siente libre y disfruta esta aplicación 🥳</p>
						</div>

						<div>
							<h2>Cosas que debes evitar:</h2>
							<ul>
								<li>
									❌ No publiques fotos que no sean relacionadas a productos de
									ecommerce
								</li>
								<li>
									❌ No compartas información que le falte el respeto a los
									usuarios
								</li>
								<li>❌ Proivido usar este sitio para fines de fraude</li>
								<li>
									❌ En caso infrinjas estos terminos su cuenta sera bloqueada
									automaticamente y perdera toda su información.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Unirse;
