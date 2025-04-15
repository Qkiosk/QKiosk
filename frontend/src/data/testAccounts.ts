export const testAccounts = {
  admin: {
    email: 'admin@test.com',
    password: 'admin123!',
    role: 'admin' as const,
  },
  user: {
    email: 'user@test.com',
    password: 'user123!',
    role: 'user' as const,
  },
}; 