import { defineStore } from 'pinia';
// project imports
import { map } from 'lodash';

interface NotesType {
    id?: number | any;
    color?: string;
    title?: string;
    datef?: Date | any;
    deleted?: boolean;
}

interface noteType {
    notes: NotesType[];
    notesContent: number;
    noteSearch: string;
}

export const useNoteStore = defineStore({
  id: 'notes',
  state: (): noteType => ({
    notes: [],
    notesContent: 1,
    noteSearch: '',
  }),
  actions: {
    async fetchNotes() {
      const notes = [];
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i) || '{}';
        notes.push(JSON.parse(localStorage.getItem(key) || '{}'));
      }
      this.notes = notes;
    },

    SelectNote(itemID: number) {
      this.notesContent = itemID;
    },

    deleteNote(itemID: number) {
      const index = this.notes.findIndex((item) => item.id === itemID);
      this.notes.splice(index, 1);
      localStorage.removeItem(`note${itemID}`);
    },

    updateNote(itemID: number, itemColor: any) {
      const oldNote = this.notes.filter((note: any) => note.id === itemID)[0];

      const newNote = {
        ...oldNote,
        color: itemColor,
      };

      localStorage.setItem(`note${itemID}`, JSON.stringify(newNote));
      this.notes = map(this.notes, (note: any) => {
        if (note.id === itemID) {
          return {
            ...note,
            color: itemColor,
          };
        }
        return note;
      });
    },
  },
});
