export const COOKIE_KEYS = {
    REMEMBER: "cookie_remember",
    AUTHORIZATION: "access_token",
    LOCALE: "locale",
    SCHEMA: "schema",
    USER: "user",
  }
  
  export enum LOGIN_TYPE {
    EMAIL = "email",
    APPLE = "apple",
    GOOGLE = "google",
    FACEBOOK = "facebook",
  }
  
  export enum ProfileTab {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
    VERIFY_OTP = "VERIFY_OTP",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
    RESET_PASSWORD = "RESET_PASSWORD",
    REACTIVE_ACCOUNT = "REACTIVE_ACCOUNT",
  }
  
  export enum THEME {
    AUTO = "auto",
    LIGHT = "light",
    DARK = "dark",
  }
  
  export enum ACTION {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    DETAIL = "detail",
    STEPS = "STEPS",
    UPDATE_CHILD = "update_child",
    UPDATE_STATUS = "update_status",
    INACTIVE = "inactive",
  }
  
  export const AUTHORIZATION = "AUTHORIZATION"
  
  export enum Gender {
    Male = 1,
    Female = 2,
    Other = 3,
    PreferNotToSay = 4,
  }