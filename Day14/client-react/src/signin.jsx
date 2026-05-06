import { useEffect, useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (errMsg != "") {
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  }, [errMsg]);

  const onTextChange = (args) => {
    var copyOfCredentials = { ...credentials };
    copyOfCredentials[args.target.name] = args.target.value;
    setCredentials(copyOfCredentials);
  };

  const url = "http://localhost:4141/signin";

  const signIn = () => {
    console.log(credentials);
    axios.post(url, credentials).then((result) => {
     
      if (result.data.token) {
        sessionStorage.setItem('token', result.data.token);
        console.log('Token stored in session storage');
        navigate("/dashboard", {replace: true})

      } else {
        setErrMsg(result.data.errMsg)
      }
    })
  };

  return (
    <>
      <div className="table-responsive">
        <h1 className="text-center">Sign In</h1>
        <br />
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <label>Username</label>
              </td>
              <td>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={credentials.username}
                  onChange={onTextChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Password</label>
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={credentials.password}
                  onChange={onTextChange}
                ></input>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="btn btn-primary" onClick={signIn}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}

      <br />
    </>
  );
}

export default SignIn;
