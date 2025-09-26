<template>
  <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-black text-purple-600 text-center w-full">
          <slot name="title"/>
        </h1>
        <button @click="returnTitle()">Alterar questões</button>
  </div>
</template>

<script>

export default {
  name: 'HeaderComponent',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Quiz2'
    }
  },
  methods: {
    returnTitle() {
      this.$emit('returnTitle', 'Quiz')
    }
  }
}
</script>

<style>
</style>

