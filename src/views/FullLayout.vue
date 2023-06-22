<script setup lang="ts">
import AppBaseCard from '@/components/AppBaseCard.vue';
// component
import NotesListing from '@/components/notes/NotesListing.vue';
import NotesContent from '@/components/notes/NotesContent.vue';
</script>

<template>

  <div class="container">
    <AppBaseCard>
      <template v-slot:leftpart> <NotesListing /></template>
      <template v-slot:rightpart><NotesContent /> </template>

      <template v-slot:mobileLeftContent><NotesListing /> </template>
    </AppBaseCard>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1400px;
  padding: 20px 0;
  margin: 0 auto;
}

@media (max-width: 1279px) {
    .v-card {
        position: unset;
    }
}
</style>
