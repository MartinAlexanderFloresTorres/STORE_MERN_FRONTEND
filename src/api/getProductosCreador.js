import ClienteAxios from '../config/ClienteAxios';

const getProductosCreador = async ({ orden = '', page, genero = 'Hombre' }) => {
	if (orden === '') orden = 'fecha-reciente-antigua';
	const getToken = localStorage.getItem('token-ecommerce');
	return await ClienteAxios.get(
		`/productos/creador/productos?page=${page}&genero=${genero}&orden=${orden}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken}`,
			},
		}
	);
};

export default getProductosCreador;
