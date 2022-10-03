import ClienteAxios from '../config/ClienteAxios';

const postOlvidePassword = async ({ email }) => {
	return await ClienteAxios.post('/usuarios/olvide-password', { email });
};

export default postOlvidePassword;
