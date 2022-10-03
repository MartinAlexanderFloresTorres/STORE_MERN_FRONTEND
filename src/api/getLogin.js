import ClienteAxios from '../config/ClienteAxios';

const getLogin = async data => {
	return await ClienteAxios.post('/usuarios/autenticar', data);
};

export default getLogin;
