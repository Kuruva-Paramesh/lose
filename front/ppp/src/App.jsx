import { useEffect, useState } from "react";

const API = "https://lose-quii.vercel.app/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const addUser = async () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to add user");

      // Clear input fields
      setName("");
      setEmail("");

      // Refresh users list
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>TODO LIST FOR USER DATA  STORES IN MONGDB</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addUser}>Add</button>

      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
