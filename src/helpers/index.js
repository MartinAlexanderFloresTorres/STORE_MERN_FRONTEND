/**
 * @param {boolean} estado Estado del cambio para el estilo del overflow de body
 */
export const overflowBody = estado => {
	const body = document.querySelector('body');
	if (estado) body.style.overflow = 'hidden';
	else body.removeAttribute('style');
};

/**
 * @param {Date} date Formatea fecha
 * @return {string} Fecha formateada
 */
export const fomatearFecha = fecha => {
	let nuevaFecha;
	if (fecha.includes('T00:00:00.000Z')) {
		nuevaFecha = new Date(fecha.split('T')[0].split('-'));
	} else {
		nuevaFecha = new Date(fecha);
	}
	const opciones = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return nuevaFecha.toLocaleDateString('es-ES', opciones);
};

/**
 * @param {number} cantidad Formatea dinero
 * @return {string} Monto
 */
export const formatearCantidad = cantidad => {
	return cantidad.toLocaleString('es-PE', {
		style: 'currency',
		currency: 'PEN',
	});
};

/**
 * breakpoints para de 3 columnas pasa swiper
 */
export const breakpoints = {
	0: {
		slidesPerView: 1,
		spaceBetween: 20,
		slidesPerGroup: 1,
	},
	780: {
		slidesPerView: 2,
		spaceBetween: 20,
		slidesPerGroup: 1,
	},
	920: {
		slidesPerView: 3,
		spaceBetween: 20,
		slidesPerGroup: 1,
	},
};

/**
 * Funcion que recibe como parametro el tema y cambia clases del el html
 * @param {string} tema
 */

export const cambiarTema = tema => {
	localStorage.setItem('tema-v1', tema);
	const html = document.querySelector('html');
	if (tema === 'dark') html.classList.add('dark');
	else html.classList.remove('dark');
};
