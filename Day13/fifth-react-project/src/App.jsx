import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [emp, setEmp] = useState({ id: 0, name: "", address: "" });
  const [emps, setEmps] = useState([]);

  var url = "http://localhost:4141/employees";

  const getData = () => {
    axios.get(url).then((result) => {
      setEmps(result.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const addRecord = () => {
    axios.post(url, emp).then((result) => {
      if (result.data.affectedRows > 0) {
        setEmp({ no: 0, name: "", address: "" });
        getData();
      }
      else
      {
        alert('something wrong!')
      }
    });
  };

  const onTextChange = (args) => {
    var copyOfEmp = {...emp}
    copyOfEmp[args.target.name] = args.target.value;
    setEmp(copyOfEmp)
  };

  return (
    <>
      <label>Name</label>
      <input type="text" name="name" value={emp.name} onChange={onTextChange} />
      <br />
      <br />
      <label>Address</label>
      <input
        type="text"
        name="address"
        value={emp.address}
        onChange={onTextChange}
      />

      <hr />

      <button onClick={addRecord}>Add record</button>

      <hr />

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.address}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
