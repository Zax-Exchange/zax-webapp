import React, { useEffect, useState } from "react";

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

type Category = {
  name: string;
  children: Category[];
};

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
  const [curList, setCurList] = useState<Category[]>([...categories]);
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [catListOpen, setCatListOpen] = useState(false);
  const [categoryBreadcrumb, setCategoryBreadcrumb] = useState<string[]>([]);
  const [prevCatList, setPrevCatList] = useState<Category[][]>([]);

  // If there is defaultCategory, find the category and set prevList and breadcrumbs accordingly
  useEffect(() => {
    if (defaultCategory) {
      findCategory(defaultCategory, [...categories], [], []);
    }
  }, [defaultCategory]);

  // saves current category list to prevList so user can go back if needed
  const saveCurrentList = () => {
    const prevCats = [...prevCatList];

    setPrevCatList([...prevCatList, curList]);
  };

  // saves given category to breadcrumb list
  const saveCurrentCategory = (cat: string) => {
    const prevBread = [...categoryBreadcrumb];
    prevBread.push(cat);
    setCategoryBreadcrumb(prevBread);
  };

  const resetCategoryList = () => {
    setCurList([...categories]);

    setPrevCatList([]);
    setCategoryBreadcrumb([]);
  };

  // find category object based on given targetCat recursively
  const findCategory = (
    targetCat: string,
    list: Category[],
    prevList: Category[][],
    breadcrumb: string[]
  ): Category | null => {
    for (let category of list) {
      if (category.name === targetCat) {
        setPrevCatList([...prevList]);
        setCategoryBreadcrumb([...breadcrumb]);
        setSelectedCat(category);
        setCurList(list);
        return category;
      } else {
        if (category.children.length) {
          const res: Category | null = findCategory(
            targetCat,
            category.children,
            [...prevList, list],
            [...breadcrumb, category.name]
          );
          if (res) return res;
        }
      }
    }
    return null;
  };

  const renderCategoryDropdown = () => {
    const categoryOnClick = (cat: any) => {
      if (!cat.children.length) {
        parentSetDataCallback(cat.name);
        setSelectedCat(cat.name);
        setCatListOpen(false);
        return;
      }

      saveCurrentList();
      saveCurrentCategory(cat.name);

      setCurList([...cat.children]);
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
        onClose={() => {
          // reset to top level if there is no selected category
          if (!selectedCat) {
            resetCategoryList();
          } else {
            // reset prevCatList and breadcrumbs based on current selected category
            // needed this because user could navigate to other categories and drop off
            findCategory(selectedCat.name, categories, [], []);
          }
        }}
        getOptionLabel={(option) => {
          return option.name;
        }}
        onChange={(e, v) => {
          if (!v) {
            // set parent level projectData.category to be empty string
            parentSetDataCallback("");
            resetCategoryList();
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
                    setCurList(prevCats.pop() || []);
                    setPrevCatList(prevCats);
                    setCategoryBreadcrumb(prevBread);
                  }}
                >
                  <Box display="flex" alignItems="center" mr={1.5}>
                    <ArrowBackIcon />
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      whiteSpace="normal"
                    >
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
              onClick={() => categoryOnClick(option)}
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
