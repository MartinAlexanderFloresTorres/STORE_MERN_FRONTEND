/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import '../../styles/ColeccionContenedor.css';
import useColecciones from '../../hooks/useColecciones';
import { Pagination } from '@mui/material';
import { FILTROS } from '../../constants';
import {
	AdjustmentsHorizontalIcon,
	FingerPrintIcon,
} from '@heroicons/react/24/outline';

const ColeccionContenedor = ({
	setFiltro,
	filtro,
	titulo,
	border,
	paginacion,
	page,
	totalPages,
	handlePage,
	children,
}) => {
	// Estados
	const [layout, setLayout] = useState('cuadricula');
	const [orden, setOrden] = useState('fecha-reciente-antigua'); // selecione por defecto ese orden

	// useColecciones
	const { genero, setGenero } = useColecciones();

	// Efecto de cambiar el layout
	useEffect(() => {
		const getLayout = localStorage.getItem('layout');
		if (getLayout) setLayout(getLayout);
	}, []);

	// Function de cambiar el layout
	const handleLayout = opcion => {
		localStorage.setItem('layout', opcion);
		setLayout(opcion);
	};

	// Function de cambiar el filtro
	const handleFiltro = e => {
		const { value } = e.target;
		setFiltro(value);
		setOrden(value);
		handlePage(null, 1);
	};

	// funcion para cambiar el genero
	const handleGenero = e => {
		const { value } = e.target;
		setGenero(value);
		handlePage(null, 1);
	};

	return (
		<section className={`${border ? 'border' : ''} grid`}>
			<div>
				<h2 className='contenedor grid__titulo'>{titulo}</h2>
				<div className='grid__top'>
					<div className='contenedor'>
						<h2>{titulo}</h2>
						<div className='grid__opciones'>
							<div className='grid__filtro grid__filtro--genero'>
								<FingerPrintIcon />
								<select name='filtro' value={genero} onChange={handleGenero}>
									<option value='Unisex'>Unisex</option>
									<option value='Hombre'>Hombre</option>
									<option value='Mujer'>Mujer</option>
								</select>
							</div>

							{filtro && (
								<div className='grid__filtro'>
									<AdjustmentsHorizontalIcon />
									<select name='filtro' value={orden} onChange={handleFiltro}>
										{<option value=''>Filtrar</option>}
										{FILTROS.map(opcion => (
											<option key={opcion.nombre} value={opcion.value}>
												{opcion.nombre}
											</option>
										))}
									</select>
								</div>
							)}

							<ul>
								<li>
									<button
										onClick={() => handleLayout('cuadrado')}
										type='button'
										title='Cuadrado'
										className={layout === 'cuadrado' ? 'active' : ''}
									>
										<svg fill='currentColor' viewBox='0 0 35 35'>
											<path d='M0 0h35v35H0z'></path>
										</svg>
									</button>
								</li>
								<li>
									<button
										onClick={() => handleLayout('cuadricula')}
										type='button'
										title='Cuadricula'
										className={layout === 'cuadricula' ? 'active' : ''}
									>
										<svg fill='currentColor' viewBox='0 0 35 35'>
											<path d='M0 0h15v15H0zM20 0h15v15H20zM0 20h15v15H0zM20 20h15v15H20z'></path>
										</svg>
									</button>
								</li>
								<li>
									<button
										onClick={() => handleLayout('fila')}
										type='button'
										title='Fila'
										className={layout === 'fila' ? 'active' : ''}
									>
										<svg fill='currentColor' viewBox='0 0 35 35'>
											<g id='Layer_2'>
												<path d='M0 0h35v8H0zM0 13h35v8H0zM0 27h35v8H0z'></path>
											</g>
										</svg>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className={`${layout !== '' ? layout : ''} grid__bottom contenedor`}
				>
					{children}
				</div>

				{totalPages !== 1 && paginacion && (
					<div className='contenedor grid__paginacion'>
						<Pagination
							count={totalPages}
							page={page}
							onChange={handlePage}
							color='primary'
						/>
					</div>
				)}
			</div>
		</section>
	);
};
ColeccionContenedor.defaultProps = {
	titulo: '',
	border: false,
	page: 1,
	paginacion: true,
	totalPages: 1,
	handlePage: () => {},
	setFiltro: () => {},
	filtro: true,
};

export default ColeccionContenedor;
