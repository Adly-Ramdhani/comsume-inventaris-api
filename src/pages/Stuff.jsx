import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Tabel from "../components/stuff/Tabel"; // Mengganti "Table" menjadi "Tabel"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff() {
    const [Stuffs, setStuffs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getStuffs();
    }, []);

    function getStuffs() {
        axios.get(`${import.meta.env.VITE_API_URL}/stuff/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
            console.log(res.data.data)
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
        "Total Available",
        "Total Defec",
        "Total Barang"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/update/{id}",
        "store": "http://localhost:8000/stuff/store",
    };

    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "category": {
            "tag": "select",
            "type": "select",
            "option": ["KLN", "HTL", "Teknisi/Sarpas"]
        }
    };

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete",
       
    ];

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defec",
        "lendings": "total_stuff"
       
    };
    console.log(tdColumn)

    const columIndentitasDelete = "name";

    return (
        <Case>
            <Tabel
                headers={headers}
                data={Stuffs}
                endpoint={endpointModal}
                inputData={inputData}
                titleModal="Stuff"
                identitasColumn={columIndentitasDelete}
                opsiButton={buttons}
                columnFord={tdColumn}
            />
        </Case>
    );
}
