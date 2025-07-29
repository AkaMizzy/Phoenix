import kanbanInit from '../theme/kanban';
import createBoardInit from '../theme/create-board';

const { docReady } = window.phoenix.utils;

docReady(kanbanInit);
docReady(createBoardInit);
