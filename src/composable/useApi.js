import axios from 'axios'

const backend_url = 'https://api.themoviedb.org'


export const api = axios.create({
    baseURL: backend_url,
    headers: {
      accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmRjYWU1ZTY4ZmQ0YjRmZGNkZjU5NDExZWU5ZDY2MCIsIm5iZiI6MTczMDYxNjc1MC45MDY5Njk4LCJzdWIiOiI2NzI2YWYxMzdlOGZjNWE4MjFmOTIxZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bcjDh3wjVUUeO46GNZFM1ECL0dPnQup1MKkNdwSgvrw'
    }
})

export async function get(path, form) {
    return await api.get(path, form);
}

export async function post(path, data, header) {
    return await api.post(path, data, header);
}

export async function patch(path, data) {
    return await api.patch(path, data);
}

export async function destroy(path) {
    return await api.delete(path);
}