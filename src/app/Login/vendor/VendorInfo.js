import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Input,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { countries } from "../../constants/countries";
import AddIcon from "@mui/icons-material/Add";

const VendorInfo = ({ onChange, values, setValues }) => {
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
      materials.push(material);
      setValues({
        ...values,
        materials,
      });
      setMaterial("");
    }
  };

  const materialOnChange = (e) => {
    setMaterial(e.target.value);
  };

  const addMaterial = () => {
    const materials = [...values.materials];
    materials.push(material);
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
          inputProps={{ pattern: "[0-9]*" }}
          type="tel"
          placeholder="Typical lead time (in months)"
          name="leadTime"
          value={values.leadTime}
          onChange={onChange}
        ></TextField>
        <TextField
          label="Minimum order quantity range"
          type="minimum order quantity"
          placeholder="Minimum order quantity"
          name="moq"
          value={values.moq}
          onChange={onChange}
          helperText="e.g. 5000-10000, 6000-8000"
        ></TextField>

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
