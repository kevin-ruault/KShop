import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, logUser } from "../api/UserAPI"

export function Login() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      await createUser(formData);
      //navigate("/admin");
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      await logUser(formData);
      //navigate("/admin");
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };



  return (
    <div style={{ width: "60%", display: "flex", justifyContent: "space-around" }}>
      <div style={{ width: "49%", backgroundColor: "lightgray" }}>
        <h1>Créer un compte</h1>
        <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <label>
            Prénom :
            <input value={firstname} onChange={(e) => setFirstname(e.target.value)} required={true} />
          </label>
          <label>
            Nom :
            <input value={lastname} onChange={(e) => setLastname(e.target.value)} required={true} />
          </label>
          <label>
            Mail :
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required={true} />
          </label>
          <label>
            Mot de passe :
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required={true} />
          </label>
          <input type="submit" value="Créer mon compte" />
        </form>
      </div>
      <div style={{ width: "49%", backgroundColor: "red" }}>
        <h1>Se connecter</h1>
        <form onSubmit={handleLogIn} style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <label>
            Mail :
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required={true} />
          </label>
          <label>
            Mot de passe :
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required={true} />
          </label>
          <input type="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  )
}