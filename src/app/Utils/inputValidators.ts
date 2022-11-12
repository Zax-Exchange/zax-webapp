export const isValidString = (val: string) => {
  const stringOnlyRegEx = /^[a-zA-Z]+$/;
  return (stringOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidAlphanumeric = (val: string) => {
  const alphanumericOnlyRegEx = /^[a-zA-Z0-9\s_@./#&+-]+$/;

  return (alphanumericOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidInt = (val: string) => {
  const intOnlyRegEx = /^[0-9\b]+$/;
  return (intOnlyRegEx.test(val) || val === "") && val !== " " && val !== "0";
};

export const isValidFloat = (val: string) => {
  const floatOnlyRegEx = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/;

  // checking for leading zeros
  const splitted = val.split(".");
  if (splitted.length === 2) {
    if (splitted[0].length > 1 && splitted[0][0] === "0") return false;
  } else {
    if (val.length > 1 && val[0] === "0") return false;
  }

  return (floatOnlyRegEx.test(val) || val === "") && val !== " ";
}
