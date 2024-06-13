import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Tabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function User() { 
    const [inuser, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        getUsers();
    }, []);

    function getUsers() { 
        axios.get(`${import.meta.env.VITE_API_URL}/user/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
    }

    const headers = [
        "No",
        "username",
        "Email",
        "Role",

    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/user/data",
        "delete": "http://localhost:8000/user/delete/{id}",
        "update": "http://localhost:8000/user/update/{id}",
        "store": "http://localhost:8000/user/store",
    };

    const inputData = {
        "username": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "email": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "password": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "role": {
            "tag": "select",
            "type": "select",
            "option": ["staff", "admin"]
        }
    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
       
    ];

    const tdColumn = {
        "username": null,
        "email": null,
        "role": null,
      
       
    };
    console.log(tdColumn)

    const columIndentitasDelete = "name";

    return (
        <Case>
            <Table
                headers={headers}
                data={inuser}
                endpoint={endpointModal}
                inputData={inputData}
                titleModal="User"
                identitasColumn={columIndentitasDelete}
                opsiButton={buttons}
                columnFord={tdColumn}
            />
        </Case>
    );
}

