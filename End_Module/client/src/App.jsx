import("../node_modules/bootstrap/dist/css/bootstrap.min.css");
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [emp, setEmp] = useState({ no: 0, name: "", address: "" });
  const [emps, setEmps] = useState([]);

  const url = "http://localhost:4141/employee";

  const getData = () => {
    axios.get(url).then((result) => {
      setEmps(result.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const edit = (empToBeEdited) => {
    setEmp(empToBeEdited);
  };

  const onTextChange = (args) => {
    const copyOfEmp = { ...emp };
    copyOfEmp[args.target.name] = args.target.value;
    setEmp(copyOfEmp);
  };

  const addRecord = ()=>{
    axios.post(url, emp).then((result)=>{
      if(result.data.affectedRows > 0){
        setEmp({no:0, name:"", address:""})
        getData();
      }
      else
      {
        alert("Something went wrong!")
      }
    })
  }

  const updateRecord = ()=>{
    axios.put(url + `/${emp.no}`,emp).then((result)=>{
      if(result.data.affectedRows > 0){
        setEmp({no:0, name:"", address:""})
        getData();
      }else
      {
        alert("Something went wrong!")
      }
    })
  }

  const deleteRecord = (empToBeDeleted)=>{
    axios.delete(url + `/${empToBeDeleted.no}`).then((result)=>{
      if(result.data.affectedRows > 0){
        setEmp({no:0, name:"", address:""})
        getData();
      }else
      {
        alert("Something went wrong!")
      }
    })
  }

  return (
    <div className="container text-center">
      <div className="table-responsive">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>No</td>
              <td>
                <input
                  type="text"
                  value={emp.no}
                  onChange={onTextChange}
                  name="no"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>
                <input
                  type="text"
                  value={emp.name}
                  onChange={onTextChange}
                  name="name"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <input
                  type="text"
                  value={emp.address}
                  onChange={onTextChange}
                  name="address"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="btn btn-primary" onClick={addRecord}>Add Record</button>{" "}
                <button className="btn btn-success" onClick={updateRecord}>Update Record</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => {
              return (
                <tr key={emp.no}>
                  <td>{emp.no}</td>
                  <td>{emp.name}</td>
                  <td>{emp.address}</td>
                  <td>
                    <button
                      className="btn btn-warning me-3"
                      onClick={() => {
                        edit(emp);
                      }}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger me-3" onClick={()=>{
                      deleteRecord(emp)
                    }}>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
