/* eslint-disable react/prop-types */
import '../../styles/Banner.css';

const Banner = ({ video, url, titulo, texto, children, ...props }) => {
	return (
		<section {...props}>
			<div className='loader-imagen loader-imagen1s'>
				<div className='banner'>
					{video ? (
						<video
							width={600}
							height={500}
							src={url}
							autoPlay
							muted
							loop
						></video>
					) : (
						<img width={600} height={500} src={url} alt='banner' />
					)}
					<div className='contenedor banner__contenido'>
						<div className='banner__item'>
							{titulo && <h2>{titulo}</h2>}
							{texto && <p>{texto}</p>}
							{children}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
Banner.defaultProps = {
	video: false,
	url: '/img/banner.jpg',
	titulo: '',
	texto: '',
};

export default Banner;
