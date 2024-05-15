import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const abilities = [
  " Clairsentient",
  "Clairvoyant",
  " Channeling",
  " Empath",
  "Medium",
  "Dream analyst",
  " Clairaudient",
  "Remote viewing",
  "Automatic writing",
];
//@ts-ignore
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelectForAbilities = ({ onChange }: any) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   // For handling multiple selections and keeping the dropdown open after selection
  //   const value = event.target.value;
  //   //@ts-ignore
  //   setPersonName(typeof value === 'string' ? value.split(',') : value);
  // };

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const value =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;
    //@ts-ignore
    setPersonName(value);
    onChange(value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">Abilities</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Abilities" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {abilities.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectForAbilities;
