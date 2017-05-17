// components
import {
  BlankScene,
  ChatScene,
  HomeScene,
  LoginScene,
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
  login: {
    index: 901,
    title: 'Login',
    Page: LoginScene,
  },
  blank: {
    index: 999,
    title: 'Blank',
    Page: BlankScene,
  },
};
