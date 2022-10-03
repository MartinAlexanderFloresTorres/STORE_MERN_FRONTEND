import ClienteAxios from '../config/ClienteAxios';

const getConfirmarCuenta = async ({ token }) => {
	return await ClienteAxios.get(`/usuarios/registro/${token}`);
};

export default getConfirmarCuenta;
