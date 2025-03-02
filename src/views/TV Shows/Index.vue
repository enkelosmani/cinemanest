<script setup>
import {reactive, ref, watch, onMounted} from "vue"; // Ensure 'onMounted' is only imported once
import {getTVList} from "@/services/tv.js";
import Pagination from "@/components/pagination.vue";
import {useRoute, useRouter} from "vue-router";
import Spinner from "@/components/Spinner.vue";
import {getLanguagesList} from "@/services/configurations.js";

const tv = ref()
const languages = ref()
const loading = ref(true)
const route = useRoute();
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

const roundedNumber = (number) => {
  return Math.round(number * 100) / 100;
}

const handlePageChange = (pageNumber) => {
  if (pageNumber !== form.page) {  // Avoid reloading the same page
    form.page = pageNumber;
    loading.value = true;

    router.push({name: 'movies', query: {page: pageNumber}});

    getTVList(form).then((res) => {
      tv.value = res.results;
      form.page = res.page;  // Ensure `form.page` stays updated
      loading.value = false;
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

watch(form, (form) => {
  loading.value = true

  getTVList(form).then((res) => {
    tv.value = res.results
    form.page = res.page
    loading.value = false
  })
})

onMounted(() => {
  loading.value = true;
  Promise.all([
    getTVList(form)
        .then((res) => {
          form.page = res.page;
          tv.value = res.results;
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
    <div class="bg-white">
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
            <div v-for="tvs in tv" class="group shadow-xl rounded-lg p-4 sm:p-6">
              <RouterLink :to="{ name: 'show_movie', params: {id: tvs.id}}">
                <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                  <img :src="ImageUrl + tvs.poster_path" alt="TODO" class="h-full w-full object-cover object-center">
                </div>
                <div class="pb-4">
                  <p class="mt-4 text-base font-medium text-gray-900">{{ tvs.title }}</p>
                  <p class="mt-1 text-sm text-gray-500">{{ tvs.vote_count }} reviews</p>
                  <p class="mt-1 text-sm text-gray-500">{{ roundedNumber(tvs.vote_average) }}/10</p>
                </div>
              </RouterLink>
            </div>
          </div>
          <div class="py-8">
            <Pagination :total-pages="500" :active-page="Number(form.page)" @update:page="handlePageChange"/>
          </div>
        </div>
        <div class="col-span-2"></div>
      </div>
    </div>
  </div>
</template>