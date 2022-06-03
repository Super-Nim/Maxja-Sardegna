import * as React from 'react';
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

export interface FormInputProps {
    name: string;
    control: any;
    label: string;
    className?: string;
    setValue?: any;
    ref?: {};
}
/// @notice This component implements form validation, for now I will use regular inputs as defined in SignUp.tsx
const FormInputText = ({ name, control, label, className }: FormInputProps) => {

    return (
        <Controller
            name={name} // unique name of input
            control={control} // control object from useForm()
            render={({ // render is a render prop, a function thats a react element with events/values
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField // react element returned from render prop
                    helperText={error ? error.message : null}
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    // fullWidth
                    label={label}
                    variant="outlined"
                    className={className}
                />
            )}
        />
    );
};

export default FormInputText;