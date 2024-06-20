import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { VerifyPhoneNumber, VerifyPhoneNumberLength, verifyEmail } from "../Utils/validation";

const IconTextField = ({ iconStart, iconEnd, updateValue,helperText="", validationRules = [], InputProps, ...props }) => {

  const [errorFlag, setErrorFlag] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  let validationError = []


  const checkIfValueIsPopulated = (e) => {
    validationError = []
    if (e?.target?.value.trim() == "") {
      validationRules?.map((rule) => {
        if (rule == "req") {
          validationError.push("Value can't be empty.")
        }
      })
    }

    if (validationError.length > 0) {
      setErrorFlag(true)
      setErrorMessage(validationError[0])
    } else {
      setErrorFlag(false)
      setErrorMessage("")
    }
    return
  }


  // const onChangeFunc = (e) => {
  //   setErrorS(0)
  //   if (validationRules) {
  //     validationRules?.map((rule) => {
  //       if (rule == "req") {
  //         console.log(e?.target?.value.trim());
  //         if ((e?.target?.value).trim() == "") {
  //           setErrorMessage("Value can't be empty.")
  //           setErrorS(3)
  //           setFirst(true)
  //           console.log("checked in...");
  //         }
  //       }
  //       if (rule == "email") {
  //         if (((e?.target?.value).trim() != "") && !verifyEmail(e?.target?.value)) {
  //           setErrorMessage("Not valid email..")
  //           setErrorS(2)
  //         }
  //       }
  //     })
  //   }
  //   if (errorS > 0) {
  //     console.log("Error detected...");
  //     setError(true)
  //   } else {
  //     setErrorMessage("")
  //     setError(false)
  //   }
  //   updateValue(e?.target?.value)


  // }


  const onChangeFunc = (e) => {
    validationError = []
    if (validationRules) {
      validationRules?.map((rule) => {
        if (rule == "req") {
          if ((e?.target?.value).trim() == "") {
            validationError.push("Value can't be empty.")
          }
        }
        if (rule == "email") {
          if (((e?.target?.value).trim() !== "") && !verifyEmail(e?.target?.value?.trim())) {
            validationError.push("Not valid email..")
            // setErrorS(2)
          }

        }
        if (rule == "phone") {
          if ((((e?.target?.value).trim() !== "") && !VerifyPhoneNumberLength(e?.target?.value?.trim())) || (((e?.target?.value).trim() !== "") && !VerifyPhoneNumber(e?.target?.value?.trim()))) {
            validationError.push("Phone number incorrect")
          }
        }
      })
    }

    if (validationError.length > 0) {
      setErrorFlag(true)
      setErrorMessage(validationError[0])
    } else {
      setErrorFlag(false)
      setErrorMessage("")
    }
    updateValue(String(e?.target?.value).trim())


  }

  return (
    <TextField
      onChange={(e) => {
        onChangeFunc(e);
      }}

      onBlur={(e) => {
        // check if the value is empty
        checkIfValueIsPopulated(e)
      }}
      sx={{
        "& .MuiInputLabel-outlined": {
          fontWeight: "500",
          color: "#1d3557",
        },
        '& .MuiInputBase-root': {
          '& fieldset': {
            // borderWidth: '0.3px', 
            // borderColor: "red"
          },
          fontSize: '1.1rem',
        },
      }}
      {...props}
      InputProps={{
        ...InputProps,
        style: { color: "green", },
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
      error={errorFlag}
      helperText={errorFlag ? errorMessage : helperText}
    />
  );
};


export default IconTextField