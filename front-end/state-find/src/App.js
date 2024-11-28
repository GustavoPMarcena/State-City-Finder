import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';
import { useEffect, useState } from 'react';
import { loadStates } from './utils/stateGet';
import { loadCities } from './utils/cityGet';

function App() {
  const [states, setStates] = useState({});
  const [cities, setCities] = useState({});
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    if(event.target.value !== "-") {
      getCities(event.target.value);
    } else {
      setCities({});
    }
  };

  const handleCityChange = (event) => {
    if(event.target.value !== "-") {
      setSelectedCity(event.target.value);
    } 
  };

  function handleSubmit(e){
    e.preventDefault();
    const cidadeEncontrada = cities.find(obj => obj.id == selectedCity);
    const estadoEncontrado = states.find(obj => obj.id == selectedState);

    console.log(cidadeEncontrada, estadoEncontrado);
    
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
        </div>
      </main>
    </div>

  );
}

export default App;
