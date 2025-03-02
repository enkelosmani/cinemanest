<script setup>
import {reactive, ref, watch, onMounted} from "vue"; // Ensure 'onMounted' is only imported once
import {addToFavoriteMovie, getMoviesList} from "@/services/movies.js";
import Pagination from "@/components/pagination.vue";
import {useRoute, useRouter} from "vue-router";
import Spinner from "@/components/Spinner.vue";
import {getLanguagesList} from "@/services/configurations.js";

const movies = ref()
const languages = ref()
const loading = ref(true)
const route = useRoute();
const successToFavorite = ref(false)
const ImageUrl = 'https://image.tmdb.org/t/p/w500/'
const router = useRouter();

const form = reactive({
  sort_by: 'popularity.desc',
  'release_date.gte': '',
  'release_date.lte': '',
  'vote_average.gte': '',
  'vote_average.lte': '',
  'vote_count.gte': '',
  'vote_count.lte': '',
  with_original_language: '',
  include_adult: false,
  include_video: true,
  language: 'en-US',
  page: ref(Number(route.query.page || 1)),
})

const formFavorite = reactive({
  media_type:"movie",
  media_id:'',
  favorite:true
})

const roundedNumber = (number) => {
  return Math.round(number * 100) / 100;
}

const handlePageChange = (pageNumber) => {
  if (pageNumber !== form.page) {  // Avoid reloading the same page
    form.page = pageNumber;
    loading.value = true;

    router.push({name: 'movies', query: {page: pageNumber}});

    getMoviesList(form).then((res) => {
      movies.value = res.results;
      form.page = res.page;  // Ensure `form.page` stays updated
      loading.value = false;
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
const addToFavorite = (movie_id) => {
  formFavorite.media_id = movie_id
  addToFavoriteMovie(formFavorite).then((res) => {
    if(res) {
      successToFavorite.value = true
    }
  })
}
watch(form, (form) => {
  loading.value = true

  getMoviesList(form).then((res) => {
    movies.value = res.results
    form.page = res.page
    loading.value = false
  })
})

onMounted(() => {
  loading.value = true;
  Promise.all([
    getMoviesList(form)
        .then((res) => {
          form.page = res.page;
          movies.value = res.results;
          loading.value = false;
        })
        .catch((err) => {
          console.error(err);
          loading.value = false;
        }),

    getLanguagesList()
        .then((res) => {
          languages.value = res.sort((a, b) => a.english_name.localeCompare(b.english_name));
        })
        .catch((err) => console.error(err)),
  ]);

});


</script>


<template>
  <div>
    <Spinner v-if="loading"/>
    <div class="bg-white ">
      <div class="grid grid-cols-12">
        <div class="col-span-2 space-y-6">
          <div>
            <span class="pb-4 font-semibold">Sort by</span>
            <select v-model="form.sort_by" class="shadow border rounded-lg w-full mt-2 p-2">
              <option value="original_title.asc">Original title ascending</option>
              <option value="original_title.desc">Original title descending</option>
              <option value="popularity.asc">Popularity ascending</option>
              <option value="popularity.desc">Popularity descending</option>
              <option value="revenue.asc">Revenue ascending</option>
              <option value="revenue.desc">Revenue descending</option>
              <option value="primary_release_date.asc">Primary release date ascending</option>
              <option value="primary_release_date.desc">Primary release date descending</option>
              <option value="title.asc">Title ascending</option>
              <option value="title.desc">Title descending</option>
              <option value="vote_average.asc">Vote average ascending</option>
              <option value="vote_average.desc">Vote average descending</option>
              <option value="vote_count.asc">Vote count ascending</option>
              <option value="vote_count.desc">Vote count descending</option>
            </select>
          </div>


          <div>
            <span class="pb-4 font-semibold">With original language</span>
            <select v-model="form.with_original_language" class="shadow border rounded-lg w-full mt-2 p-2">
              <option v-for="language in languages" :value="language.iso_639_1">{{ language.english_name }}</option>
            </select>
          </div>
          <div>
            <span class="pb-4 font-semibold">Release date greater than</span>
            <input type="date" v-model="form['release_date.gte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>

          <div>
            <span class="pb-4 font-semibold">Release date less than</span>
            <input type="date" v-model="form['release_date.lte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>

          <div>
            <span class="pb-4 font-semibold">Vote average greater than</span>
            <input type="number" v-model="form['vote_average.gte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>

          <div>
            <span class="pb-4 font-semibold">Vote average less than</span>
            <input type="number" v-model="form['vote_average.lte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>

          <div>
            <span class="pb-4 font-semibold">Vote count greater than</span>
            <input type="number" v-model="form['vote_count.gte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>

          <div>
            <span class="pb-4 font-semibold">Vote count less than</span>
            <input type="number" v-model="form['vote_count.lte']" class="shadow border rounded-lg w-full mt-2 p-2">
          </div>
        </div>
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
              <div @click="addToFavorite(movie.id)" class="absolute top-4 right-4 shadow-xl cursor-pointer hover:bg-amber-600 border-red-700 bg-amber-400 w-5 h-5">
            </div>
            </div>
          </div>
          <div class="py-8">
            <Pagination :total-pages="500" :active-page="Number(form.page)" @update:page="handlePageChange"/>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
      <div v-if="successToFavorite" class="fixed flex justify-center items-center bottom-10 right-10 shadow p-5 h-10">
        <div class="relative">
        <p>Added to favorite list</p>
        <span @click="successToFavorite = !successToFavorite" class="absolute border px-1 cursor-pointer -right-4 -top-4">X</span>
        </div>
      </div>
  </div>
  </div>
</template>