import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";

import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import {useNavigate, useParams} from "react-router-dom";


export default function Edit() {
    const paperStyle={padding:'50px 20px',width:700,margin:"20px auto"}
    const[potentialPrice,setPrice]=useState('')
    const[repairDescription,setRepair]=useState('')
    const[status,setStatus]=useState('')
    const[failure,setFailures]=useState([])
    const [potentialDate, setPotential] = React.useState(dayjs());
    const [servicerName, setServicer] = React.useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    const handleClick=async (e)=>{
        e.preventDefault()
        const add={potentialPrice,repairDescription,status,potentialDate,servicerName}
        console.log(add)
        fetch("http://localhost:8080/api/v1/failures/edit/"+id,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(add)
        })
        navigate('/')


    }
    useEffect(() => {

        fetch("http://localhost:8080/api/v1/failures/"+id).then(res=>res.json()).then((result) => {
                setFailures(result);
                console.log(result);
            setPrice(result.potentialPrice);
            setStatus(result.status);
            setRepair(result.repairDescription);
            setServicer(result.servicerName)
            }

        )}, []);

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
                    <h1 style={{color:"blue"}}>Edytuj zgłoszenie</h1>
                    <div>


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
                        />
                        <TextField
                            required
                            value={servicerName}
                            onChange={(e)=>setServicer(e.target.value)}
                            id="servicerName"
                            label="Imie serwisanta"
                        />
                    </div>


                    <Button variant="contained" onClick={handleClick}>Zatwierdź</Button>
                </Paper>

            </Container>
        </Box>
    );
}