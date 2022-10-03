/**
 * Funcion que genera un id unico
 * @return {string} string
 */

const generarId = () => {
	const fecha = Date.now().toString(32).substr(2);
	const random = Math.random().toString(32).substr(2);
	return fecha + random;
};
export default generarId;
