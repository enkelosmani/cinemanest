<script setup>
import {RouterView} from "vue-router";
import Header from "@/layouts/Header.vue";
</script>

<template>
  <div>
    <div class="overflow-hidden sm:px-6 lg:px-8">
      <Header/>
      <RouterView />
    </div>
  </div>
</template>
