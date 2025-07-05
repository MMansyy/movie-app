// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZGZkMjRlOTgyY2IzYzdlNjE3NzMxNzYxOGYxMDQyYSIsIm5iZiI6MTc1MTQxMTgzMy43NzUsInN1YiI6IjY4NjQ2Yzc5MTlmNWU4MzUyYWNjZGM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nc6ILxyv9y_IkYihb2jzz4TkF3T_PkSZVWmwSgr4IkE',
        Accept: 'application/json',
    },
});

export default axiosInstance;
