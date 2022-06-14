const apiConfig = {
    baseURL: 'http://api.themoviedb.org/3/',
    apiKey: 'e2f1c0909e8043a32438d0ca2f944f13',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig;