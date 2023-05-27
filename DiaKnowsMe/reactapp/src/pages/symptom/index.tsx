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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Additional from "../additional/index";

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
  const [response, setResponse] = React.useState<String>();
  const [additional, setAdditional] = React.useState<String>();

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

    const handleAdditionalChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setAdditional(event.target.value);
      };

    

  const handleSubmit = 
  () =>{
    const query = Object({
      patientName: username,
      age: userAge,
      gender: userGender,
      symptoms: userSymptom
    }) 
    // Send data to the backend via POST
    if (additional){
      const additionalQuery = Object({
        ...query,
        additionalInfo: additional
      });
      axios.post('https://diaknowsmeapi.azurewebsites.net/GPT/Diagnose', additionalQuery)
      .then ((res) => {
        setResponse(res.data.likelyIssue);
        // console.log(res.data.triageResponse);
      })

    }
    else{
    axios.post('https://diaknowsmeapi.azurewebsites.net/GPT/InitialTriage',query) 
      .then ((res) =>{
        setResponse(res.data.triageResponse);
        console.log(res.data.triageResponse);
      })
    }
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


      {response && <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Answer from ChatGPT:
                      </Typography>
                      <Typography variant="body2">
                        {response}
                        <br />
                      </Typography>
                    </CardContent>
                  </Card>
      }
    <br />
      {response &&   <TextField 
                      id="outlined-basic" 
                      label="Additonal Input" 
                      variant="outlined"
                      onChange ={handleAdditionalChange} />}

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


