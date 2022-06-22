import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import './movieGrid.scss';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import MovieCard from '../movie-card/MovieCard';
import { OutlineButton } from '../button/Button';
import Input from '../input/Input';
import { useNavigate } from 'react-router-dom';

const MovieGrid = props => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};
            if (keyword === undefined) {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        }
        getList();
    }, [props.category, keyword])

    const loadMore = async () => {
        let response = null;
        const params = {
            page: page + 1
        };
        if (keyword === undefined) {
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMovieList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className="movieGrid mb-3">
                {
                    items.map((item, i) => (
                        <MovieCard key={i} category={props.category} item={item} />
                    ))
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movieGrid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
};

const MovieSearch = props => {

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`${category[props.category]}/search/${keyword}`);
        }
    }, [keyword, props.category, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, goToSearch])

    return (
        <div className="movieSearch">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    )
}

export default MovieGrid;