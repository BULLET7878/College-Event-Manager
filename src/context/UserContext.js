import React, { createContext, useState, useEffect } from "react";
import {
  CAMPUSHUB_CURRENT_USER,
  saveKey,
  loadKey,
} from "../services/storageService";
import * as validation from "../utils/validation";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    (async () => {
      const user = await loadKey(CAMPUSHUB_CURRENT_USER);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
      setLoading(false);
    })();
  }, []);


  const signIn = async (userObj) => {

    if (!userObj.isAdmin) {
      const result = validation.validateStudentForm(userObj);
      if (!result.success) return { success: false, message: "Invalid student data" };
    }

    setCurrentUser(userObj);
    setIsAuthenticated(true);
    await saveKey(CAMPUSHUB_CURRENT_USER, userObj);
    return { success: true };
  };


  const signOut = async () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    await saveKey(CAMPUSHUB_CURRENT_USER, null);
    return { success: true };
  };


  const updateProfile = async (fields) => {
    if (!currentUser) return { success: false };

    const updated = { ...currentUser, ...fields };

    if (!updated.isAdmin) {
      const result = validation.validateStudentForm(updated);
      if (!result.success) return { success: false };
    }

    setCurrentUser(updated);
    await saveKey(CAMPUSHUB_CURRENT_USER, updated);
    return { success: true };
  };

  const isAdmin = () => currentUser?.isAdmin === true;

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        signIn,
        signOut,
        updateProfile,
        isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
