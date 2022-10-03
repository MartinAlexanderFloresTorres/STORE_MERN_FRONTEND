import ClienteAxios from '../config/ClienteAxios';

const getProductos = async ({ orden = '', genero = 'Hombre', page }) => {
	if (orden === '') orden = 'fecha-reciente-antigua';
	return await ClienteAxios(
		`/productos?page=${page}&genero=${genero}&orden=${orden}`
	);
};

export default getProductos;
