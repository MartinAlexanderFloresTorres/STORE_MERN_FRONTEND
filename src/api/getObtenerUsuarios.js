import ClienteAxios from '../config/ClienteAxios';

const getObtenerUsuarios = async ({ nombre, page }) => {
	const getToken = localStorage.getItem('token-ecommerce');

	return await ClienteAxios(`/usuarios?nombre=${nombre}&page=${page}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default getObtenerUsuarios;
