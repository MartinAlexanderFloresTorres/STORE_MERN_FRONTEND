import ClienteAxios from '../config/ClienteAxios';

const postNuevoPassword = async ({ token, password }) => {
	return await ClienteAxios.post(`/usuarios/olvide-password/${token}`, {
		password,
	});
};

export default postNuevoPassword;
