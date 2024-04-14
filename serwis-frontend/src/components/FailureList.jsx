import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Button, Container, Paper} from "@mui/material";

import * as React from "react";

import {Link, useNavigate, useParams} from "react-router-dom";



export default function List(){

    const paperStyle={padding:'50px 20px',width:1000,margin:"20px auto"}
    const navigate = useNavigate();

    const[failures,setFailures]=useState([])


    const deleteFailure = async (id) => {

        await fetch("http://localhost:8080/api/v1/failures/delete/"+id, {
            method: 'DELETE',
        })
        navigate('/')

    }

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/failures").then(res=>res.json()).then((result) => {
                setFailures(result);
            }
        )}, []);
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{color: "blue"}}>Zgłoszenia</h1>

                </Paper>
                <Paper elevation={3} style={paperStyle}>
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nazwa urządzenia</th>
                            <th scope="col">Typ awarii</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Status awarii</th>
                            <th scope="col">Data zgłoszenia</th>
                            <th scope="col">Szac. Ukończenie</th>
                            <th scope="col">Imię serwisanta</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {failures.map((failure, index) => (
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{failure.name}</td>
                                <td>{failure.failureType}</td>
                                <td>{failure.potentialPrice}</td>
                                <td>{failure.status}</td>
                                <td>{failure.date}</td>
                                <td>{failure.potentialDate}</td>
                                <td>{failure.servicerName}</td>
                                <td>
                                    <Button variant="outlined" onClick={() => deleteFailure(failure.id)}>Usuń</Button>
                                    <Link className="btn btn-outline-primary mx-2" to={`/EditFailure/${failure.id}`}>Edytuj</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Paper>
            </Container>

        </Box>
    );
}