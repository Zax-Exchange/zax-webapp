import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

let autocompleteService: null | google.maps.places.AutocompleteService = null;

let placesService: null | google.maps.places.PlacesService = null;

export default function GoogleMaps({
  parentSetDataHandler,
  defaultAddress = "",
  width = "auto",
  height = "auto",
  label = "",
  error = false,
  errorHelperText = "",
}: {
  parentSetDataHandler: (address: string, country: string) => void;
  defaultAddress?: string;
  width?: string | number;
  height?: string | number;
  label?: string;
  error?: boolean;
  errorHelperText?: string;
}) {
  const [value, setValue] =
    React.useState<google.maps.places.QueryAutocompletePrediction | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<
    google.maps.places.QueryAutocompletePrediction[]
  >([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle(
        (
          request: { input: string },
          callback: (
            results: google.maps.places.QueryAutocompletePrediction[] | null
          ) => void
        ) => {
          if (autocompleteService) {
            autocompleteService.getPlacePredictions(request, callback);
          }
        },
        200
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService && (window as any).google) {
      autocompleteService = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }

    if (!placesService && (window as any).google) {
      placesService = new (window as any).google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
    if (!autocompleteService) {
      return;
    }

    if (inputValue === "") {
      setOptions([]);
      return;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions: google.maps.places.QueryAutocompletePrediction[] = [];

        if (value && results) {
          newOptions = [...results];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getCountryValue = (
    selectedPlace: google.maps.places.QueryAutocompletePrediction | null
  ) => {
    if (placesService && selectedPlace) {
      placesService.getDetails(
        {
          placeId: selectedPlace.place_id || "",
          fields: ["address_component"],
        },
        (place: google.maps.places.PlaceResult | null, status: any) => {
          if (place && place.address_components) {
            for (let comp of place.address_components) {
              if (comp.types.includes("country")) {
                parentSetDataHandler(selectedPlace.description, comp.long_name);
              }
            }
          }
        }
      );
    }
    return "";
  };

  return (
    <Autocomplete
      sx={{ width }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value ? value : defaultAddress ? (defaultAddress as any) : null}
      inputValue={inputValue}
      onChange={(
        event: any,
        newValue: google.maps.places.QueryAutocompletePrediction | null
      ) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        parentSetDataHandler(
          newValue ? newValue.description : "",
          getCountryValue(newValue)
        );
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={errorHelperText}
          fullWidth
          InputLabelProps={{
            sx: {
              fontSize: 16,
              top: -7,
              "& .MuiInputBase-root": {
                height,
              },
            },
          }}
          FormHelperTextProps={{
            sx: {
              margin: 0,
              fontSize: "0.7em",
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );
        return (
          <li {...props} key={option.description}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: "text.secondary", mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
