<script setup>
import {reactive, ref, watch, onMounted} from "vue"; // Ensure 'onMounted' is only imported once
import {addToFavoriteMovie, getFavoriteMovies, getMoviesList} from "@/services/movies.js";
import Spinner from "@/components/Spinner.vue";

const movies = ref()
const loading = ref(true)
const ImageUrl = ref('https://image.tmdb.org/t/p/w500/')

const formFavorite = reactive({
  media_type:"movie",
  media_id:null,
  favorite:false
})

const roundedNumber = (number) => {
  return Math.round(number * 100) / 100;
}

const removeFromFavorite = async (movie_id) => {
  formFavorite.media_id = movie_id
  loading.value = true

  await addToFavoriteMovie(formFavorite).then((res) => {
    console.log(res)
  })

  await getFavoriteMovies().then((res) => {
    movies.value = res.results
    loading.value = false

  })
}


onMounted(() => {
  loading.value = true;
  Promise.all([
    getFavoriteMovies().then((res) => {
      movies.value = res.results
      loading.value = false
    })
  ])
})


</script>


<template>
  <div>
    <Spinner v-if="loading"/>
    <div class="bg-white">
      <div class="grid grid-cols-12">
        <div class="col-span-2 space-y-6 p-4"></div>
        <div class="col-span-8 overflow-hidden sm:px-6 lg:px-8">
          <div class="-mx-px grid grid-cols-2 gap-4 px-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="movie in movies" class="relative group shadow-xl rounded-lg p-4 sm:p-6">
              <RouterLink :to="{ name: 'show_movie', params: {id: movie.id}}">
                <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img :src="ImageUrl + movie.poster_path" alt="TODO" class="h-full w-full object-cover object-center">
                </div>
                <div class="pb-4">
                  <p class="mt-4 text-base font-medium text-gray-900">{{ movie.title }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ movie.vote_count }} reviews</p>
                  <p class="mt-1 text-sm text-gray-500">{{ roundedNumber(movie.vote_average) }}/10</p>
                </div>
              </RouterLink>
              <div @click="removeFromFavorite(movie.id)" class="absolute top-4 right-4 shadow-xl cursor-pointer hover:bg-amber-600 border-red-700 bg-amber-400 w-5 h-5">
            </div>
            </div>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
  </div>
</template>