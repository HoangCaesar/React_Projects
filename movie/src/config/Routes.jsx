import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail-page/Detail';
import Auth from '../pages/auth/Auth';

function RouteS() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/auth"
                element={<Auth />}
            />
            <Route
                path="/:category"
                element={<Catalog />}
            />
            <Route
                path="/:category/:id"
                element={<Detail />}
            />
            <Route
                path="/:category/search/:keyword"
                element={<Catalog />}
            />
        </Routes>
    );
}

export default RouteS;