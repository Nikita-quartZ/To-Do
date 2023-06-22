<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { CheckIcon } from 'vue-tabler-icons';
import { debounce } from 'lodash';
import { useNoteStore } from '@/stores/notes';
import AddNote from './AddNote.vue';

const colorVariation = [
  {
    id: 1,
    color: 'warning',
  },
  {
    id: 2,
    color: 'secondary',
  },
  {
    id: 3,
    color: 'error',
  },
  {
    id: 4,
    color: 'success',
  },
  {
    id: 5,
    color: 'primary',
  },
];

const store = useNoteStore();

const getNote = computed(() => store.notes[store.notesContent - 1]);

const updateData = () => {
  const itemID = getNote.value.id;
  const oldNote = store.notes.filter((note: any) => note.id === itemID)[0];

  const newNote = {
    ...oldNote,
    title: getNote.value.title,
  };

  localStorage.setItem(`note${itemID}`, JSON.stringify(newNote));
};

const UpdateNote = debounce(updateData, 500);

onMounted(() => {
  store.fetchNotes();
});

</script>

<template>
  <v-sheet>
    <v-sheet class="py-3 pl-6 pr-4 d-flex align-center">
      <h4 class="text-h6">Edit Notes</h4>
      <div class="ml-auto"><AddNote /></div>
    </v-sheet>
    <v-divider />
    <v-sheet v-if="getNote">
      <v-sheet class="pa-6">
        <h4 class="text-h6 mb-4">Change Title</h4>
        <v-textarea outlined name="Note" v-model="getNote.title" @input="UpdateNote()" />

        <h4 class="text-h6 mt-4 mb-4">Change Notes Color</h4>
        <div class="d-flex gap-3 align-center">
          <v-btn
            icon
            v-for="btcolor in colorVariation"
            :key="btcolor.id"
            size="x-small"
            :color="btcolor.color"
            @click="store.updateNote(getNote.id, btcolor.color)"
          >
            <CheckIcon width="16" v-if="getNote.color === btcolor.color" />
          </v-btn>
        </div>
      </v-sheet>
    </v-sheet>
    <v-sheet v-else class="pa-6"> <v-alert type="error" title="Opps" text="No Note selected Please select note" /></v-sheet>
  </v-sheet>
</template>
