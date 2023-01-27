import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Manageemployees = () => {
  const [input, setinput] = useState({});
  const [employees, setemployees] = useState([]);
  const employeedata = useRef();
  const editform = useRef();
  const addform = useRef();
  const [id, setid] = useState();

  const fetchEmployees = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL1)
      .then((res) => {
        setemployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setinput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post(process.env.REACT_APP_API_URL1, input);
      console.log(input);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(process.env.REACT_APP_API_URL2 + id)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    console.log(id);
    window.location.reload();
  };

  const handleEdit = (employeeid) => {
    employeedata.current.style.display = "none";
    addform.current.style.display = "none";
    editform.current.style.display = "block";
    setid(employeeid);
  };

  const handlesave = async (e) => {
    await axios
      .put(process.env.REACT_APP_API_URL2 + id, input)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container-fluid bg-dark" ref={addform}>
        <form className="addemployee">
          <div className="form-input">
            <input
              className="form-control"
              type="text"
              name="fname"
              placeholder="Firstname:"
              onChange={handleChange}
              required
            />
            <input
              className="form-control"
              type="text"
              name="lname"
              placeholder="Lastname:"
              onChange={handleChange}
              required
            />
            <input
              className="form-control"
              type="text"
              name="age"
              placeholder="Age:"
              onChange={handleChange}
              required
            />
            <input
              className="form-control"
              type="text"
              name="pos"
              placeholder="Position:"
              onChange={handleChange}
              required
            />
            <input
              className="form-control"
              type="text"
              name="email"
              placeholder="Email:"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-submit">
            <button className="btn btn-primary" id="add" onClick={handleSubmit}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <table className="table table-bordered" ref={employeedata}>
          <thead>
            <tr className="bg-warning">
              <th scope="col" id="id" data-atr="id">
                id
              </th>
              <th scope="col" id="fname">
                Firstname:
              </th>
              <th scope="col" id="lname">
                Lastname:
              </th>
              <th scope="col" id="age">
                Age:
              </th>
              <th scope="col" id="pos">
                Position:
              </th>
              <th scope="col" id="email">
                Email:
              </th>
              <th scope="col" id="action" data-atr="actions">
                Actions:
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <th scope="row" id="id">
                    {employee.id}
                  </th>
                  <td id="fname">{employee.fname}</td>
                  <td id="lname">{employee.lname}</td>
                  <td id="age">{employee.age}</td>
                  <td id="pos">{employee.pos}</td>
                  <td id="email">{employee.email}</td>
                  <td id="action" className="actions">
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        handleEdit(employee.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(employee.id);
                        console.log(employee.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="container" ref={editform} style={{ display: "none" }}>
          <form className="edit-form">
            <div className="edit-form-input">
              <input
                className="form-control"
                type="text"
                name="fname"
                placeholder="Firstname:"
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="lname"
                placeholder="Lastname:"
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="age"
                placeholder="Age:"
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="pos"
                placeholder="Position:"
                onChange={handleChange}
                required
              />
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email:"
                onChange={handleChange}
                required
              />
              <button
                className="btn btn-primary"
                id="save"
                type="submit"
                onClick={handlesave}
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
        <div className="github">
          <a
            href="https://github.com/yassirelkhaili"
            className="link-info"
            target="_blank"
            rel="noreferrer"
          >
            Source Code on Github
          </a>
        </div>
      </div>
    </>
  );
};

export default Manageemployees;
