import ClienteAxios from '../config/ClienteAxios';

const putActualizarColeccion = async ({ id, data }) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put(`/colecciones/actualizar/${id}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default putActualizarColeccion;
