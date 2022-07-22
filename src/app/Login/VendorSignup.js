import { Box, Stack, TextField, Typography, Container, Button, Autocomplete, FormControl, Chip, Input } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { countries } from "../constants/countries";
import "./VendorSignup.scss";

const CREATE_COMPANY = gql`
  mutation createCompany($data: CreateUserInput) {
    createCompany(data: $data) 
  }
`;



const CompanySignup = () => {
  const { user } = useContext(AuthContext);
  const [createCompany] = useMutation(CREATE_COMPANY);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    logo: null,
    phone: "",
    fax: "",
    creditCardNumber: "",
    creditCardExp: "",
    creditCardCvv: "",
    country: null,
    isActive: true,
    isVendor: true,
    isVerified: false,
    leadTime: null,
    locations: [],
    moq: null,
    materials: [],
    companyUrl: "",
    planId: null,
    userEmail: ""
  });

  const [material, setMaterial] = useState("");

  const materialOnChange = (e) => {

    setMaterial(e.target.value);
  }

  const locationOnChange = (locations) => {
    locations = locations.map(l => l.label);
    setValues({
      ...values,
      locations
    });
  }

  const handleMaterialKeyDown = (e) => {
    if (e.keyCode === 13) {
      const materials = [...values.materials];
      materials.push(material);
      setValues({
        ...values,
        materials
      });
      setMaterial("");
    } 
  };



  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  const countryOnChange = (countryObj) => {
    setValues({
      ...values,
      country: countryObj ? countryObj.label : null
    });
  }
  const createCompanyHandler = () => {

    createCompany({
      variables: {
        data: values
      }
    })
    .then(() => {
      
    })
  };

  const handleMaterialsDelete = (i) => {
    const arr = [...values.materials];
    arr.splice(i, 1);
    setValues({
      ...values,
      materials: arr
    });
  }

  const nextPage = () => setCurrentPage(currentPage + 1);
  const previousPage = () => setCurrentPage(currentPage - 1);

  const renderNavigationButtons = () => {
    if (currentPage === 0) {
      return <Button variant="contained" onClick={nextPage}>Next</Button>
    } else if (currentPage < 3) {
      return <>
        <Button variant="primary" onClick={previousPage}>Back</Button>
        <Button variant="contained" onClick={nextPage}>Next</Button>
      </>
    } else {
      return <>
        <Button variant="primary" onClick={previousPage}>Back</Button>
        <Button variant="contained" onClick={createCompanyHandler}>Submit</Button>
      </>
    }
  }

  const renderCountryDropdown = () => {
    return (
      <Autocomplete
        id="country-select"
        sx={{ width: 300 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(e,v) => countryOnChange(v)}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code}) +{option.phone}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Company location"
            name="country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }

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
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
      />
    );
  }

  const renderCompanySignupFlow = () => {
    if (currentPage === 0) {
      return <>
        <Typography>Let's start with your email</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField type="email" placeholder="email" name="userEmail" value={values.userEmail} onChange={onChange}></TextField>

          <Container disableGutters>
            {renderNavigationButtons()}
          </Container>
        </Stack>
      </>
    } else if (currentPage === 1) {
      return <>
        <Typography>Provide your company information</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField required type="company name" placeholder="Company name" name="name" value={values.name} onChange={onChange}></TextField>
          <TextField required type="phone" placeholder="Phone" name="phone" value={values.phone} onChange={onChange}></TextField>
          <TextField type="phone" placeholder="Fax" name="fax" value={values.fax} onChange={onChange}></TextField>
          <TextField type="url" placeholder="Company url" name="companyUrl" value={values.companyUrl} onChange={onChange}></TextField>
          {renderCountryDropdown()}

          
          <Container disableGutters>
            {renderNavigationButtons()}
          </Container>
        </Stack>
      </>
    } else if (currentPage === 2) {
      return <>
        <Typography>Since your a vendor, we're going to need a little more information.</Typography>
        <Stack spacing={2} textAlign="right">
          <TextField type="leadTime" placeholder="Typical lead time" name="leadTime" value={values.leadTime} onChange={onChange}></TextField>
          <TextField type="minimum order quantity" placeholder="Minimum order quantity" name="moq" value={values.moq} onChange={onChange}></TextField>
          
          <div className="form-control-materials">
            <div className="container">
              {values.materials.map((item,index) => (
                <Chip size="small" onDelete={()=>handleMaterialsDelete(index)} label={item} />
              ))}
            </div>
            <Input
              value={material}
              onChange={materialOnChange}
              onKeyDown={handleMaterialKeyDown}
              placeholder="Material"
              disableUnderline
            />
          </div>
          
          {renderFactoryLocationDropdown()}

          <Container disableGutters>
            {renderNavigationButtons()}
          </Container>
        </Stack>
      </>
    }
  }

  if (user) {
    navigate("/") 
  } else {
    return <Container maxWidth="sm">
        {renderCompanySignupFlow()}
    </Container>

  }
}


export default CompanySignup;