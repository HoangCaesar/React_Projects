import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './detail.scss';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
import Comment from '../../components/comments/Comment';
import Button from '../../components/button/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Detail() {
   

    const { category, id } = useParams();

    const [item, setItem] = useState('');

    const [comment, setComment] = useState(false);

    useEffect(() => {

        const getDetail = async () => {
            const params = {};
            const response = await tmdbApi.detail(category, id, { params });
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#0f0f0f',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner"
                            style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.posters_path)})` }}
                        >
                        </div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster--img"
                                    style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.posters_path)})` }}
                                >

                                </div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id} />
                            </div>
                            <div className="section mb-3">
                                <div className="section mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id} />
                            </div>
                        </div>
                        <div className="container">
                            {
                                comment
                                    ? <Modal
                                        open={comment}
                                        onClose={() => setComment(false)}
                                        height="1000px"
                                        >
                                        <Box sx={style}>
                                            <Comment name={item.title || item.original_title}/> 
                                        </Box>
                                    </Modal>
                                    : <Button className=" comment__btn" onClick={() => setComment(!comment)}>Comment</Button>
                            }
                        </div>
                    </>
                )

            }
        </>
    );
}

export default Detail;