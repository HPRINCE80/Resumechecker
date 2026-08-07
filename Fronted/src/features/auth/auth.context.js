import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return React.createElement(
    AuthContext.Provider,
    { value: { user, setUser, loading, setLoading } },
    children
  );
};