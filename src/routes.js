// components
import {
  BlankScene,
  HomeScene,
  NotesScene,
  NotesNewScene,
} from './scenes';

export default {
  today: {
    index: 0,
    title: 'Today',
    Page: BlankScene,
  },
  home: {
    index: 1,
    title: 'Hi',
    Page: HomeScene,
  },
  people: {
    index: 2,
    title: 'People',
    Page: BlankScene,
  },
  notes: {
    index: 3,
    title: 'Notes',
    Page: NotesScene,
  },
  notesNew: {
    index: 31,
    title: 'New note',
    Page: NotesNewScene,
  },
  blank: {
    index: 999,
    title: 'Blank',
    Page: BlankScene,
  },
};
