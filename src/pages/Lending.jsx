import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Tabel from "../components/stuff/Tabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Lending() {
    const [inlending, setLendings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        getLendings();
    }, []);

    function getLendings() { 
        axios.get(`${import.meta.env.VITE_API_URL}/lending/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setLendings(res.data.data);
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
        "Nama",
        "Barang",
        "Tanggal",
        "Total",
        "Notes",

    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/lending/data",
        "delete": "http://localhost:8000/lending/delete/{id}",
        "update": "http://localhost:8000/lending/update/{id}",
        "store": "http://localhost:8000/lending/store",
        "restore": "http://localhost:8000/restoration/store"
    };

    const inputData = {
        "stuff_id" : {
            "tag": "input", // perbaiki typo di sini
            "type": "input",
            "option": []
        },
        "user_id" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date_time" : {
            "tag": "input",
            "type": "datetime-local",
            "option": null
        },
        "name" : {
            "tag": "input",
            "type": "text",
            "option": null, 
        },
        "notes" : {
            "tag": "input",
            "type": "text",
            "option": null, 
        },
        "total_stuff" : { 
            "tag": "input",
            "type": "text",
            "option": null, 
        },
    }
    // const buttons = [
    //     "create",
    //     "edit",
    //     "delete",
       
    // ];

    const tdColumn = {
        "user": "username",
        "stuff": "name",
        "date_time": null,
        "total_stuff": null,
        "notes": null,
       
    };
    console.log(tdColumn)

    const columIndentitasDelete = "name";

    return (
        <Case>
            <Tabel
                headers={headers}
                data={inlending}
                endpoint={endpointModal}
                inputData={inputData}
                titleModal="Lending"
                identitasColumn={columIndentitasDelete}
                // opsiButton={buttons}
                columnFord={tdColumn}
            />
        </Case>
    );
}
