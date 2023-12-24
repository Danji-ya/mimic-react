import { useAtom } from "../Dj/store/utils";

export const todoStateKey = "todoStateKey";

export const initTodos = [
  { id: 1, completed: false, content: "Get apples" },
  { id: 2, completed: true, content: "Get oranges" },
];

const todoState = useAtom({
  key: todoStateKey,
  initState: {
    todos: initTodos,
  },
});
