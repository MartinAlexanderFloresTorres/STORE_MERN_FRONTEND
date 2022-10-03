import '../../styles/ProductoLoader.css';

const ProductoLoader = () => {
	return (
		<section className='contenedor productoLoader'>
			<div className='productoLoader__grid'>
				<div className='productoLoader__left'>
					<div className='p-2'>
						<div className='loader-imagen loader-imagen2s'></div>
						<div className='productoLoader__botones'>
							<div className='loader-item'></div>
							<div className='loader-item'></div>
							<div className='loader-item'></div>
							<div className='loader-item'></div>
							<div className='loader-item'></div>
						</div>
					</div>
				</div>
				<div className='productoLoader__right p-2'>
					<div className='loader-imagen loader-imagen2s'></div>
					<div>
						<div className='productoLoader__1 loader-item'></div>
						<div className='productoLoader__2 loader-item'></div>
						<div className='productoLoader__3 loader-item'></div>
						<div className='productoLoader__4 loader-item'></div>
						<div className='productoLoader__1 loader-item'></div>
						<div className='productoLoader__2 loader-item'></div>
						<div className='productoLoader__3 loader-item'></div>
						<div className='productoLoader__3 loader-item'></div>
						<div className='productoLoader__4 loader-item'></div>
						<div className='productoLoader__1 loader-item'></div>
					</div>
					<div>
						<div className='productoLoader__agregar'>
							<div className='loader-item'></div>
						</div>
						<div className='loader-item'></div>
						<div className='productoLoader__3 loader-item'></div>
						<div className='loader-item'></div>
					</div>
				</div>
			</div>
			<div className='productoLoader__bottom'>
				<div className='productoLoader__dflex'>
					<div className='loader-item'></div>
					<div className='loader-item'></div>
				</div>
				<div className='productoLoader__dflex'>
					<div className='loader-item'></div>
					<div className='loader-item'></div>
				</div>
				<div className='productoLoader__dflex'>
					<div className='loader-item'></div>
					<div className='loader-item'></div>
				</div>
			</div>
		</section>
	);
};

export default ProductoLoader;
