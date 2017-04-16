// components
import {
  BlankScene,
  HomeScene,
  NotesScene
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
  blank: {
    title: 'Blank',
    Page: BlankScene,
  },
};
