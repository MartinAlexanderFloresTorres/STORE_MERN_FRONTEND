import ClienteAxios from '../config/ClienteAxios';

const putConvertirVendedor = async data => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put(`/usuarios/perfil/vendedor`, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default putConvertirVendedor;
