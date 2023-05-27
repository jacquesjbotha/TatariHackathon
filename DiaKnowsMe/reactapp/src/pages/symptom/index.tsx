import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {useRouter} from 'next/navigation';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type userProps = {
  user: String,
  userAge: String,
  userGender: String,
  userSymptom: String,  
}

export default function Symptom() {
  const [username, setUsername] = React.useState<String>();
  const [userAge, setUserAge] = React.useState<String>();
  const [userGender, setUserGender] = React.useState<String>();
  const [userSymptom, setUserSymptom] = React.useState<String>();
  // const navigate = useNavigate();
  const router =useRouter();

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsername(event.target.value);
  };

  const handleAgeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setUserAge(event.target.value);
  };

  const handleGenderChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserGender(event.target.value);
  };

  const handleSymptomChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setUserSymptom(event.target.value);
    };


  const handleSubmit = () =>{
    const query = Object({
      patientName: username,
      age: userAge,
      gender: userGender,
      symptoms: userSymptom
    }) 
    router.push("/additional", query);
    // Send data to the backend via POST
    axios.post('https://diaknowsmeapi.azurewebsites.net/GPT/InitialTriage',query) 
      .then ((res) =>{
        console.log(res);
      })
    };


  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
    <div>
      <h2>Patient Personal Details</h2>
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Name</FormLabel>
      <TextField 
        id="outlined-basic" 
        label="e.g. John Smith" 
        variant="outlined"
        onChange={handleUsernameChange} />
      <FormLabel id="demo-radio-buttons-group-label">Age</FormLabel>
      <TextField 
        id="outlined-basic" 
        label="e.g. 25" 
        variant="outlined" 
        onChange={handleAgeChange}/>

      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleGenderChange}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>

      <FormLabel id="demo-radio-buttons-group-label">Symptom</FormLabel>
      <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"
        onChange ={handleSymptomChange} />
      <br></br>
      <Button variant="contained"  
      onClick={handleSubmit}
      >
        Submit
      </Button>      
    </FormControl>
    </div>
    </Container>
    
    </React.Fragment>

  )
}


