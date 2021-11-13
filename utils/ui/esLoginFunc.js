export const getEsLoginResponseMessage = (signRes) => {
  if (signRes.status >= 400) {
    return "Password did not match";
  } else if (signRes.status >= 500) {
    return "Error. Please try again later";
  } else {
    return "Something went wrong. Please try again later";
  }
};
