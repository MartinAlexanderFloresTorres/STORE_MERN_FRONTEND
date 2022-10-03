import ClienteAxios from '../config/ClienteAxios';

const getColeccionProductos = async ({ id, orden = '', genero = '', page }) => {
	if (orden === '') orden = 'fecha-reciente-antigua';
	return await ClienteAxios(
		`/colecciones/${id}?page=${page}&genero=${genero}&orden=${orden}`
	);
};

export default getColeccionProductos;
