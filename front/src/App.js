import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import {useState} from "react";

function App() {
  const [token, setToken] = useState(null);

  console.log(token);

  if (token!=null) {
    console.log(token)
    return <Home />;
  } else {
    return <Login setTokenCallback={setToken} />;
  }
}
export default App;
