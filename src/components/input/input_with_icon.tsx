import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material"
import React, { ReactElement } from "react";

interface InputIconProps {
  icon: ReactElement
  label: string;
  type: inputType
}
type inputType = "email" | "password" |"text"

const InputIcon = ({ icon, label, type }: InputIconProps) => {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel sx={{ color: "white" }} >
        {label}
      </InputLabel>
      <Input
        type={type}
        startAdornment={
          <InputAdornment position="start">
            {React.cloneElement(icon, {
              sx: {
                color: "white",
                "&.Mui-focused": {
                  color: "primary",
                }
              }
            })
            }
          </InputAdornment>
        }
        sx={{
          input: { color: "white" },
          height: "50px",
          "&:before": {
            borderBottom: "1px solid white"
          },
          "&:hover:not(.Mui-focused):before": {
            borderBottom: "1px solid white",
          },
          "& .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: "white",
          },
          "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
            color: "primary.main",
          },
        }}
      />
    </FormControl>
  )
}

export default InputIcon