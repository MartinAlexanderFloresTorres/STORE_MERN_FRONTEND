import {
	MagnifyingGlassIcon,
	MicrophoneIcon,
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { overflowBody } from '../helpers';
import useColecciones from '../hooks/useColecciones';

const Busqueda = () => {
	// Estados
	const [cargo, setCargo] = useState(false);
	const [escuchando, setEscuchando] = useState(false);

	// useSearchParams
	const [searchParams, setSearchParams] = useSearchParams();
	const q = searchParams.get('q');

	// useLocation
	const { pathname } = useLocation();

	// useNavigate
	const navitage = useNavigate();

	// useColecciones
	const { setSearch, search, handleSearch } = useColecciones();

	// Efecto del overflow del body
	useEffect(() => {
		overflowBody(escuchando);
	}, [escuchando]);

	// when the user is in the search page
	useEffect(() => {
		if (pathname === '/search') {
			setSearchParams({ q: search || '' });
			if (search) {
				setCargo(true);
			}
		}
	}, [search]);

	// setSearch al search value
	useEffect(() => {
		if (pathname === '/search') {
			setSearch(q || '');
			// Buscar cuando cargue el componente y cuando cambie el search
			if (search) {
				handleSearch({ value: q });
			}
		}
	}, [cargo]);

	// Handles Busqueda
	const handleSubmit = e => {
		e.preventDefault();
		if (pathname !== '/search') {
			navitage(`/search?q=${search}`);
		}
		handleSearch({ value: q });
	};

	// Obtener la api de audio del navegador
	const SpeechRecognition =
		window?.SpeechRecognition || window?.webkitSpeechRecognition;

	// Si el navegador tiene api de audio || null
	const recognition = SpeechRecognition ? new SpeechRecognition() : null;

	// Funcion para escuchar
	const handleListen = () => {
		if (recognition) {
			recognition.start();
			recognition.onstart = () => {
				setEscuchando(true);
			};
			// Cuando el usuario deja de hablar
			recognition.onend = () => {
				setEscuchando(false);
			};
			// Cuando el navegador reconoce el audio
			recognition.onresult = e => {
				const transcript = Array.from(e.results)
					.map(result => result[0])
					.map(result => result.transcript)
					.join('');
				if (e.results[0].isFinal) {
					setSearch(transcript);
					setSearchParams({ q: transcript });
					navitage(`/search?q=${transcript}`);
					handleSearch({ value: transcript });
				}
			};
		}
	};
	return (
		<>
			{escuchando && (
				<div className='overlay overlay--escuchando'>
					<section>
						<h2>Escuchando...</h2>
						<div className='overlay--micro'>
							<MicrophoneIcon />
						</div>
					</section>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<button type='submit' title='Buscar'>
					<MagnifyingGlassIcon />
				</button>
				<input
					value={pathname === '/search' ? search : search}
					onChange={e => setSearch(e.target.value.trimStart())}
					type='text'
					placeholder='Buscar Producto...'
				/>
				<button type='button' title='Microfono' onClick={handleListen}>
					<MicrophoneIcon />
				</button>
			</form>
		</>
	);
};

export default Busqueda;
