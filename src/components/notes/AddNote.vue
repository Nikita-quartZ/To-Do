<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNoteStore } from '@/stores/notes';

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

const dialog = ref(false);
const title = ref('');
const color = ref('primary');
const store = useNoteStore();

onMounted(() => {
  store.fetchNotes();
});

const getNote = computed(() => store.notes);

function colorset(btcolor: any) {
  return (color.value = btcolor);
}

function addNote() {
  let max = 0;
  for (const item of getNote.value) {
    if (max < item.id) {
      max = item.id;
    }
  }
  max += 1;

  const note = {
    id: max, title: title.value, color: color.value, datef: new Date(),
  };

  localStorage.setItem(`note${note.id}`, JSON.stringify(note));
  return (
    getNote.value.push(note),
    (dialog.value = false),
    (title.value = '')
  );
}
</script>

<template>

  <v-sheet>
    <v-btn color="primary" @click="dialog = true">Add Notes</v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-text>
          <h4 class="text-h6 mb-4">Add Notes</h4>
          <v-textarea outlined name="Note" v-model="title" />
          <h4 class="text-h6 mt-4 mb-4">Select Notes Color</h4>
          <div class="d-flex gap-3 align-center">
            <v-btn
              icon
              v-for="btcolor in colorVariation"
              :key="btcolor.id"
              size="x-small"
              :color="btcolor.color"
              @click="colorset(btcolor.color)"
            >
              <CheckIcon width="16" v-if="color === btcolor.color" />
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addNote">Save</v-btn>
          <v-btn color="primary" @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>
