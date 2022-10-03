import ClienteAxios from '../config/ClienteAxios';

const deleteProducto = async ({ id }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.delete(`/productos/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default deleteProducto;
