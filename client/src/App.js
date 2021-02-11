import './App.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

function App() {

  const responseSuccessGoogle = (response) => {
    console.log(response);
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    axios({
      method: "POST",
      url: "http://localhost:8080/auth/googleLogin",
      data: {tokenId: response.tokenId}
    })
    .then(response => {
      console.log("Login successful!", response);
    })
    .catch(err => {
      console.log(err);
    })
  }
  const responseErrorGoogle = (response) =>{
    
  }

  const responseSuccessFacebook = (response) => {
    console.log(response);

    axios({
      method: "POST",
      url: "http://localhost:8080/auth/facebookLogin",
      data: {userID: response.userID,accessToken:response.accessToken}
    })
    .then(response => {
      console.log("Login successful!", response);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="App">
      <h1 className="text-center text-uppercase"> Hello! </h1>
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <div>
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          autoLoad={false}
          callback={responseSuccessFacebook} />
      </div>
    </div>
  );
}

export default App;
