import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Movies from '@/views/Movies/Index.vue'
import AppLayout from '../layouts/AppLayout.vue'
import ShowMovie from "@/views/Movies/Show.vue";
import TV from '@/views/TV Shows/Index.vue'
import ShowTVShow from "@/views/TV Shows/Show.vue";
import FavoriteMovies from "@/views/Movies/Favorite.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: "/",
            name: "layout",
            component: AppLayout,
            children: [
                {
                    path: 'movies',
                    name: 'movies',
                    component: Movies
                },
                {
                    path: '/movies/:id/',
                    name: 'show_movie',
                    component: ShowMovie
                },
                {
                    path: '/movies/favorites',
                    name: 'favorite-movies',
                    component: FavoriteMovies
                },
                {
                    path: 'tv',
                    name: 'tv',
                    component: TV
                },
                {
                    path: 'tv/:id',
                    name: 'show_tv',
                    component: ShowTVShow
                },

            ]
        }
    ]
})

export default router
