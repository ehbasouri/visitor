import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioForm({items, value, label, onValueChange}) {

  const handleChange = (event) => {
    onValueChange(event.target.value)
  };

  return (
    <FormControl style={{width: "100%"}} component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {items.map((item)=>(
            <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
