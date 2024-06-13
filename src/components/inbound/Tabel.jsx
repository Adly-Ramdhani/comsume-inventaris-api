import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalAdd from "./ModalAdd"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Tabel({ header = [], data = [], endpoint, opsiButton, inputData, titleModal}) {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [endpointToSend, setEndpointToSend] = useState({});
  const [selectedItem, setSelectedItem] = useState({});

  function handlePermanentDelete(id) {
    const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}", id);
    axios.delete(endpointPermanentDelete, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        }
    })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                setError(err.response.data);
            }
        });
  }
   
  function handleModalAdd() {
    const endpointToSend = {
        "store": endpoint['store']
    }

    setEndpointToSend(endpointToSend);
    setIsModalAddOpen(true);
}

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
        <div className="flex justify-end">
                    {opsiButton.includes("create") && (
                 <Link to={'/inbound/create'} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">
                      create
                  </Link>
                    )}
                 
       </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {header.map((headerItem, index) => (
              <th scope="col" className="px-6 py-3" key={index}>{headerItem}</th>
            ))}
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}.</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.stuff_id}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.date}</td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total}</td>
              <a  href={`http://localhost:8000/proff/${item.proff_file}`} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.proff_file ? (
                  <img 
                    src={`http://localhost:8000/proff/${item.proff_file}`} height={50} width={90} 
                  />
                ) : 'No File'}
              </a>
              <td className="px-6 py-4 text-right">
                <button type="button" onClick={() => handlePermanentDelete(item.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
        <ModalDelete
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          endpoint={endpointToSend}
          identitasColumn="stuff_id"
          titleModal="Hapus Barang"
        />
        
      
    </div>
  );
}
