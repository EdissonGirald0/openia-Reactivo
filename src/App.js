import { inject } from "@vercel/analytics"
import './App.css';
import{useState} from "react"
import {Configuration, OpenAIApi} from "openai"
function App() {
  inject();
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
    const response = await openai.createCompletion( {
      model: "gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 1000,
    });
      setResult(response.data.choices[0].text);
      console.log(setResult(response.data.choices[0].text))

  } catch (error) {
    console.error(error);
  }
  setLoading(false);
 };
 
 return (
  <main className="container-fluid">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      
      <h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Logo_del_Polit%C3%A9cnico_Grancolombiano.svg/512px-Logo_del_Polit%C3%A9cnico_Grancolombiano.svg.png" class="d-inline-block align-text-top" alt="" width="60"/>
         GraColombiano Pregunta
      </h2>
    </div>
  </nav>
  
      <textarea
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Pregunte amigo..."
        className="textarea"
      ></textarea>
      <button
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
        className="btn btn-primary"
        >
          {loading ? "Generando respuesta....": "Click para Respuesta"}
          </button>
        <div className="result">{result}</div>
        <nav class="textcent navbar fixed-bottom">
         <h3 class="navbar-brand" href="#">	<b>&copy; Edisson Giraldo </b> and power by <b> openAI </b>;)</h3>
      </nav>
  </main>
)
};
export default App;
