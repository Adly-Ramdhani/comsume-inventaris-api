import { useEffect, useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateLendingRestoration() {
    // ini form2 yg dibutuhin buat create restoration ke backend
    const [forms, setForms] = useState({
        date_time: '',
        total_good_stuff: '',
        total_defac_stuff: '',
    })

    const params = useParams()
    const id = params.id

    const [error, setError] = useState([])

    const navigate = useNavigate()

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': ' Bearer' + localStorage.getItem('access_token'),
        }
    })

    // handle ketika tombol submit di pencet
    const handleLendingRestoration = (event) => {
        event.preventDefault();

        // dia nge hit endpoint restorations ke backend
        instance.post(`/restorations/${id}`, forms)
            .then(res => {
                navigate('/lending');
            })
            .catch(errr => {
                setError(err.response.data.data)
                console.log(err.response)
            })
    }
    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending Restoration</h5>
                    </div>
                    <form onSubmit={handleLendingRestoration} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Time</label>
                            <input type="datetime-local" id="date_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e => setForms({ ...forms, date_time: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="total_good_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Good Stuff</label>
                            <input type="number" id="total_good_stuff" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required onChange={e => setForms({ ...forms, total_good_stuff: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="total_defac_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Defac Stuff</label>
                            <input type="number" id="total_defac_stuff" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required onChange={e => setForms({ ...forms, total_defac_stuff: e.target.value })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    )
}