import ClienteAxios from '../config/ClienteAxios';

const putActualizarVendedor = async data => {
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.put(`/usuarios/perfil/vendedor/actualizar`, data, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${getToken}`,
		},
	});
};

export default putActualizarVendedor;
