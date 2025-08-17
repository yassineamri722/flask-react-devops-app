import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Utiliser le nom du service Docker Compose comme hostname
    fetch("http://backend:5000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("Error fetching backend:", err));
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Message from backend: {message}</p>
    </div>
  );
}

export default App;
