import ClienteAxios from '../config/ClienteAxios';

const getColeccion = async ({ url }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios(`/colecciones/coleccion/${url}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default getColeccion;
