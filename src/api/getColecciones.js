import ClienteAxios from '../config/ClienteAxios';

const getColecciones = async () => {
	return await ClienteAxios('/colecciones');
};

export default getColecciones;
