import { FormControl, ValidationErrors } from "@angular/forms";

export class ValidationUtil {

    // whitespace validation
    static notWhitespaceOnly(control:FormControl) : ValidationErrors {

        //check if string contains whitespace only
        if((control.value) && (control.value.trim().length ===0)){
            
            //invalid, return error
            return {'notWhitespaceOnly':true};
        } else {
            //valid
            return null;
        }
    }
}
