import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Localizador de cidades</h1>
      </header>
      <main>
        <div className='card-form'>
          <Form>
            <Form.Label htmlFor="selectState">Selecione o estado:</Form.Label>
            <Form.Select
              size="lg"
              id='selectState'>
              <option>-</option>
            </Form.Select>

            <br />

            <Form.Label htmlFor="selectCity">Selecione a cidade:</Form.Label>
            <Form.Select disabled size="lg">
              <option>-</option>
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
