<template>
  <div class="about">
    <h1>This is an about page</h1>    
    <Heading :level="3">hello geekbang</Heading>
  </div>
  
</template>

<script setup>
import Heading from '../components/Heading.jsx'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
