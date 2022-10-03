import ClienteAxios from '../config/ClienteAxios';

const putActualizarPerfil = async data => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put('/usuarios/perfil', data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default putActualizarPerfil;
