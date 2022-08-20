export const isValidString = (val) => {
  const stringOnlyRegEx = /^[a-zA-Z]+$/;
  return (stringOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidAlphanumeric = (val) => {
  const alphanumericOnlyRegEx = /^[a-zA-Z0-9\s]+$/;
  return (alphanumericOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidInt = (val) => {
  const intOnlyRegEx = /^[0-9\b]+$/;
  return (intOnlyRegEx.test(val) || val === "") && val !== " " && val !== "0";
};
