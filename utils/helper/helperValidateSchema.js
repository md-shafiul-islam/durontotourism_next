import * as Yup from "yup";

export const fileValidateSchema = (fileSize) => {
  return Yup.mixed().test(
    "fileSize",
    `File Size is too large. Maximum File Size: ${fileSize} KB`,
    (value) => {
      console.log("Selected File, Size Error ", value);
      if (value) {
        let size = 1000 * fileSize;
        if (value.size < size) {
          return true;
        } else {
          return false;
        }
      }
    }
  );
};

export const getMaxFileSizeValidation = (fileSize) => {
  return Yup.mixed().test(
    "fileSize",
    `File Size is too large. Maximum File Size: ${fileSize} KB`,
    (value) => {
      console.log("Selected File, Size Error ", value);
      let size = fileSize * 1000;
      return value && value.size < size;
    }
  );
};
