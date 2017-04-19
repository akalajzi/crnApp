// components
import {
  BlankScene,
	ChatScene,
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
  chat: {
    index: 2,
    title: 'Chat',
    Page: ChatScene,
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
