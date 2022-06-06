import { useAtom } from '../Dj/store/utils';

export const bookStateKey = 'bookStateKey';

const bookState = useAtom({
  key: bookStateKey,
  initState: {
    books: [
      { id: 1, completed: false, content: 'star' },
      { id: 2, completed: true, content: 'rain' }
    ]
  }
});


