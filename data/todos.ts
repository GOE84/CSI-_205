export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// Local data ตามตัวอย่างในบทเรียน ใช้ได้โดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต
const titles = [
  'delectus aut autem',
  'quis ut nam facilis et officia qui',
  'fugiat veniam minus',
  'et porro tempora',
  'laboriosam mollitia et enim quasi adipisci quia provident illum',
  'qui ullam ratione quibusdam voluptatem quia omnis',
  'illo expedita consequatur quia in',
  'quo adipisci enim quam ut ab',
  'molestiae perspiciatis ipsa',
  'illo est ratione doloremque quia maiores aut',
  'vero rerum temporibus dolor',
  'ipsa repellendus fugit nisi',
  'et doloremque nulla',
  'repellendus sunt dolores architecto voluptatum',
  'ab voluptatum amet voluptas'
];

//จำลองการยิง api
export const fetchTodos = async (): Promise<Todo[]> => {
  return titles.map((title, index) => ({
    userId: 1,
    id: index + 1,
    title,
    completed: [4, 8, 10, 11, 12, 14].includes(index + 1)
  }));
};

export const isTodoList = (value: unknown): value is Todo[] => {
  if (!Array.isArray(value)) return false;
  const ids = new Set<number>();
  return value.every((todo) => {
    if (!todo || !Number.isSafeInteger(todo.id) || todo.id < 1 || ids.has(todo.id)
      || typeof todo.title !== 'string' || typeof todo.completed !== 'boolean'
      || !Number.isSafeInteger(todo.userId)) return false;
    ids.add(todo.id);
    return true;
  });
};
