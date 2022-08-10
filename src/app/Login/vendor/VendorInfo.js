import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Input,
  InputBase,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { countries } from "../../constants/countries";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const VendorInfo = ({
  onChange,
  values,
  setValues,
  setShouldDisableNext,
  setMoqDetail,
  moqDetail,
}) => {
  const [material, setMaterial] = useState("");

  const locationOnChange = (locations) => {
    locations = locations.map((l) => l.label);
    setValues({
      ...values,
      locations,
    });
  };

  // used for controlling materials input to now allow characters other than alphanumeric and white space chars
  const materialOnChange = (e) => {
    const val = e.target.value;
    const stringOnlyRegEx = /^[a-zA-Z0-9\s]+$/;

    if ((stringOnlyRegEx.test(e.target.value) || val === "") && val !== " ") {
      setMaterial(val);
    }
  };

  const addMaterial = (value) => {
    const materials = [...value].map((v) => v.trim());
    setValues({
      ...values,
      materials,
    });
    setMaterial("");
  };

  const moqOnChange = (e) => {
    const intOnlyRegEx = /^[0-9\b]+$/;
    let isAllowed = true;
    switch (e.target.name) {
      case "min":
      case "max":
        isAllowed = intOnlyRegEx.test(e.target.value);
        break;
      default:
        break;
    }

    if (isAllowed || e.target.value === "") {
      setMoqDetail({
        ...moqDetail,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    }
  };

  const renderFactoryLocationDropdown = () => {
    return (
      <Autocomplete
        id="factory-location-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, val) => option.label === val.label}
        onChange={(e, v) => locationOnChange(v)}
        value={values.locations.map((location) => ({ label: location }))}
        multiple
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Factory locations"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
              },
            }}
          />
        )}
      />
    );
  };

  const renderMaterialsDropdown = () => {
    return (
      <Autocomplete
        id="materials-select"
        sx={{ width: 400 }}
        options={["Rigid Box", "Folding Carton", "Molded Fiber", "Corrugate"]}
        autoHighlight
        inputValue={material}
        onInputChange={materialOnChange}
        onChange={(e, v) => addMaterial(v)}
        value={values.materials}
        multiple
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Manufacturing materials"
            value={material}
            onChange={materialOnChange}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
            helperText="This helps customers to find your company easier."
            FormHelperTextProps={{
              sx: {
                fontSize: 12,
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
              },
            }}
          />
        )}
      />
    );
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 4 }}>
        Since your a vendor, we're going to need a little more information.
      </Typography>
      <Stack spacing={2} textAlign="right">
        <TextField
          label="Typical lead time"
          type="text"
          placeholder="Typical lead time (in months)"
          name="leadTime"
          value={values.leadTime}
          onChange={onChange}
        ></TextField>

        <Box display="flex">
          <TextField
            sx={{ mr: 2, flexBasis: "35%" }}
            label="Minimum order quantity min"
            name="min"
            value={moqDetail.min}
            onChange={moqOnChange}
            helperText="e.g. 5000"
          ></TextField>
          <TextField
            sx={{ flexBasis: "35%" }}
            label="Minimum order quantity max"
            name="max"
            value={moqDetail.max}
            onChange={moqOnChange}
            helperText="e.g. 10000"
          ></TextField>
        </Box>

        {renderMaterialsDropdown()}
        {renderFactoryLocationDropdown()}
      </Stack>
    </>
  );
};

export default VendorInfo;
