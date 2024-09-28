import logo from './logo.svg';
import { useState } from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const initialValues = {
  val1: "",
  val2: ""
}

function App() {
  const [values, setValues] = useState(initialValues);
  const [answer, setAnswer] = useState('');
  const [concaten, setConcaten] = useState('');
  const [fileData, setFileData] = useState(null);
  

  function getFileData() {
    axios({
      method: "GET",
      url: "/file/data"
    }).then((response) => {
      if(response) {
        console.log(response);
        setFileData(response.data.file_data);
      }
      else console.error(response);
    })
  }

  function edit(prop, event) {
    setValues({...values, ...{[prop]: event.target.value}})
  }

  function resetTextArea() {
    setFileData("");
  }

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/file/save', {values: '1234', obj: Object.values(values), valHello: 'Hello'});
      setAnswer(response.data.answer_data);
      setConcaten(response.data.concaten_data);
      console.log(answer)
    } catch (error) {
      console.error(error);
      setAnswer('Error!');
    }
  };

  
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1 className="my-4">Сохранить в файл</h1>
          <form onSubmit={handelSubmit}>
            <div className="form-group">
              <label>Информация 1</label>
              <input
                type='text'
                className="form-control"
                name="val1"
                value={values.val1}
                onChange={event => edit('val1', event)}
              />
            </div>
            <div className="form-group">
              <label>Информация 2</label>
              <input
                type='text'
                className="form-control"
                name="val2"
                value={values.val2}
                onChange={event => edit('val2', event)}
              />
            </div>

            <button type="submit" className="btn btn-primary">Сохранить</button>
          </form>
        </div>
        <div className='mt-4'>
          <strong>Сохраненная информация: {concaten}</strong>
        </div>
        <div data-mdb-input-init className="form-outline">
          <textarea
            className="form-control"
            rows={8}
            name="massage"
            value={fileData}
            readOnly={true}
            ></textarea>
        </div>
        <button onClick={getFileData} className="btn btn-primary">Получить информацию из файла на сервере</button>
      </header>
      
    </div>
    
  );
}

export default App;
