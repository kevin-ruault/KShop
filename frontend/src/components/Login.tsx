import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { createUser, logUser } from "../api/UserAPI"

type LoginResponse = {
  userId?: string;
  token?: string;
  message?: string;
};

export function Login() {
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState<LoginResponse>();
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
      const res = await logUser(formData);
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId);
      }
      setResponse(res);
      navigate("/");
      window.location.reload();
    } catch (error) {
      setResponse({ message: "Mail ou mot de passe incorrect" });
    }
  };

  useEffect(() => {
    if (response) console.log(response.message);

  }, [response])


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
        {response?.message && <p>{response.message}</p>}
      </div>
    </div>
  )
}