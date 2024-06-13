import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Tabel from "../components/stuff/Tabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Restoration() {
    const [inrestoresen, setRestoresen] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        getRestoresen();
    }, []);

    function getRestoresen() { 
        axios.get(`${import.meta.env.VITE_API_URL}/restoration/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setRestoresen(res.data.data);
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
        "User-id",
        "Lending-id",
        "Date-time",
        "Total-good-stuff",
        "total-defec-stuff",
    ];

    const tdColumn = {
        "User-id": null,
        "Lending-id":null,
        "Date-time": null,
        "Total-good-stuff": null ,
        "total-defec-stuff": null,
    };

    const buttons = [
        "create",
      
       
    ];

    const columIndentitasDelete = "name";

    return (
        <Case>
            <Tabel
                headers={headers}
                data={inrestoresen}
                titleModal="Lending"
                identitasColumn={columIndentitasDelete}
                columnFord={tdColumn}
                opsiButton={buttons}
            />
        </Case>
    );
}
