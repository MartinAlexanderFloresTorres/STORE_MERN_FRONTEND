import ClienteAxios from '../config/ClienteAxios';

const getPedidos = async ({ page }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.get(`/pedidos?page=${page}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default getPedidos;
