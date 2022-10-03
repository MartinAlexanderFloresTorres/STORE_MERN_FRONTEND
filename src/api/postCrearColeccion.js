import ClienteAxios from '../config/ClienteAxios';

const postCrearColeccion = async data => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.post('/colecciones', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default postCrearColeccion;
