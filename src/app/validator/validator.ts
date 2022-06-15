import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customValidator():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        return null;
    }
}