import React from 'react';
import { useParams } from 'react-router-dom';

import PageHeader from '../components/page-header/PageHeader';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '../components/movie-grid/MovieGrid';

function Catalog() {

    const { category } = useParams();

    return (
        <React.Fragment>
            <PageHeader>
                {category === cate.movie ? 'Movies' : 'Tv Series'}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Catalog;