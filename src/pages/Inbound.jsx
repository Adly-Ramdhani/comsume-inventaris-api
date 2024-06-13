import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Tabel from "../components/inbound/Tabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inbound() {
    const [inbounds, setInbounds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        getInbounds();
    }, []);

    function getInbounds() { 
        axios.get(`${import.meta.env.VITE_API_URL}/inbound-stuff/data`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setInbounds(res.data.data);
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
        "Stuff_id",
        "Date",
        "Total",
        "Proof File",
    ];

    const buttons = [
        "create",
        "edit",
        "delete",
       
    ];

    const inputData = {
        "stuff_id" : {
            "tag": "input", // perbaiki typo di sini
            "type": "input",
            "option": []
        },
      
        "total" : {
            "tag": "input",
            "type": "text",
            "option": null
        },
        "date" : {
            "tag": "input",
            "type": "datetime-local",
            "option": null, 
        },
        "proff_file" : {
            "tag": "input",
            "type": "file",
            "option": null, 
        },
       
    }

    const endpointModal = {
        "data_detail": "http://localhost:8000/inbound-stuff/data/{id}",
        "delete_permanent": "http://localhost:8000/inbound-stuff/permanent/{id}",
        "store": "http://localhost:8000/inbound-stuff/store",
    };

    return (
        <Case>
            <Tabel
                header={headers}
                data={inbounds}
                endpoint={endpointModal}
                opsiButton={buttons}
                inputData={inputData}
            />
        </Case>
    );
}
