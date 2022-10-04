/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import useColecciones from '../hooks/useColecciones';
import '../styles/Footer.css';

const Footer = ({ handleMenu }) => {
	// useColecciones
	const { colecciones } = useColecciones();

	return (
		<footer className='footer'>
			<div className='footer__top'>
				<div className='contenedor footer__grid'>
					<ul>
						<li className='footer__titulo'>Información</li>

						<li>
							<Link to={'/cuenta/unirse'} onClick={handleMenu}>
								Conviertete en socio
							</Link>
						</li>
						<li>
							<Link to={'/cuenta'} onClick={handleMenu}>
								Mi cuenta
							</Link>
						</li>
						<li>
							<a
								href='https://whitecode.online'
								target='_blank'
								rel='noreferrer'
								onClick={handleMenu}
							>
								Creador
							</a>
						</li>
					</ul>

					<ul>
						<li className='footer__titulo'>Navegación</li>

						{colecciones.length > 0 ? (
							colecciones.map(({ _id, nombre, url }) => (
								<li key={_id}>
									<Link
										to={`/colecciones/${url}?id=${_id}`}
										onClick={handleMenu}
									>
										{nombre}
									</Link>
								</li>
							))
						) : (
							<>
								<div className='loader-item' style={{ maxWidth: 200 }}></div>
								<div className='loader-item' style={{ maxWidth: 200 }}></div>
								<div className='loader-item' style={{ maxWidth: 200 }}></div>
								<div className='loader-item' style={{ maxWidth: 200 }}></div>
								<div className='loader-item' style={{ maxWidth: 200 }}></div>
							</>
						)}
					</ul>

					<ul>
						<li className='footer__titulo'>Ponerse en contacto</li>

						<a
							href='mailto:martinflorestorres21@gmail.com'
							className='footer__contacto'
						>
							<AtSymbolIcon />
							Martin Flores
						</a>
						<li className='footer__titulo'>Síganos</li>
						<div className='footer__redes'>
							<li>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://www.instagram.com/martin_flores_28'
									title='Instagram'
								>
									<svg aria-hidden='true' viewBox='0 0 32 32'>
										<path d='M16 3.094c4.206 0 4.7.019 6.363.094 1.538.069 2.369.325 2.925.544.738.287 1.262.625 1.813 1.175s.894 1.075 1.175 1.813c.212.556.475 1.387.544 2.925.075 1.662.094 2.156.094 6.363s-.019 4.7-.094 6.363c-.069 1.538-.325 2.369-.544 2.925-.288.738-.625 1.262-1.175 1.813s-1.075.894-1.813 1.175c-.556.212-1.387.475-2.925.544-1.663.075-2.156.094-6.363.094s-4.7-.019-6.363-.094c-1.537-.069-2.369-.325-2.925-.544-.737-.288-1.263-.625-1.813-1.175s-.894-1.075-1.175-1.813c-.212-.556-.475-1.387-.544-2.925-.075-1.663-.094-2.156-.094-6.363s.019-4.7.094-6.363c.069-1.537.325-2.369.544-2.925.287-.737.625-1.263 1.175-1.813s1.075-.894 1.813-1.175c.556-.212 1.388-.475 2.925-.544 1.662-.081 2.156-.094 6.363-.094zm0-2.838c-4.275 0-4.813.019-6.494.094-1.675.075-2.819.344-3.819.731-1.037.4-1.913.944-2.788 1.819S1.486 4.656 1.08 5.688c-.387 1-.656 2.144-.731 3.825-.075 1.675-.094 2.213-.094 6.488s.019 4.813.094 6.494c.075 1.675.344 2.819.731 3.825.4 1.038.944 1.913 1.819 2.788s1.756 1.413 2.788 1.819c1 .387 2.144.656 3.825.731s2.213.094 6.494.094 4.813-.019 6.494-.094c1.675-.075 2.819-.344 3.825-.731 1.038-.4 1.913-.944 2.788-1.819s1.413-1.756 1.819-2.788c.387-1 .656-2.144.731-3.825s.094-2.212.094-6.494-.019-4.813-.094-6.494c-.075-1.675-.344-2.819-.731-3.825-.4-1.038-.944-1.913-1.819-2.788s-1.756-1.413-2.788-1.819c-1-.387-2.144-.656-3.825-.731C20.812.275 20.275.256 16 .256z'></path>
										<path d='M16 7.912a8.088 8.088 0 0 0 0 16.175c4.463 0 8.087-3.625 8.087-8.088s-3.625-8.088-8.088-8.088zm0 13.338a5.25 5.25 0 1 1 0-10.5 5.25 5.25 0 1 1 0 10.5zM26.294 7.594a1.887 1.887 0 1 1-3.774.002 1.887 1.887 0 0 1 3.774-.003z'></path>
									</svg>
								</a>
							</li>
							<li>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://web.facebook.com/garena.flores.9'
									title='Facebook'
								>
									<svg aria-hidden='true' viewBox='0 0 14222 14222'>
										<path d='M14222 7112c0 3549.352-2600.418 6491.344-6000 7024.72V9168h1657l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4968.72C2600.418 13603.344 0 10661.352 0 7112 0 3184.703 3183.703 1 7111 1s7111 3183.703 7111 7111zm-8222 7025c362 57 733 86 1111 86-377.945 0-749.003-29.485-1111-86.28zm2222 0v-.28a7107.458 7107.458 0 0 1-167.717 24.267A7407.158 7407.158 0 0 0 8222 14137zm-167.717 23.987C7745.664 14201.89 7430.797 14223 7111 14223c319.843 0 634.675-21.479 943.283-62.013z'></path>
									</svg>
								</a>
							</li>
							<li>
								<a
									target='_blank'
									rel='noreferrer'
									href='https://twitter.com/Martinflores_21'
									title='Twitter'
								>
									<svg aria-hidden='true' viewBox='0 0 32 32'>
										<path d='M31.281 6.733q-1.304 1.924-3.13 3.26 0 .13.033.408t.033.408q0 2.543-.75 5.086t-2.282 4.858-3.635 4.108-5.053 2.869-6.341 1.076q-5.282 0-9.65-2.836.913.065 1.5.065 4.401 0 7.857-2.673-2.054-.033-3.668-1.255t-2.266-3.146q.554.13 1.206.13.88 0 1.663-.261-2.184-.456-3.619-2.184t-1.435-3.977v-.065q1.239.652 2.836.717-1.271-.848-2.021-2.233t-.75-2.983q0-1.63.815-3.195 2.38 2.967 5.754 4.678t7.319 1.907q-.228-.815-.228-1.434 0-2.608 1.858-4.45t4.532-1.842q1.304 0 2.51.522t2.054 1.467q2.152-.424 4.01-1.532-.685 2.217-2.771 3.488 1.989-.261 3.619-.978z'></path>
									</svg>
								</a>
							</li>
						</div>
					</ul>

					<ul>
						<li className='footer__titulo'>Aceptamos</li>
						<div className='footer__pagos'>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/American_Express.svg'
									alt='American Express'
									title='American Express'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Apple_Pay.svg'
									alt='Apple Pay'
									title='Apple Pay'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Google_Pay.svg'
									alt='Google Pay'
									title='Google Pay'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Maestro.svg'
									alt='Maestro'
									title='Maestro'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Mastercard.svg'
									alt='Mastercard'
									title='Mastercard'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Shop_Pay.svg'
									alt='Shop Pay'
									title='Shop Pay'
								/>
							</li>
							<li>
								<img
									width='60px'
									height='60px'
									src='/svg/Visa.svg'
									alt='Visa'
									title='Visa'
								/>
							</li>
						</div>
					</ul>
				</div>
			</div>

			<div className='footer__bottom'>
				<p>© 2022 STORE | Todos los derechos reservados</p>
			</div>
		</footer>
	);
};

Footer.defaultProps = {
	handleMenu: () => {},
};

export default Footer;
