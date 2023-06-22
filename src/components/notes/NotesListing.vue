<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { TrashIcon } from 'vue-tabler-icons';
import { useNoteStore } from '@/stores/notes';

const store = useNoteStore();

const getNotes = computed(() => store.notes);

const NoteItem = getNotes;

const searchValue = ref('');

const filteredNotes = computed(() => NoteItem.value.filter((note) => note.title?.toLowerCase().includes(searchValue.value.toLowerCase())));

onMounted(() => {
  store.fetchNotes();
});
</script>

<template>
  <div class="pa-6">
    <h4 class="text-h6 mb-4">All Notes</h4>

    <div class="mb-5">
      <v-text-field
        variant="outlined"
        v-model="searchValue"
        append-inner-icon="mdi-magnify"
        placeholder="Search Notes"
        hide-details
        density="compact"
      />
    </div>

    <div v-if="filteredNotes.length > 0">
      <v-sheet
        :class="'note-sheet pa-6 pb-4 rounded-md cursor-pointer mb-4  bg-light' + note.color"
        v-for="(note, index) in filteredNotes"
        :key="note.id"
        @click="store.SelectNote(index + 1)"
      >
        <h6 :class="'text-h6 text-truncate text-' + note.color">{{ note.title }}</h6>
        <div class="d-flex mt-3 align-center">
          <small class="text-subtitle-2 opacity-25">{{ new Date(note.datef).toLocaleDateString() }}</small>
          <v-btn
            icon
            variant="text"
            class="ml-auto"
            size="x-small"
            @click="store.deleteNote(note.id)"
          ><v-tooltip activator="parent" location="top">Delete Note</v-tooltip><TrashIcon size="18"
          /></v-btn>
        </div>
      </v-sheet>
    </div>
    <v-sheet v-if="filteredNotes.length === 0"
    ><v-alert type="error" title="Opps" text="The Notes you are looking for is not found" /></v-sheet>
  </div>
</template>

<style lang="scss">
.note-sheet {
    transition: 0.1s ease-in;
    &:hover {
        transform: scale(1.02);
    }
}
</style>
