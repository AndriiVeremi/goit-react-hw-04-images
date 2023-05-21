const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '34554984-68074c5646cb7a45ce2c04cbc';

const getImages = (textSearch, page = 1) => {
    return fetch(
        `${BASE_URL}?q=${textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(
            new Error(
                `Oops... there are no ${textSearch} images matching your search... `
            )
        );
    });
};

export default getImages;

