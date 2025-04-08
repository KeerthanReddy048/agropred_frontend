import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// This is a simple mock of a user store - in a real app, this would be in a database
const mockUsers = new Map<string, string>();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    const storedPassword = mockUsers.get(email);
    if (!storedPassword || storedPassword !== password) {
      throw new Error('Invalid email or password');
    }
    setUser({ email });
  };

  const signUp = async (email: string, password: string) => {
    if (mockUsers.has(email)) {
      throw new Error('User already exists');
    }
    mockUsers.set(email, password);
    setUser({ email });
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};