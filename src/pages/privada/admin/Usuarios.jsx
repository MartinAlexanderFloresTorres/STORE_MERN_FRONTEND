import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import getObtenerUsuarios from '../../../api/getObtenerUsuarios';
import Usuario from '../../../components/Usuario';
import '../../../styles/Usuarios.css';

const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [nombre, setNombre] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [cargando, setCargando] = useState(false);
	const [noUsuarios, setNoUsuarios] = useState(false);

	const obtenerUsuarios = async () => {
		try {
			setCargando(true);
			setUsuarios([]);
			setNoUsuarios(false);
			const { data } = await getObtenerUsuarios({ nombre, page });
			setTotalPages(data.totalPages);
			setUsuarios(data.docs);
			const vacio = data.docs.length === 0;
			setNoUsuarios(vacio);
		} catch (error) {
			setUsuarios([]);
			console.log(error?.response?.data?.msg);
		}
		setCargando(false);
	};

	useEffect(() => {
		obtenerUsuarios();
	}, [page]);

	// Handle de la paginacion
	const handlePage = (e, value) => {
		setPage(value);
	};

	// Handle submit del formulario
	const handleSubmit = e => {
		e.preventDefault();
		obtenerUsuarios();
	};

	return (
		<section className='contenedor usuarios'>
			<div className='usuarios__top'>
				<h1 className='titulo'>( {usuarios.length} ) Usuarios</h1>
				<form className='usuarios__formulario' onSubmit={handleSubmit}>
					<input
						type='text'
						value={nombre}
						onChange={e => setNombre(e.target.value.trimStart())}
						placeholder='Buscar usuario por su nombre...'
					/>
					<button type='submit' title='Buscar'>
						<MagnifyingGlassIcon />
					</button>
				</form>
			</div>

			<>
				<div className='usuarios__grid'>
					{usuarios.length > 0 ? (
						usuarios.map(usuario => (
							<Usuario
								setUsuarios={setUsuarios}
								usuarios={usuarios}
								key={usuario._id}
								usuario={usuario}
							/>
						))
					) : noUsuarios ? (
						<h2 className='pt-3'>No hay usuarios</h2>
					) : (
						<>
							<div className='border loader--usuario p-2'>
								<div className='loader-item loader--user'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
							</div>
							<div className='border loader--usuario p-2'>
								<div className='loader-item loader--user'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
							</div>
							<div className='border loader--usuario p-2'>
								<div className='loader-item loader--user'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
							</div>
							<div className='border loader--usuario p-2'>
								<div className='loader-item loader--user'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
								<div className='loader-item p-2'></div>
								<div className='loader-item'></div>
							</div>
						</>
					)}
				</div>

				{totalPages !== 1 && !cargando && (
					<div className='contenedor grid__paginacion'>
						<Pagination
							count={totalPages}
							page={page}
							onChange={handlePage}
							color='primary'
						/>
					</div>
				)}
			</>
		</section>
	);
};

export default Usuarios;
