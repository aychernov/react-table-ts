import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import {IUser} from "./components/Types";
import Table from "./components/Table";
import {Column} from "react-table";


function App() {
    const [columns] = useState(Array<Column>)
    const [data, setData] = useState<IUser[]>([])

    // Получение данных по апи на основе определённых типов
    const fetchData = async () => {
        const url = 'https://jsonplaceholder.typicode.com/users'
        const response = await axios.get <IUser[]>(url)
        setData(response.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
            <Table data={data} columns={columns}/>
        // columns={columns} ??? "can`t find name" UPD DONE! => Поправил с помощью стейта для columns! :Строка 10
    );
}

export default App;
