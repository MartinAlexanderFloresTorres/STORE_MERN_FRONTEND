import ClienteAxios from '../config/ClienteAxios';

const postCambiarRol = async ({ id, rol }) => {
	const getToken = localStorage.getItem('token-ecommerce');

	return await ClienteAxios.post(
		`/usuarios/rol/${id}`,
		{ rol },
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken}`,
			},
		}
	);
};

export default postCambiarRol;
