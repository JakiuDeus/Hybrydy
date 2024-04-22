import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from "@mui/material";
import { useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";


export default function Add() {
    const paperStyle={padding:'50px 20px',width:800,margin:"20px auto"}
    const[name,setName]=useState('')
    const[potentialPrice,setPrice]=useState('')
    const[repairDescription,setRepair]=useState('')
    const[status,setStatus]=useState('')
    const[failureType,setFailure]=useState('')
    const [date, setDate] = React.useState(dayjs());
    const [potentialDate, setPotential] = React.useState(dayjs());
    const [servicerName, setServicer] = React.useState('');
    const [errorMessage , setErrorMessage] = React.useState('')
    const navigate = useNavigate();

     const handleClick=async (e)=>{
         e.preventDefault()
         if(name.trim() === '' || potentialPrice.trim() === '' || servicerName.trim() === ''){
             setErrorMessage('Pola: Imię serwisanta, Nazwa urządzenia oraz Szacowany koszt są wymagane');
             return;
         }
         const add={name,potentialPrice,failureType,repairDescription,status,potentialDate, date,servicerName}
         console.log(add)
         await fetch("http://localhost:8080/api/v1/failures/new-failure",{
             method:"POST",
             headers:{"content-type":"application/json"},
             body:JSON.stringify(add)
         })
         setErrorMessage('');
         navigate('/')
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{color:"blue"}}>Dodaj zgłoszenie</h1>
            <div>
                <TextField
                    required
                    value={servicerName}
                    onChange={(e)=>setServicer(e.target.value)}
                    id="servicerName"
                    label="Imie serwisanta"
                />
                <TextField
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    id="name"
                    label="Nazwa urządzenia"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Data zgłoszenia"
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                    />
                </LocalizationProvider>
                <FormControl>
                    <FormLabel id="failure_type">Rodzaj awarii</FormLabel>
                    <RadioGroup
                        aria-labelledby="failure_type"
                        value={failureType}
                        onChange={(e)=>setFailure(e.target.value)}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="LOW" control={<Radio />} label="Niewielka" />
                        <FormControlLabel value="MILD" control={<Radio />} label="Średnia" />
                        <FormControlLabel value="HIGH" control={<Radio />} label="Poważna" />
                        <FormControlLabel value="CRITICAL" control={<Radio />} label="Krytyczna" />
                    </RadioGroup>
                </FormControl>


                <FormControl>
                    <FormLabel id="status">Status naprawy</FormLabel>
                    <RadioGroup
                        aria-labelledby="status"
                        name="radio-buttons-group"
                        value={status}
                        onChange={(e)=>setStatus(e.target.value)}
                    >
                        <FormControlLabel value="NEW" control={<Radio />} label="Nowe" />
                        <FormControlLabel value="IN_PROGRESS" control={<Radio />} label="W trakcie" />
                        <FormControlLabel value="FINISHED" control={<Radio />} label="Ukończone" />
                        <FormControlLabel value="UNREPAIRABLE" control={<Radio />} label="Nie do naprawy" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    required
                    id="price"
                    value={potentialPrice}
                    onChange={(e)=>setPrice(e.target.value)}
                    label="Szacowany koszt"
                    type="number"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Szac. ukończenie"
                        value={potentialDate}
                        onChange={(newValue) => setPotential(newValue)}
                    />
                </LocalizationProvider>
                <TextField
                    id="repair_description"
                    value={repairDescription}
                    label="Opis podjętych działań"
                    onChange={(e)=>setRepair(e.target.value)}
                    fullWidth={false}
                    style = {{width: 750, height: "auto"}}
                    multiline={true}
                />

            </div>

                    {errorMessage && <p>{errorMessage}</p>}
                    <Button variant="contained" onClick={handleClick}>Zatwierdź</Button>
                </Paper>

            </Container>
        </Box>
    );
}