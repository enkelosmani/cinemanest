<script setup>
import {onMounted, ref} from "vue";
import {getMoviesDetails, getMoviesImages} from "@/services/movies.js";
import Spinner from "@/components/Spinner.vue";
import {useRoute} from "vue-router";



const route = useRoute()
const movie = ref()
const ImageUrl = 'https://image.tmdb.org/t/p/original/'
const images = ref()

const loading = ref(true)

onMounted(() => {
  loading.value = true
  Promise.all([
    getMoviesDetails(route.params.id).then((res) => {
      movie.value = res
      loading.value = false
    }),
    getMoviesImages(route.params.id).then((res) => {
      images.value = res.backdrops
    }),
  ])
})
</script>

<template>
  <div>
    <Spinner v-if="loading"/>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl">
        <div class="relative overflow-hidden rounded-lg lg:h-[600px]">
          <div class="absolute inset-0">
            <img :src="ImageUrl + movie?.backdrop_path" alt="" class="h-full w-full object-cover object-center">
          </div>
          <div aria-hidden="true" class="relative h-96 w-full lg:hidden"></div>
          <div aria-hidden="true" class="relative h-32 w-full lg:hidden"></div>
          <div
              class="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
            <div class="flex flex-col justify-center h-full">
              <h2 class="text-xl font-bold text-white">{{ movie?.original_title }}</h2>
              <p class="mt-1 text-sm text-gray-300">{{ movie?.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-4xl w-full text-center mb-8">Galery</h2>
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <template v-for="image in images">
            <div class="group p-2 shadow-xl rounded-lg">
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img :src="ImageUrl + image.file_path" class="h-full w-full object-cover object-center group-hover:opacity-75">
              </div>
              <h3 class="mt-4 text-sm text-gray-700">Vote average: {{ image.vote_average }}</h3>
              <h3 class="text-sm text-gray-700">Vote average: {{ image.vote_count }}</h3>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
