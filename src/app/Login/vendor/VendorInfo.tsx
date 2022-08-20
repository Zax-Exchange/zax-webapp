import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { countries } from "../../constants/countries";
import { isValidAlphanumeric, isValidInt } from "../../Utils/inputValidators";
import { Country } from "../customer/CustomerSignup";
import { MoqDetail, VendorSignupData } from "./VendorSignup";

const VendorInfo = ({
  values,
  setValues,
  onChange,
  setShouldDisableNext,
  setMoqDetail,
  moqDetail,
}: {
  values: VendorSignupData;
  setValues: React.Dispatch<React.SetStateAction<VendorSignupData>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShouldDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
  setMoqDetail: React.Dispatch<React.SetStateAction<MoqDetail>>;
moqDetail: MoqDetail;
}) => {
  const [material, setMaterial] = useState("");

  const locationOnChange = (locations: { label: string }[]) => {
    const locationLabels = locations.map((l) => l.label);
    setValues({
      ...values,
      locations: locationLabels
    });
  };

  // used for controlling materials input to now allow characters other than alphanumeric and white space chars
  const materialOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value || "";

    if (isValidAlphanumeric(val)) {
      setMaterial(val);
    }
  };

  const addMaterial = (value: string[]) => {
    const materials = [...value].map((v) => v.trim());
    setValues({
      ...values,
      materials,
    });
    setMaterial("");
  };

  const moqOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;
    switch (e.target.name) {
      case "min":
      case "max":
        isAllowed = isValidInt(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setMoqDetail({
        ...moqDetail,
        [e.target.name]: parseInt(val, 10),
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
      <Stack spacing={3} textAlign="right">
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
