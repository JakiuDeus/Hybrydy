import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel, MenuItem,
    Paper,
    Radio,
    RadioGroup, Select
} from "@mui/material";
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
    const[predictedPrice,setPredicted]=useState('')
    const[repairDescription,setRepair]=useState('')
    const[status,setStatus]=useState('')
    const[failureType,setFailure]=useState('')
    const[numberFailureType, setNumberFailure]=useState('')
    const [date, setDate] = React.useState(dayjs());
    const [potentialDate, setPotential] = React.useState(dayjs());
    const [servicerName, setServicer] = React.useState('');
    const [errorMessage , setErrorMessage] = React.useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [model, setModel] = useState('')
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

    const handlePrediction = async (e) => {
        e.preventDefault()
        if (failureType.trim() === '' ) {
            setErrorMessage('Aby oszacować, podaj Failure Type, Potential Date oraz Date');
            return;
        }
        const msPerDay = 1000 * 60 * 60 * 24;
        const diffDays = Math.abs(Math.round((date - potentialDate) / msPerDay));
        try {
            const body_data = {numberFailureType, diffDays}
            const response = await fetch(`http://localhost:5000/api/v1/${model}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body:JSON.stringify(body_data)
            });
            const result = await response.text();
            const predictedPrice = parseFloat(result);
            document.getElementById('predictedPrice').value = predictedPrice.toFixed(2);
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error making prediction');
        }
    }

    const handleFailureChange = (event) => {
        setFailure(event.target.value);
        switch (failureType) {
            case 'LOW':
                setNumberFailure(0);
            case 'MILD':
                setNumberFailure(1);
            case 'HIGH':
                setNumberFailure(2);
            default:
                setNumberFailure(3);
        }
        if (event.target.value!== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

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

                        onChange={(event) => {
                            handleFailureChange(event);

                        }}
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
                    disabled
                    id="predictedPrice"
                    value={predictedPrice}
                    onChange={(e)=>setPredicted(e.target.value)}
                    label="Szacowany koszt przez AI"
                    type="number"
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Wybierz model AI</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={model}
                        label="Age"
                        onChange={event => setModel(event.target.value)}
                        sx={{ width: 200 }}
                    >
                        <MenuItem value={0}>Random Forest Regression</MenuItem>
                        <MenuItem value={1}>Random Forest Classifier</MenuItem>
                        <MenuItem value={2}>Linear Regression</MenuItem>
                        <MenuItem value={3}>Logystic Regression</MenuItem>
                        <MenuItem value={4}>Decision Tree Clasifier</MenuItem>
                    </Select>
                </FormControl>
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
                    <Button variant="contained" onClick={handlePrediction} disabled={isButtonDisabled}>Szacuj</Button>
                </Paper>

            </Container>
        </Box>
    );
}