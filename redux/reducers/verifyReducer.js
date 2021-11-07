import {
  MAIL_VERIFY,
  MAIL_VERIFY_ERROR,
  MAIL_VERIFY_TOKE,
  MAIL_VERIFY_TOKE_ERROR,
  RESEND_MAIL_VERIFY,
  RESEND_MAIL_VERIFY_ERROR,
  RESEND_SMS_VERIFY,
  RESEND_SMS_VERIFY_ERROR,
  SMS_VERIFY,
  SMS_VERIFY_ERROR,
} from "../types";

const initState = {
  mail: { message: "", status: false },
  sms: { message: "", status: false },
  mailResend: { message: "", status: false },
  smsResend: { message: "", status: false },
  mailToken: { message: "", status: false },
  smsError: undefined,
  mailError: undefined,
  mailTokenError: undefined,
  smsResendError: undefined,
  mailResendError: undefined,
};

export default function veryfiReducer(state = initState, action) {
  switch (action.type) {
    case SMS_VERIFY:
      return {
        ...state,
        sms: action.payload,
      };

    case SMS_VERIFY_ERROR:
      return {
        ...state,
        smsError: action.payload,
      };

    case RESEND_SMS_VERIFY:
      return {
        ...state,
        smsResend: action.payload,
      };

    case RESEND_SMS_VERIFY_ERROR:
      return {
        ...state,
        smsResendError: action.payload,
      };

    case MAIL_VERIFY:
      return {
        ...state,
        mail: action.payload,
      };

    case MAIL_VERIFY_ERROR:
      return {
        ...state,
        mailError: action.payload,
      };

    case MAIL_VERIFY_TOKE:
      return {
        ...state,
        mailToken: action.payload,
      };

    case MAIL_VERIFY_TOKE_ERROR:
      return {
        ...state,
        mailTokenError: action.payload,
      };

    case RESEND_MAIL_VERIFY:
      return {
        ...state,
        mailResend: action.payload,
      };

    case RESEND_MAIL_VERIFY_ERROR:
      return {
        ...state,
        mailResendError: action.payload,
      };

    default:
      return state;
  }
}
