import ClienteAxios from '../config/ClienteAxios';

const getComprobarToken = async ({ token }) => {
	return await ClienteAxios.get(`/usuarios/olvide-password/${token}`);
};

export default getComprobarToken;
