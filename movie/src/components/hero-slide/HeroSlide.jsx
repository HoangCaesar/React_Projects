import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import Button, { OutlineButton } from '../../components/button/Button';
import Modal, { ModalContent } from '../../components/modal/Modal';

import './heroSlide.scss';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, { params });
                setMovieItems(response.results.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        }
        getMovies();
    }, [])

    return (
        <div className="heroSlide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 1000 }}
            >
                {movieItems.map((movieItem, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <HeroSlideItem item={movieItem} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                movieItems.map((movieItem, i) => <TrailerModal key={i} item={movieItem} />)
            }
        </div>
    )
};

const HeroSlideItem = props => {

    let navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No Trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`heroSlide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="heroSlide__item__content container">
                <div className="heroSlide__item__content--info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)} >
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="heroSlide__item__content--poster">
                    <img src={apiConfig.w500Image(item.poster_path)} />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;