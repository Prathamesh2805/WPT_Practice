import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
  const [emp, setEmp] = useState({ no: 0, name: "", address: "" });
  const [emps, setEmps] = useState([]);

  const navigate = useNavigate();

  const url = "http://localhost:4141/employees";

  const logOut = () => {
    sessionStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  const edit = (empToBeEdited) => {
    var copyOfEmp = empToBeEdited;
    setEmp(copyOfEmp)
  };

  const addRecord = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(url, emp, { headers: { Authorization: "bearer " + token } })
      .then((result) => {
        if (result.data.affectedRows > 0) {
          setEmp({ no: 0, name: "", address: "" });
          getData();
        } else {
          alert("Something went wrong!");
        }
      });
  };

  const updateRecord = ()=>{
    const token = sessionStorage.getItem('token');

    axios
    .put(url + `/${emp.no}`, emp, {headers: {Authorization: "bearer " + token}})
    .then((result)=>{
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

  const deleteRecord = (empToDelete)=>{
    const token = sessionStorage.getItem('token');

    axios
    .delete(url + `/${empToDelete.no}`, {headers: {Authorization: "bearer " + token}})
    .then((result)=>{
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

  const onTextChange = (args) => {
    const copyOfEmp = { ...emp };
    copyOfEmp[args.target.name] = args.target.value;
    setEmp(copyOfEmp);
  };

  const getData = () => {
    var token = sessionStorage.getItem("token");
    axios
      .get(url, { headers: { Authorization: "bearer " + token } })
      .then((result) => {
        console.log(result.data);
        setEmps(result.data);
      })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <h2>Welcome to dashboard</h2>

        <button className="btn btn-danger mb-2" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="table-responsive mb-3">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={emp.name}
                  onChange={onTextChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Address</label>
              </td>
              <td>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={emp.address}
                  onChange={onTextChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button className="btn btn-primary me-3" onClick={addRecord}>
                  Add record
                </button>
                <button className="btn btn-success me-3" onClick={updateRecord}>Update record</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <td>No</td>
              <td>Name</td>
              <td>Address</td>
              <td>Actions</td>
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
                    <button className="btn btn-warning me-3" onClick={()=>{
                      edit(emp)
                    }}>
                      Edit
                    </button>
                    <button className="btn btn-danger me-3"onClick={()=>{
                      deleteRecord(emp)
                    }}>Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
