import { destroy, get, post, patch } from "@/composable/useApi";

export async function getTVList(form) {
    try {
        return await get('3/discover/tv',{params: form}).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching TV list:', e);
        return null;
    }
}

export async function getTVDetails(id) {
    try {
        return await get('3/tv/' + id).then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching TV list:', e);
        return null;
    }
}

export async function getTVImages(id) {
    try {
        return await get('3/tv/' + id + '/images').then(res => {
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

export async function showTV(id) {
    try {
        return await get('3/tv/popular/' + id).then(res =>{
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
export async function storeD(form) {
    try {
        return await post('api/d', form).then(res =>{
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