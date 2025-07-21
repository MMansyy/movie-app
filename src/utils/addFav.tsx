export function addToFavourites(movie) {
    if (!movie) return;
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    const isAlreadyFavourite = favourites.find((fav) => fav.id === movie.id);
    if (!isAlreadyFavourite) {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    } else {
        favourites.splice(favourites.findIndex((fav) => fav.id === movie.id), 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
}

export function isFavourite(id) {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    return favourites.find((fav) => fav.id === id);
}