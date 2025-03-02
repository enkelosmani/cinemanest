<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  activePage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:page']);

const pages = computed(() => {
  const range = [];
  const maxPagesToShow = 10;

  if (props.totalPages <= maxPagesToShow) {
    for (let i = 1; i <= props.totalPages; i++) {
        range.push(i);
    }
  } else {
    if (props.activePage <= 5) {
      for (let i = 1; i <= 7; i++) {
        range.push(i);
      }
      range.push('...');
      range.push(props.totalPages);
    } else if (props.activePage >= props.totalPages - 4) {
      range.push(1);
      range.push('...');
      for (let i = props.totalPages - 6; i <= props.totalPages; i++) {
        range.push(i);
      }
    } else {
      range.push(1);
      range.push('...');
      for (let i = props.activePage - 2; i <= props.activePage + 2; i++) {
        range.push(i);
      }
      range.push('...');
      range.push(props.totalPages);
    }
  }

  return range;
});

function goToPage(page) {
  if (page >= 1 && page <= props.totalPages && page !== '...') {
    emit('update:page', page);
  }
}
</script>

<template>


  <div class="flex justify-center my-5">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <button
          @click="goToPage(activePage - 1)"
          :disabled="activePage <= 1"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span class="sr-only">Previous</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
              fill-rule="evenodd"
              d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
          v-for="page in pages"
          :key="page"
          @click="goToPage(page)"
          :class="[
          'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
          { 'bg-indigo-600 text-white': page === activePage, 'text-gray-900': page !== activePage }
        ]"
          :aria-current="page === activePage ? 'page' : undefined"
      >
        {{ page }}
      </button>

      <button
          @click="goToPage(activePage + 1)"
          :disabled="activePage === totalPages"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span class="sr-only">Next</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
              fill-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
          />
        </svg>
      </button>
    </nav>
  </div>
</template>

<style scoped>

</style>