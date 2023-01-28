import './App.css';
import{useState} from "react"
import {Configuration, OpenAIApi} from "openai"
function App() {
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
      model: "text-davinci-003",
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
      <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary">
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
        placeholder="Pregunte mi Perre..."
        className="textarea"
      ></textarea>
      <button
        onClick={handleClick}
        disabled={loading || prompt.length === 0}
        className="btn btn-primary"
        >
          {loading ? "Generando respuesta....": "Generar Respuesta"}
          </button>
        <div className="result">{result}</div>
        <nav class="navbar fixed-bottom bg-body-tertiary">
      <div class="container-fluid">
         <h1 class="navbar-brand" href="#">No le hago la tarea pero puedo ayudar ;)</h1>
      </div>
</nav>
  </main>
)
};
export default App;
