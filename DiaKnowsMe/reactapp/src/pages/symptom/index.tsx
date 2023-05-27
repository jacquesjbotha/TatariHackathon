import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

export default function Symptom() {
  return (

    <div>
      <h1>Patient Personal Details</h1>
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Name</FormLabel>
      <TextField id="outlined-basic" label="e.g. John Smith" variant="outlined" />
      <FormLabel id="demo-radio-buttons-group-label">Age</FormLabel>
      <TextField id="outlined-basic" label="e.g. 25" variant="outlined" />

      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <FormLabel id="demo-radio-buttons-group-label">Symptom</FormLabel>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

      <Button variant="contained" >
        Submit
      </Button>

        
    </FormControl>


    </div>
    


  )
}


