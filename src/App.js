import React, { useCallback, useEffect, useState } from "react";

import JokeList from "./components/JokeList";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const fetchJokesHandler = useCallback(async () => {
    try {
      setErrors(null);
      setIsLoading(true);
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_ten"
      );
      if (!response.ok) throw new Error("Что-то пошло не так...");
      const data = await response.json();
      setJokes(data);
    } catch (err) {
      setErrors(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {!isLodaing && errors && <p>{errors}</p>}
        {!isLodaing && <JokeList jokes={jokes} />}
        {isLodaing && <p>Загрузка шуток...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
