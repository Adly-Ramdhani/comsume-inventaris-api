import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Tabel from "../components/stuff/Tabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function setStuffsTrash() {
    const [StuffsTrash, setStuffsTrash] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getStuffs();
    }, []);

    function getStuffs() {
        axios.get(`${import.meta.env.VITE_API_URL}/stuff/trash`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffsTrash(res.data.data);
            console.log(setStuffsTrash)
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
        "Name",
        "Category",
    
    ];

    const endpointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanent/{id}",
    };

    const inputData = {};

    const title = 'Stuff'

    const tdColumn = {
        "name": null,
        "category": null,
    };

    const columIndentitasDelete = "name"

    const buttons = [
        "restore",
        "permanenDeletes",
    ]

    return (
        <Case>
                 <Tabel
                    headers={headers}
                    data={StuffsTrash}
                    endpoint={endpointModal}
                    inputData={inputData}
                    titleModal={title}
                    identitasColumn={columIndentitasDelete}
                    opsiButton={buttons}
                    columnFord={tdColumn}
                />

        </Case>
    );
}
