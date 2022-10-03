import ClienteAxios from '../config/ClienteAxios';

const getVentas = async ({ page }) => {
	const token = localStorage.getItem('token-ecommerce');
	return await ClienteAxios(`/pedidos/ventas?page=${page}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};

export default getVentas;
