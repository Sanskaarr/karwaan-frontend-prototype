import { toast } from "react-toastify";

const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const isValidPassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
} 

export const runValidations = (email: string | undefined, password: string | undefined, firstName?: string | undefined, lastName?: string | undefined) => {
    const runSignupValidation = () => {
        if(!firstName){
            toast.error("Form error: Fisrt name is a required feild.");
            return false;
        }
        if(!lastName){
            toast.error("Form error: Last name is a required feild.");
            return false;
        }
        if(!email){
            toast.error("Form error: Email is a required feild.");
            return false;
        }
        if(!isValidEmail(email)){
            toast.error("Form validation error: Must be a valid email.")
            return false;
        }
        if(!password){
            toast.error("Form error: Password is a required feild.");
            return false;
        }
        if(!isValidPassword(password)){
            toast.error("Form validation error: Password must contain at least one lowercase letter, At least one uppercase letter, at least one digit, minimum length of 8 characters.");
            return false;
        }
        return true;
    }

    const runSigninValidation = () => {
        if(!email){
            toast.error("Form error: Email is a required feild.");
            return false;
        }
        if(!password){
            toast.error("Form error: Password is a required feild.");
            return false;
        }
        if(!isValidEmail(email)){
            toast.error("Form validation error: Must be a valid email.")
            return false;
        }
        if(!isValidPassword(password)){
            toast.error("Form validation error: Must be a valid password.")
            return false;
        }
        return true;
    }

    return {runSignupValidation, runSigninValidation}
}