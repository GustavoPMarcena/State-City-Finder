import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import { useEffect, useState } from 'react';
import { loadStates } from './utils/stateGet';
import { loadCities } from './utils/cityGet';
import { loadSvg } from './utils/getSVG';

function App() {
  const [states, setStates] = useState({});
  const [cities, setCities] = useState({});
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [svg, setSvg] = useState({});

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    if (event.target.value !== "-") {
      getCities(event.target.value);
    } else {
      setCities({});
    }
  };

  const handleCityChange = (event) => {
    if (event.target.value !== "-") {
      setSelectedCity(event.target.value);
    }
  };

  async function handleSubmit(e) {

    e.preventDefault();
    if (selectedCity && selectedState && selectedCity !== '-' && selectedState !== '-') {
      const cidadeEncontrada = cities.find(obj => obj.id == selectedCity);
      const estadoEncontrado = states.find(obj => obj.id == selectedState);
      console.log(cidadeEncontrada.nome, estadoEncontrado.nome);
      await getSVG(cidadeEncontrada.nome, estadoEncontrado.nome);
      console.log(svg);

    }


  }

  async function getStates() {
    try {
      const nomes = await loadStates();
      setStates(nomes);
      console.log(states);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function getCities(id) {
    try {
      const nomesCidades = await loadCities(id);
      setCities(nomesCidades);
      console.log(cities);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  async function getSVG(city, state) {
    try {
      const data = await loadSvg(city, state);
      setSvg(data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  useEffect(() => {
    getStates();
  }, []);



  return (
    <div className="App">
      <header>
        <h1>Localizador de cidades</h1>
      </header>
      <main>
        <div className='card-form'>
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="selectState">Selecione o estado:</Form.Label>
            <Form.Select
              onChange={handleStateChange}
              size="lg"
              id='selectState'>
              <option>-</option>
              {states.length > 0 && states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.nome}
                </option>
              ))}


            </Form.Select>

            <br />

            <Form.Label htmlFor="selectCity">Selecione a cidade:</Form.Label>
            <Form.Select onChange={handleCityChange} size="lg">
              <option>-</option>
              {cities.length > 0 && cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nome}
                </option>
              ))}
            </Form.Select>

            <br />
            <Button variant="primary" type="submit">
              Buscar
            </Button>
          </Form>
          <br/>
          {svg && (
            <div>

              <svg
                viewBox={svg.viewBox}
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d={svg.pathestado}
                  fill="white"
                  stroke="black"
                  strokeWidth="0.01"
                />
                <path
                  d={svg.pathmunicipio}
                  fill="black"
                  stroke="none"
                />
              </svg>
            </div>
          )}
        </div>
      </main>
    </div>

  );
}

export default App;
