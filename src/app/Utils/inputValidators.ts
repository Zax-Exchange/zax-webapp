export const isValidString = (val: string) => {
  const stringOnlyRegEx = /^[a-zA-Z]+$/;
  return (stringOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidAlphanumeric = (val: string) => {
  const alphanumericOnlyRegEx = /^[a-zA-Z0-9\s]+$/;

  return (alphanumericOnlyRegEx.test(val) || val === "") && val !== " ";
};

export const isValidInt = (val: string) => {
  const intOnlyRegEx = /^[0-9\b]+$/;
  return (intOnlyRegEx.test(val) || val === "") && val !== " " && val !== "0";
};

export const isValidFloat = (val: string) => {
  const floatOnlyRegEx = /^([0-9]{1,})?(\.)?([0-9]{1,})?$/;
  
  return (floatOnlyRegEx.test(val) || val === "") && val !== " " && val !== "0";
}
