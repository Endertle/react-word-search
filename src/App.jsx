import { useEffect, useState } from "react";
import "./App.css";
import Synonym from "./components/Synonym";

function App() {
  const [wordData, setWordData] = useState([]);
  const [word, setWord] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const getWordDefinition = async (word) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await res.json();

    if (data.title === "No Definitions Found") {
      setErrorMessage(true);
      setWordData([]);
      return;
    }

    setWordData(data);
    setWord("");
    setErrorMessage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    getWordDefinition(word);
  };

  const handleSynonymClick = (word) => {
    console.log(word);
    getWordDefinition(word);
  };

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setErrorMessage(false);
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [errorMessage]);

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button>Search</button>
        </form>

        {errorMessage && <div className="error">No Definitions Found</div>}

        {wordData.length != 0 ? (
          <div className="search-word-container">
            {wordData.map((word, index) => (
              <div className="word" key={index}>
                <div className="word-header">
                  <h1>{word.word}</h1>
                  <p>{word.phonetic}</p>
                </div>
                <div className="word-definitions">
                  <p>Definitions:</p>

                  {word.meanings.map((meaning, index) => (
                    <ol className="part-of-speech" key={index}>
                      <p>{meaning.partOfSpeech}</p>

                      {meaning.definitions.map((definition, index) => (
                        <li className="definition" key={index}>
                          <h4>{definition.definition}</h4>
                          {definition.example && (
                            <p className="example">{`"${definition.example}"`}</p>
                          )}
                          {definition.synonyms != 0 && (
                            <Synonym
                              synonyms={definition.synonyms}
                              click={(word) => handleSynonymClick(word)}
                            />
                          )}
                        </li>
                      ))}
                      {meaning.synonyms != 0 && (
                        <Synonym
                          synonyms={meaning.synonyms}
                          click={(word) => handleSynonymClick(word)}
                        />
                      )}
                    </ol>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <h1>Type a word in the input box</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
