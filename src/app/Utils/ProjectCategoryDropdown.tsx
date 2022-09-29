import React, { useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../../generated/graphql";
import { categories } from "../constants/categories";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useIntl } from "react-intl";

const ProjectCategoryDropdown = ({
  defaultCategory,
  parentSetDataCallback,
  width = "auto",
  label = "",
  error = false,
  errorHelperText = "",
}: {
  defaultCategory: string;
  parentSetDataCallback: (category: string) => void;
  width?: string;
  label?: string;
  error?: boolean;
  errorHelperText?: string;
}) => {
  const intl = useIntl();
  const [curList, setCurList] = useState([...categories]);
  const [selectedCat, setSelectedCat] = useState<any>(null);
  const [catListOpen, setCatListOpen] = useState(false);
  const [categoryBreadcrumb, setCategoryBreadcrumb] = useState<string[]>([]);
  const [prevCatList, setPrevCatList] = useState<any[]>([]);
  console.log(defaultCategory);
  const renderCategoryDropdown = () => {
    const categoryOnClick = (cat: string, subCats: any) => {
      if (!subCats.length) {
        parentSetDataCallback(cat);
        setSelectedCat(cat);
        setCatListOpen(false);
        return;
      }
      const prevCats = [...prevCatList];
      prevCats.push([...curList]);
      setPrevCatList(prevCats);

      const prevBread = [...categoryBreadcrumb];
      prevBread.push(cat);
      setCategoryBreadcrumb(prevBread);

      setCurList([...subCats]);
      setCatListOpen(true);
    };

    return (
      <Autocomplete
        open={catListOpen}
        onFocus={() => setCatListOpen(true)}
        onBlur={() => setCatListOpen(false)}
        options={curList}
        sx={{
          width,
        }}
        value={selectedCat}
        isOptionEqualToValue={(option, value) => option.name === value}
        onClose={() => {
          setCurList([...categories]);

          setPrevCatList([]);
          setCategoryBreadcrumb([]);
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          return option.name;
        }}
        onChange={(e, v) => {
          if (!v) {
            setPrevCatList([]);
            parentSetDataCallback("");
            setCategoryBreadcrumb([]);
            setCurList([...categories]);
            setSelectedCat(null);
            setCatListOpen(true);
          }
        }}
        groupBy={(option) => {
          return categoryBreadcrumb.join(" > ");
        }}
        renderGroup={(params) => {
          return (
            <Box component="ul" sx={{ padding: "4px 8px" }}>
              {!!categoryBreadcrumb.length && (
                <Box
                  component="li"
                  sx={{
                    ":hover": {
                      backgroundColor: "#eee",
                    },
                    height: "40px",
                    cursor: "pointer",
                    listStyle: "none",
                    display: "flex",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    const prevCats = [...prevCatList];
                    const prevBread = [...categoryBreadcrumb];
                    prevBread.pop();
                    setCurList(prevCats.pop());
                    setPrevCatList(prevCats);
                    setCategoryBreadcrumb(prevBread);
                  }}
                >
                  <Box display="flex" alignItems="center" mr={1.5}>
                    <ArrowBackIcon />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                      {categoryBreadcrumb.join(" > ")}
                    </Typography>
                  </Box>
                </Box>
              )}
              {params.children}
            </Box>
          );
        }}
        renderOption={(props, option) => {
          return (
            <Box
              {...props}
              component="li"
              onClick={() => categoryOnClick(option.name, option.children)}
              sx={{ borderRadius: "4px" }}
            >
              <Box flexBasis="99%">{option.name}</Box>

              <Box display="flex">
                {!!option.children.length ? (
                  <KeyboardArrowRightIcon />
                ) : (
                  <AddCircleOutlineIcon />
                )}
              </Box>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            helperText={errorHelperText}
            placeholder={defaultCategory}
            autoComplete="new-password"
            label={label}
            InputLabelProps={{
              sx: {
                fontSize: 16,
                top: -7,
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
      />
    );
  };

  return renderCategoryDropdown();
};

export default ProjectCategoryDropdown;
