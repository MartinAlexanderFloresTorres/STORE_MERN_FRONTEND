/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AuthContext from '../contexts/AuthContext';
import getAutenticacionToken from '../api/getAutenticacionToken';
import { cambiarTema } from '../helpers';

const AuthProvider = ({ children }) => {
	const [tema, setTema] = useState('claro');
	const [usuario, setUsuario] = useState({});
	const [autenticando, setAutenticando] = useState(true);

	// Efecto de autenticación
	useEffect(() => {
		(async () => {
			try {
				const getToken = localStorage.getItem('token-ecommerce');
				// Si existe el token en el localStorage que lo autentique
				if (getToken) {
					setAutenticando(true);
					const { data } = await getAutenticacionToken({ token: getToken });
					localStorage.setItem('genero-ecommerce', data?.genero);
					setUsuario(data);
				}
			} catch (error) {
				console.log(error?.response?.data?.msg);
				localStorage.removeItem('token-ecommerce');
				localStorage.removeItem('genero-ecommerce');
			}
			setAutenticando(false);
		})();
	}, []);

	// Efecto de localStorage de tema
	useEffect(() => {
		const getThema = localStorage.getItem('tema-v1');
		if (getThema === 'dark') {
			setTema(getThema);
		}
	}, []);

	// Efecto de tema
	useEffect(() => {
		cambiarTema(tema);
	}, [tema]);

	// function para ver si el usuario esta autenticado
	const autenticado = () => {
		return Object.keys(usuario).length > 0;
	};

	// function para cambiar cerrar sesión
	const cerrarSesion = async () => {
		// Confirmar
		const { value } = await Swal.fire({
			title: '¿Estas seguro?',
			text: '¿Deseas cerrar sesion?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Cerrar Sesión',
			cancelButtonText: 'Cancelar',
		});

		if (value) {
			setUsuario({});
			localStorage.removeItem('token-ecommerce');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				tema,
				setTema,
				autenticando,
				setUsuario,
				usuario,
				autenticado,
				cerrarSesion,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
