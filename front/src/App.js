import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import {useState} from "react";

function App() {
  const [token, setToken] = useState(null);

  if (token!=null) {
    return <Home token={token}/>;
  } else {
    return <Login setTokenCallback={setToken} />;
  }
}
export default App;
