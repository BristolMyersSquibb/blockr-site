<script setup>
const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: 'YouTube video' }
})
</script>

<template>
  <div class="video-embed">
    <iframe
      :src="`https://www.youtube.com/embed/${id}`"
      :title="title"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.video-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  margin: 16px 0;
}
.video-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 12px;
}
</style>
