import './App.css';
import GoogleLogin from 'react-google-login';
import googleClientId from './config.js';
import axios from 'axios';

function App() {

  const responseSuccessGoogle = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: "http://localhost:8080/auth/googleLogin",
      data: {tokenId: response.tokenId}
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const responseErrorGoogle = (response) =>{
    
  }
  return (
    <div className="App">
      <h1 className="text-center text-uppercase"> Hello! </h1>
    
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Login with Google"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
