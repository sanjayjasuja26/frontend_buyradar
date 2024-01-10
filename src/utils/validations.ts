import { object, SchemaOf, string, ref, number } from 'yup';
import moment from 'moment';

interface loginSchemaInterface {
  email: string;
  password: string;
}

interface forgotPasswordInterface {
  email: string;
}

interface registerSchemaInterface {
  email: string;
  password: string;
  username: string;
  confirm_password: string;
}
interface resetPasswordInterface {
  email: string;
  password: string;
  password_confirmation: string;
}

interface editProfileInterface {
  username: string | undefined;
  date_of_birth: string | undefined;
  gender: string | undefined;
}

export interface addAddressInterface {
  full_name: string | undefined;
  phone: string | undefined;
  address_province: string | undefined,
  address_city: string | undefined,
  address_zip_code: string | undefined,
  address: string | undefined,
  // default_shipping: number | undefined,
  // default_billing: number | undefined
}

export interface targetPriceInterface {
  min: string | undefined,
  max: string | undefined
}
export interface incorrectPriceInterface {
  price: string | undefined
}

export const loginValidationSchema: SchemaOf<loginSchemaInterface> = object({
  email: string().required("Email is required").email("Enter valid email"),
  password: string().required("Password is required"),
});

export const registerValidationSchema: SchemaOf<registerSchemaInterface> = object({
  email: string().trim().required("Email is required").email("Enter valid email"),
  username: string().trim().max(15, "Username should not be longer than 15 characters").required("Name is required"),
  password: string().trim().min(8, "Password must be at least 8 characters").max(20, "Password should not be longer than 20 characters").required("Password is required"),
  confirm_password: string().trim().required("Confirm Password is required").oneOf([ref('password'), null], 'Passwords must match')
});

export const forgotPasswordValidationSchema: SchemaOf<forgotPasswordInterface> = object({
  email: string().trim().required("Email is required.").email("Enter valid email."),
});

export const resetPasswordSchema: SchemaOf<resetPasswordInterface> = object({
  email: string().trim().required("Email is required").email("Enter valid email"),
  password: string().trim().required("Password is required"),
  password_confirmation: string().trim().oneOf([ref('password'), null], 'Passwords must match').required("Re enter your password")
});

export const editProfileSchema: SchemaOf<editProfileInterface> = object({
  username: string().trim().min(3, 'Username must be at least 3 characters').required('Username is required'),
  date_of_birth: string()
    .test(
      "date_of_birth",
      "Invalid date of birth",
      value => {
        return moment().diff(moment(value), 'days') >= 1;
      }
    ),
  gender: string().trim().required('Select gender').oneOf(['male', 'female'], 'Select gender'),
  phone: string().trim().required("Phone is required"),
  country_code: string().trim().required("Country code is required")
});

export const addAddressSchema: SchemaOf<addAddressInterface> = object({
  full_name: string().trim().min(3, 'Full Name must be at least 3 characters').max(15, 'Full Name should not be larger than 15 characters long').required('Full Name is required'),
  // phone: string().trim().min(6, "Phone should be atleast 6 characters long").max(25, "Phone should not be larger than 25 characters long").required('Phone is required'),
  address_province: string().trim().min(3, 'Province must be at least 3 characters').max(50, 'Address province should not be larger than 50 characters long').required('Province is required'),
  address_city: string().trim().min(3, 'City must be at least 3 characters').max(50, 'Address city should not be larger than 50 characters long').required('City is required'),
  address_zip_code: string().trim().min(5, 'Zip Code must be at least 5 characters').max(10, 'Address zip code should not be larger than 10 characters long').required('Zip Code is required'),
  address: string().trim().min(4, 'Address must be at least 4 characters').max(50, 'Address should not be larger than 50 characters long').required('Address is required'),
  phone: string().trim().required("Phone is required"),
  country_code: string().trim().required("Country code is required")
  // default_shipping: number().oneOf([0, 1]),
  // default_billing: number().oneOf([0, 1]),
});

export const targetPriceSchema: SchemaOf<targetPriceInterface> = object({
  min: string().trim(),
  max: string().trim().required('Maximum price is required'),
}) 
export const incorrectPriceSchema: SchemaOf<incorrectPriceInterface> = object({
  price: string().trim().required("Report price is required"),
}) 
