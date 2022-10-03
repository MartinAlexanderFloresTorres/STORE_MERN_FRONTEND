import ClienteAxios from '../config/ClienteAxios';

const getSearch = async ({
	query = '',
	orden = '',
	genero = 'Hombre',
	page,
}) => {
	if (orden === '') orden = 'fecha-reciente-antigua';
	return await ClienteAxios(
		`/productos/search/producto?q=${query}&page=${page}&genero=${genero}&orden=${orden}`
	);
};

export default getSearch;
