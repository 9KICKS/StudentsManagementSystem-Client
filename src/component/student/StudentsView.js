import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "../global/Search";

const StudentsView = () => {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const result = await axios.get(
                "http://localhost:9192/students",
                {
                    validateStatus: () => true,
                }
            );
            if (result.status === 302) {
                setStudents(result.data);
            }
        } catch (error) {
            console.error("Error loading students:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:9192/students/delete/${id}`
            );
            loadStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return (
        <section className="container mt-5">
            <Search search={search} setSearch={setSearch} />

            <table className="table table-bordered table-hover shadow">
                <thead className="thead-dark">
                <tr className="text-center">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th colSpan="3">Actions</th>
                </tr>
                </thead>

                <tbody className="text-center">
                {students
                    .filter((st) =>
                        st.firstName.toLowerCase().includes(search)
                    )
                    .map((student, index) => (
                        <tr key={student.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.department}</td>
                            <td className="action-btn">
                                <Link
                                    to={`/student-profile/${student.id}`}
                                    className="btn btn-info"
                                >
                                    <FaEye />
                                </Link>
                            </td>
                            <td className="action-btn">
                                <Link
                                    to={`/edit-student/${student.id}`}
                                    className="btn btn-warning"
                                >
                                    <FaEdit />
                                </Link>
                            </td>
                            <td className="action-btn">
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        handleDelete(student.id)
                                    }
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default StudentsView;
