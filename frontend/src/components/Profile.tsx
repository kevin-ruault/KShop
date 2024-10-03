import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/UserAPI";
import { UserType } from "../typescript/UserType";

export function Profile() {
  const [user, setUser] = useState<UserType>();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const productData = await getUser(id);
        setUser(productData);
      }
    };

    fetchUser();
  }, [id])

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Prénom: {user.firstname}</p>
      <p>Nom: {user.lastname}</p>
      <p>Email: {user.email}</p>
    </div>
  )
}