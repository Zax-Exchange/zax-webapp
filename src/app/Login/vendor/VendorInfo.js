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
  const [materialInputBorderColor, setMaterialInputBorderColor] =
    useState("lightgray");

  const locationOnChange = (locations) => {
    locations = locations.map((l) => l.label);
    setValues({
      ...values,
      locations,
    });
  };

  const handleMaterialKeyDown = (e) => {
    if (e.keyCode === 13) {
      const materials = [...values.materials];
      materials.push(material.trim());
      setValues({
        ...values,
        materials,
      });
      setMaterial("");
    }
  };

  const materialOnChange = (e) => {
    const val = e.target.value;
    const stringOnlyRegEx = /^[a-zA-Z0-9\s]+$/;

    if (stringOnlyRegEx.test(e.target.value) || val === "") {
      setMaterial(val);
    }
  };

  const addMaterial = () => {
    const materials = [...values.materials];
    materials.push(material.trim());
    setValues({
      ...values,
      materials,
    });
    setMaterial("");
  };

  const handleMaterialsDelete = (i) => {
    const arr = [...values.materials];
    arr.splice(i, 1);
    setValues({
      ...values,
      materials: arr,
    });
  };

  const materialOnFocus = (e) => {
    setMaterialInputBorderColor("rgba(0, 0, 0, 0.87)");
  };
  const materialonBlur = (e) => {
    setMaterialInputBorderColor("lightgray");
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
        [e.target.name]: e.target.value,
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
        onChange={(e, v) => locationOnChange(v)}
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

        <Box>
          <TextField
            label="Minimum order quantity min"
            name="min"
            value={moqDetail.min}
            onChange={moqOnChange}
            helperText="e.g. 5000"
          ></TextField>
          <TextField
            label="Minimum order quantity max"
            name="max"
            value={moqDetail.max}
            onChange={moqOnChange}
            helperText="e.g. 10000"
          ></TextField>
        </Box>

        <ListItem disableGutters>
          <div
            className="form-control-materials"
            style={{ borderColor: materialInputBorderColor }}
          >
            <div className="container">
              {values.materials.map((item, index) => (
                <Chip
                  size="small"
                  onDelete={() => handleMaterialsDelete(index)}
                  label={item}
                />
              ))}
            </div>
            <Input
              value={material}
              onChange={materialOnChange}
              onKeyDown={handleMaterialKeyDown}
              placeholder="Material"
              inputProps={{
                onFocus: materialOnFocus,
                onBlur: materialonBlur,
              }}
              disableUnderline
            />
          </div>
          <IconButton onClick={addMaterial} disabled={material.length === 0}>
            <AddIcon />
          </IconButton>
        </ListItem>
        {renderFactoryLocationDropdown()}
      </Stack>
    </>
  );
};

export default VendorInfo;
