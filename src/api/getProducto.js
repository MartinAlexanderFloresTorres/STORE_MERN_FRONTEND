import ClienteAxios from '../config/ClienteAxios';

const getProducto = async ({ url }) => {
	return await ClienteAxios(`/productos/${url}`);
};

export default getProducto;
