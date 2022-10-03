import ClienteAxios from '../config/ClienteAxios';

const setAddProducto = async producto => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.post('/productos', producto, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default setAddProducto;
