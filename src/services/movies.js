import { destroy, get, post, patch } from "@/composable/useApi";

export async function getMoviesList(form) {
    try {
        return await get('3/discover/movie',{params: form}).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching movies list:', e);
        return null;
    }
}

export async function getMoviesDetails(id) {
    try {
        return await get('3/movie/' + id).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching movies list:', e);
        return null;
    }
}

export async function getMoviesImages(id) {
    try {
        return await get('3/movie/' + id + '/images').then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching movies list:', e);
        return null;
    }
}
export async function getFavoriteMovies() {
    try {
        return await get('/3/account/21614273/favorite/movies?language=en-US&page=1&sort_by=created_at.asc' ).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null;
            }
        );
    }catch (e) {
        return null;
    }
}
export async function showMovie(id) {
    try {
        return await get('3/movie/popular/' + id).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null;
            }
        );
    }catch (e) {
        return null;
    }
}
export async function addToFavoriteMovie(form) {
    try {
        return await post('/3/account/21614273/favorite', form).then(res =>{
                if(res.status === 201){
                    return res;
                }
                return null;
            }
        );
    }catch (e) {
        return null;
    }
}
export async function updateD(form) {
    try {
        return await patch('api/d/' + form.id, form).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null;
            }
        );
    }catch (e) {
        return null;
    }
}
export async function destroyD(id) {
    try {
        return await destroy('api/d/'+id).then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null;
            }
        );
    }catch (e) {
        return null;
    }
}

export async function getDetails() {
    try {
        return await get('3/movie/11').then(res =>{
                if(res.status === 200){
                    return res.data;
                }
                return null
            }
        );
    }catch (e) {
        return null;
    }
}