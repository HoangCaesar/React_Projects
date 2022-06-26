import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const CastList = props => {

    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.credits(category, props.id);
            setCasts(response.cast.slice(0, 5));
        }
        getCredits();
    }, [category, props.id])

    return (
        <div className="casts">
            {
                casts.map((cast, i) => (
                    <div key={i} className="cast">
                        <div className="cast__img"
                            style={{ backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})` }}
                        >
                        </div>
                        <p className="cast__name">{cast.name}</p>
                    </div>
                ))
            }
        </div>
    )
};

export default CastList;