import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
    });

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        });
    };

    const saveStudent = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:9192/students", student);
        navigate("/view-students");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Add Student</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => saveStudent(e)}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                required
                                value={student.firstName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                required
                                value={student.lastName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Your Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                                value={student.email}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="department" className="form-label">
                                Department
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="department"
                                name="department"
                                required
                                value={student.department}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                        <div className="row">
                            <div className="col-sm-2">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg">
                                    Save
                                </button>
                            </div>

                            <div className="col-sm-2">
                                <Link
                                    to="/view-students"
                                    className="btn btn-warning btn-lg">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;
