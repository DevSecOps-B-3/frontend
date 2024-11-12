import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material"
import React, { ReactElement } from "react";
import { ActionType } from "../../data/dto/action_type";

interface InputIconProps {
  icon: ReactElement
  label: string;
  type: inputType
  value: string | undefined
  dispatch: React.Dispatch<ActionType>
  actionType: string
  required?: boolean
}

type inputType = "email" | "password" | "text"

const InputIcon = ({ icon, label, type, value, dispatch, actionType, required }: InputIconProps) => {
  return (
    <FormControl variant="standard" sx={{ width: "100%" }} required={required}>
      <InputLabel sx={{ color: "white" }} >
        {label}
      </InputLabel>
      <Input
        value={value}
        onChange={(e) => dispatch({ type: actionType, payload: e.target.value })}
        placeholder={label}
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