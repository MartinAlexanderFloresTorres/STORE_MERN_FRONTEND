import ClienteAxios from '../config/ClienteAxios';

const putActualizarPassword = async ({
	password,
	passwordNuevo,
	passwordConfirmar,
}) => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put(
		'/usuarios/perfil/cambiar-password',
		{
			password,
			passwordNuevo,
			passwordConfirmar,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken}`,
			},
		}
	);
};

export default putActualizarPassword;
