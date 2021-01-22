class InputHelpers {
    constructor() {
    }
    verifyPasswordStrength(passwordValue) {
        const validatePasswordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-_+.:;,"?={}[\]`~><|]){1,}).{6,}$/;
        return passwordValue.match(validatePasswordRegex) === null;
    };
}
export default InputHelpers;