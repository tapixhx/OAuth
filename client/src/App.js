import './App.css';
import GoogleLogin from 'react-google-login';
import googleClientId from './config.js';

function App() {
  const responseSuccessGoogle = (resposne) =>{

  }
  const responseErrorGoogle = (resposne) =>{
    
  }
  return (
    <div className="App">
      <h1 className="text-center text-uppercase"> Hello! </h1>
    
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
