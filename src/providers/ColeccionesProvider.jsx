import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import deleteProducto from '../api/deleteProducto';
import getColecciones from '../api/getColecciones';
import getSearch from '../api/getSearch';
import ColeccionesContext from '../contexts/ColeccionesContext';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import setPedido from '../api/setPedido';

// eslint-disable-next-line react/prop-types
const ColeccionesProvider = ({ children }) => {
	// Estados
	const [colecciones, setColecciones] = useState([]);
	const [cargandoColecciones, setCargandoColecciones] = useState(true);
	const [productosSearch, setProductosSearch] = useState([]);
	const [cargandoSearch, setCargandoSearch] = useState(true);
	const [noProductosSearch, setNoProductosSearch] = useState(false);
	const [pageSearch, setPageSearch] = useState(1);
	const [genero, setGenero] = useState();
	const [search, setSearch] = useState('');
	const [filtro, setFiltro] = useState('');
	const [totalPagesSearch, setTotalPagesSearch] = useState(1);
	const [cargandoEliminacion, setCargandoEliminacion] = useState(false);
	const [productoEliminado, setProductoEliminado] = useState(null);
	const [productoModificado, setProductoModificado] = useState(false);
	const [carrito, setCarrito] = useState([]);
	const [favoritos, setFavoritos] = useState([]);
	const [vistos, setVistos] = useState([]);

	// useAuth
	const { usuario } = useAuth();

	// Efecto que recuperar el genero que se almaceno en el localStorage
	useEffect(() => {
		const getGenero = localStorage.getItem('genero-ecommerce') || null;
		if (getGenero) {
			setGenero(getGenero);
		}
	}, [usuario]);

	// Efecto de traer todas las colecciones
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getColecciones();
				setColecciones(data);
			} catch (error) {
				console.log(error.message);
			}
			setCargandoColecciones(false);
		})();
	}, [productoEliminado, productoModificado]);

	// Efecto que guarda el carrito en el localStorage
	useEffect(() => {
		if (carrito.length > 0) {
			localStorage.setItem('carrito-ecommerce', JSON.stringify(carrito));
		}
	}, [carrito]);

	// Efecto que guarda los favoritos en el localStorage
	useEffect(() => {
		if (favoritos.length > 0) {
			localStorage.setItem('favoritos-ecommerce', JSON.stringify(favoritos));
		}
	}, [favoritos]);

	// Efecto que guarda los favoritos en el localStorage
	useEffect(() => {
		if (vistos.length > 0) {
			localStorage.setItem('vistos-ecommerce', JSON.stringify(vistos));
		}
	}, [vistos]);

	useEffect(() => {
		// Efecto que recupera el carrito del localStorage
		const getCarrito = localStorage.getItem('carrito-ecommerce') || null;
		if (getCarrito) {
			setCarrito(JSON.parse(getCarrito));
		}

		// Efecto que recupera los favoritos del localStorage
		const getFavoritos = localStorage.getItem('favoritos-ecommerce') || null;
		if (getFavoritos) {
			setFavoritos(JSON.parse(getFavoritos));
		}

		// Efecto que recupera los vistos del localStorage
		const getvistos = localStorage.getItem('vistos-ecommerce') || null;
		if (getvistos) {
			setVistos(JSON.parse(getvistos));
		}
	}, []);

	// Efecto de traer los productos de los filtros con la busqueda
	useEffect(() => {
		if (search) {
			(async () => {
				try {
					setProductosSearch([]);
					setTotalPagesSearch(1);
					setCargandoSearch(true);
					setNoProductosSearch(false);
					const { data } = await getSearch({
						query: search,
						orden: filtro,
						page: pageSearch,
						genero,
					});
					setProductosSearch(data.docs);
					setTotalPagesSearch(data.totalPages);
				} catch (error) {
					setProductosSearch([]);
					setTotalPagesSearch(1);
					setNoProductosSearch(true);
					console.log(error?.response?.data?.msg);
				}
				setCargandoSearch(false);
			})();
		}
	}, [filtro, pageSearch, genero]);

	// Function de busqueda
	const handleSearch = ({ value }) => {
		(async () => {
			try {
				setCargandoSearch(true);
				setNoProductosSearch(false);
				setPageSearch(1);
				setProductosSearch([]);
				setTotalPagesSearch(1);
				const { data } = await getSearch({
					query: value,
					orden: filtro,
					page: pageSearch,
					genero,
				});
				setProductosSearch(data.docs);
				setTotalPagesSearch(data.totalPages);
			} catch (error) {
				setProductosSearch([]);
				setTotalPagesSearch(1);
				setNoProductosSearch(true);
				console.log(error?.response?.data?.msg);
			}
			setCargandoSearch(false);
		})();
	};

	// Evento cuando para cambiar de pagina
	const handlePageSearch = (event, value) => {
		setPageSearch(value);
	};

	// Elimina el producto del vendedor
	const handleEliminarProducto = async ({ id, nombre }) => {
		const { value } = await Swal.fire({
			title: `¿Desea eliminar el producto ${nombre}?`,
			text: 'Recuerda que ya no se pueden revertir los cambios.',
			icon: 'warning',
			showCancelButton: true,
			cancelButtonText: 'Candelar',
			confirmButtonText: 'Eliminar',
		});

		if (value) {
			(async () => {
				try {
					setProductoEliminado(null);
					setCargandoEliminacion(true);
					const { data } = await deleteProducto({ id });
					setProductoEliminado(id);
					// Mostrar mensaje
					Swal.fire({
						title: 'Producto Eliminado',
						text: data?.msg,
						icon: 'success',
						confirmButtonText: 'Entendido',
					});
				} catch (error) {
					const e = error?.response?.data?.msg;
					console.log(e);
					Swal.fire({
						title: 'Fallo al eliminar',
						text: e,
						icon: 'error',
						confirmButtonText: 'Cerrar',
					});
				}
				setCargandoEliminacion(false);
			})();
		}
	};

	// Agregar producto al carrito
	const handleAddCarrito = producto => {
		const productoCarrito = carrito.find(p => p._id === producto._id);
		if (productoCarrito) {
			// Agregar el producto al carrito
			const carritoActualizado = carrito.map(p =>
				p._id === producto._id ? producto : p
			);
			setCarrito(carritoActualizado);
			toast('🛒 Producto actualizado en el carrito');
		} else {
			setCarrito([...carrito, producto]);
			toast('🛒 Producto agregado en el carrito');
		}
	};

	// Eliminar el producto del carrito
	const handleDeleteCarrito = id => {
		const carritoActualizado = carrito.filter(p => p._id !== id);
		setCarrito(carritoActualizado);
		// Si el carrito esta vacio, se elimina del localStorage
		if (carritoActualizado.length === 0) {
			localStorage.removeItem('carrito-ecommerce');
		}
		toast('🗑 Producto eliminado del carrito');
	};

	// Agregar a favoritos
	const handleAddFavoritos = async producto => {
		setFavoritos([...favoritos, producto]);
		toast('❤ Producto agregado a tus favoritos');
	};

	// Eliminar de favoritos
	const handleDeleteFavoritos = id => {
		const favoritosActualizado = favoritos.filter(p => p._id !== id);
		setFavoritos(favoritosActualizado);
		// Si los favoritos estan vacios, se elimina del localStorage
		if (favoritosActualizado.length === 0) {
			localStorage.removeItem('favoritos-ecommerce');
		}
		toast('🗑 Producto quitado de tus favoritos');
	};

	// Agregar productos a vistos
	const handleAddVistos = producto => {
		const existe = vistos.find(p => p._id === producto._id);
		// Si los productos de vistos es mayor a 2 que deje los 9 primero productos y que borre los ultimos
		if (vistos.length < 2) {
			if (existe) {
				// Agregar el producto al carrito
				const vistosActualizados = vistos.map(p =>
					p._id === producto._id ? producto : p
				);
				setVistos(vistosActualizados);
			} else {
				setVistos([producto, ...vistos]);
			}
		} else {
			if (!existe) {
				const productosActualizados = vistos.slice(0, 9);
				setVistos([producto, ...productosActualizados]);
			} else {
				// Agregar el producto al carrito al principio
				const productosFiltrados = vistos.filter(p => p._id !== producto._id);
				setVistos([producto, ...productosFiltrados]);
			}
		}
	};

	// Realizar la compra de los productos
	const handleComprar = async ({ datos }) => {
		// Suma total de los productos
		const total = carrito.reduce(
			(acc, p) => (acc + p.precioDescuento) * p.cantidad,
			0
		);
		return await setPedido({
			datos,
			productos: carrito,
			total,
		});
	};

	// Limpia el carrito
	const handleLimpiarCarrito = () => {
		setCarrito([]);
		localStorage.removeItem('carrito-ecommerce');
	};
	return (
		<ColeccionesContext.Provider
			value={{
				colecciones,
				setColecciones,
				cargandoColecciones,
				setSearch,
				search,
				handleSearch,
				productosSearch,
				setFiltro,
				filtro,
				cargandoSearch,
				genero,
				setGenero,
				pageSearch,
				handlePageSearch,
				totalPagesSearch,
				setTotalPagesSearch,
				noProductosSearch,
				handleEliminarProducto,
				cargandoEliminacion,
				productoEliminado,
				productoModificado,
				setProductoModificado,
				handleAddCarrito,
				handleDeleteCarrito,
				carrito,
				handleAddFavoritos,
				handleDeleteFavoritos,
				favoritos,
				handleAddVistos,
				vistos,
				handleComprar,
				handleLimpiarCarrito,
			}}
		>
			{children}
		</ColeccionesContext.Provider>
	);
};

export default ColeccionesProvider;
