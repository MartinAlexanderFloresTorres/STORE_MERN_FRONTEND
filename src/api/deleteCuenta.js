import ClienteAxios from '../config/ClienteAxios';

const deleteCuenta = async ({ id }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.delete(`/usuarios/perfil/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default deleteCuenta;
