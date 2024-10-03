import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { UserContextType, UserType } from "../typescript/UserType";
import { getUser } from "../api/UserAPI";

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => { },
});

export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserType>()

  const valueUserContext = { user, setUser }

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const fetchUser = async () => {
      if (storedUserId) {
        const userData = await getUser(storedUserId);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={valueUserContext}>
      {children}
    </UserContext.Provider>
  )
}