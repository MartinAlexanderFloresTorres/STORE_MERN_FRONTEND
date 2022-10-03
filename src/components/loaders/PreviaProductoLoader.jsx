import '../../styles/PreviaProductoLoader.css';

function PreviaProductoLoader({ ...props }) {
	return (
		<div className='previaProductoLoader' {...props}>
			<div className='previaProductoLoader__contenido'>
				<div className='previaProductoLoader__imagen'></div>
				<div>
					<div className='previaProductoLoader__titulo'></div>
					<div className='previaProductoLoader__marca'></div>
					<div className='previaProductoLoader__precio'></div>
					<div className='previaProductoLoader__ahorro'></div>
				</div>
			</div>
		</div>
	);
}
export default PreviaProductoLoader;
