import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { GreeterPromiseClient } from './pb/helloworld_grpc_web_pb';
import { HelloRequest } from './pb/helloworld_pb';
import useGrpcRequest from './hooks/useGrpcRequest';
function App() {
  const newHelloRequest = async ({ name }) => {
    const client = new GreeterPromiseClient('http://localhost:8080');
    const request = new HelloRequest();
    request.setName(name);
    return await client.sayHello(request, {});
  };

  const [data, error, loading, refetch] = useGrpcRequest(newHelloRequest, {}, []);
  const fetchData = () => {
    refetch({ name: "World" });
  }
  useEffect(() => {
    // refetch({ name: "World" });
    console.log(data);
  }, [data])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={fetchData}></button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
