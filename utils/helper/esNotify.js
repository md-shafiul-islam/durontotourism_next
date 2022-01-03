import { toast } from "react-toastify";

export const esNotifyAction = (refElement, msg) => {
  if (refElement) {
    refElement.current = toast(msg, {
      position: "bottom-right",
      autoClose: false,
    });
  }
};

export const esNotifyUpdateAction = (refElement, msg, tType) => {
  if (refElement) {
    toast.update(refElement.current, {
      render: msg,
      type: tType,
      autoClose: 5000,
    });
  }
};
