import ClienteAxios from '../config/ClienteAxios';

const putActualizarProducto = async ({ id, data }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put(`/productos/${id}`, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default putActualizarProducto;
