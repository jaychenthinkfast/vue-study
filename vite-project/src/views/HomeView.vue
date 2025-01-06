<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import TodoList from '../components/TodoList.vue'

import { ref } from 'vue'
import Rate from '../components/Rate.vue'
const score = ref(3.5)
</script>

<template>
  <main>
    <TheWelcome />
  </main>
  <TodoList />
  <Rate v-model="score">课程评分:</Rate>
  <Rate v-model="score" theme="green">课程评分:</Rate>
  <Rate v-model="score">    <img width="14" src="/favicon.ico"></Rate>
</template>
