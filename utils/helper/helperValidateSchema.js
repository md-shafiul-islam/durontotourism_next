import * as Yup from "yup";


export const getMaxFileSizeValidation = (fileSize, label="") => {
  return Yup.mixed().required(`Please, Attach ${label} scan copy or image`).test(
    "fileSize",
    `File Size is too large. Maximum File Size: ${fileSize} KB`,
    (value) => {
      console.log("Selected File, Size Error ", value);
      let size = fileSize * 1000;
      return value && value.size < size;
    }
  );
};
