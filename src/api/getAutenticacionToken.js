import ClienteAxios from '../config/ClienteAxios';

const getAutenticacionToken = async ({ token }) => {
	return await ClienteAxios('/usuarios/perfil', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
};

export default getAutenticacionToken;
