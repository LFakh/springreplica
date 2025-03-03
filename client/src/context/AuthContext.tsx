import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
type User = {
  id: string;
  username: string;
  role: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, password: string) => Promise<boolean>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const USERS = [
  { id: '1', username: 'ray', password: 'loco', role: 'ADMIN' },
  { id: '2', username: 'nim', password: 'nim', role: 'USER' }
];

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = USERS.find(
          (u) => u.username === username && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Signup function
  const signup = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists
        const userExists = USERS.some((u) => u.username === username);
        
        if (userExists) {
          resolve(false);
        } else {
          // In a real app, we would add the user to the database
          // For this demo, we'll just pretend it worked
          const newUser = {
            id: String(USERS.length + 1),
            username,
            role: 'USER'
          };
          
          setUser(newUser);
          localStorage.setItem('user', JSON.stringify(newUser));
          
          // Add to our mock database
          USERS.push({ ...newUser, password });
          
          resolve(true);
        }
      }, 500); // Simulate network delay
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};