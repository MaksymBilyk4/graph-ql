import React, {useEffect, useState} from 'react';
import './App.css';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user"; // Подключаем CSS файл

const App = () => {

    // fragments...

    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS);
    const {data: oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
        variables: {
            id: 9
        }
    });
    const [newUser] = useMutation(CREATE_USER);

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);

    console.log(oneUser);

    const handleUsernameChange = e => setUsername(e.target.value);
    const handleAgeChange = e => setAge(Number(e.target.value));

    useEffect(() => {
        if (!loading) setUsers(data.getAllUsers)
    }, [data]);

    console.log(age)

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }
        ).then(({data}) => {
            console.log(data);
            setUsername("");
            setAge(0);
        }).catch(e => console.log(e));
    }

    const getAll = e => {
        e.preventDefault();
        refetch();
    }

    if (loading) return <h1>LOADING....</h1>

    return (
        <div className="app-container">
            <form className="form-container">
                <input value={username} onChange={handleUsernameChange} type="text" placeholder="name"
                       className="input-field"/>
                <input value={age} onChange={handleAgeChange} type="number" placeholder="age" className="input-field"/>
                <div className="button-group">
                    <button onClick={addUser} type="button" className="form-button">Создать</button>
                    <button onClick={getAll} type="button" className="form-button">Получить</button>
                </div>
            </form>

            <div>
                {users?.map(user =>
                    <div>{user.id} {user.username} {user.age}</div>
                )}
            </div>

        </div>
    );
};

export default App;
