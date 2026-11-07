export type User = {
  user: string;
  pass: string;
  role: string;
  name: string;
  email: string;
};

export const users: User[] = [
  {
    user: 'user',
    pass: 'pass',
    role: 'USER',
    name: 'น.ส. ใช้งาน ธรรมดา',
    email: 'user@company.com',
  },
  {
    user: 'admin',
    pass: 'pass',
    role: 'ADMIN',
    name: 'นาย ภูมิ เดชอวยพรวงศ์',
    email: 'admin@company.com',
  },
  {
    user: 'manager',
    pass: 'pass',
    role: 'MANAGER',
    name: 'นาย ภูมิ เดชอวยพรวงศ์',
    email: 'manager@company.com',
  },
  {
    user: 'phoom',
    pass: 'pass',
    role: 'ADMIN',
    name: 'นาย ภูมิ เดชอวยพรวงศ์',
    email: 'phoom@company.com',
  },
];

export const verifyUser = (userInput: string, passInput: string): User | null => {
  const normalized = userInput.trim().toLowerCase();
  const username = normalized.endsWith('@company.com')
    ? normalized.replace('@company.com', '')
    : normalized;

  const found = users.find(
    (u) =>
      (u.user.toLowerCase() === username || u.email.toLowerCase() === normalized) &&
      u.pass === passInput
  );

  return found ?? null;
};

