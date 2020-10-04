import React, { useEffect, useState } from "react";

async function fetchData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

  return response.json();
}
export default function App() {
  const [repoList, setRepoList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    fetchData()
      .then((githubResponse) => setRepoList(githubResponse.results))
      .catch(() => setError("There are somting wrong,please try again later"))
      .finally(() => setLoading(false));
    return () => {};
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <ul>
        {!isLoading && repoList.length && (
          <div>
            {repoList.map((repo) => (
              <li>{repo.name}</li>
            ))}
          </div>
        )}
      </ul>
      <div>{error && <div>Something went wrong ...</div>}</div>
    </div>
  );
}
