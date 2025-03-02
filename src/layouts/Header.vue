<template>
  <header class="bg-white pb-4">
    <nav class="mx-auto flex max-w-7xl items-center justify-between py-6">
      <div class="hidden lg:flex lg:gap-x-8">
        <RouterLink :to="{name: 'home'}" class="text-sm/6 font-semibold text-gray-900">Home</RouterLink>
        <RouterLink :to="{name: 'movies'}" class="text-sm/6 font-semibold text-gray-900">Movies</RouterLink>
        <RouterLink :to="{name: 'tv'}" class="text-sm/6 font-semibold text-gray-900">TV Shows</RouterLink>
        <RouterLink :to="{name: 'favorite-movies'}" class="text-sm/6 font-semibold text-gray-900">Favorite</RouterLink>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
</script>