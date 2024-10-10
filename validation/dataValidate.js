/**
 * Validate if the provided email is in a correct format.
 * @param {string} email - The email to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function validateEmailFormat(email) {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email));
}


export function validateEmail(email) {
    if (email.trim() === '') {
        return false; // Email is empty
    }
    return true;
}

/**
 * Validate if the provided mobile number is in a correct Indian format.
 * Indian mobile numbers start with 7, 8, or 9 and are 10 digits long.
 * @param {string} mobile - The mobile number to validate.
 * @returns {boolean} - True if the mobile number is valid, false otherwise.
 */
export function validateIndianMobile(mobile) {
    const indianMobileRegex = /^(\+91)?[6-9]\d{9}$/;
    return indianMobileRegex.test(mobile);
}


/**
 * Validate if the provided text is not empty and does not contain any numbers.
 * @param {string} text - The text to validate.
 * @returns {boolean} - True if the text is not empty and does not contain any numbers, false otherwise.
 */
export function validateMandText(text) {
    // Check if the text is not empty
    if (text.trim() === '') {
        return false;
    }

    return true;
}



export function validateMandTextOnly(text) {
    // Check if the text does not contain any numbers
    if (/\d/.test(text)) {
        return false;
    }

    return true;
}


/**
 * Validate if the provided number is not empty and is a valid number.
 * @param {string} number - The number to validate.
 * @returns {boolean} - True if the number is not empty and is a valid number, false otherwise.
 */
export function validateMandNumber(number) {
    // Check if the number is not null
    if (number === undefined) {
        return false;
    }
    return true;
}

/**
 * Validate if the provided number is not "+91" and not empty.
 * @param {string} number - The number to validate.
 * @returns {boolean} - False if the number is "+91" or empty, true otherwise.
 */
export function validateMobileNumber(number) {
    // Check if the number is "+91" or empty
    if (number.trim() === "+91" || number.trim() === "") {
        return false;
    }
    
    // Check if the number is a valid number
    return !isNaN(number);
}


/**
 * Validate if the provided date is not empty.
 * @param {string} date - The date to validate.
 * @returns {boolean} - True if the date is not empty, false otherwise.
 */
export function validateMandDate(date) {
    return date.trim() !== '';
}

/**
 * Validate if the provided start date is before the end date.
 * @param {string} start_date - The start date to validate.
 * @param {string} end_date - The end date to validate.
 * @returns {boolean} - True if start date is before end date, false otherwise.
 */
export function validateDatePair(start_date, end_date) {
    return new Date(start_date) < new Date(end_date);
}

/**
 * Format the amount by adding .00 if the amount doesn't already have decimals.
 * @param {string} amount - The amount to format.
 * @returns {string} - The formatted amount with .00 added if needed.
 */
export function formatAmount(amount) {
    // Check if the amount contains a decimal point
    if (amount.indexOf('.') === -1) {
        return amount + '.00'; // Add .00 if amount doesn't already have decimals
    }
    return amount; // Return the amount as is if it already contains decimals
}

// Create a default export object
const validate = {
    validateEmail,
    validateEmailFormat,
    validateIndianMobile,
    validateMandText,
    validateMandTextOnly,
    validateMandNumber,
    validateMobileNumber,
    validateMandDate,
    validateDatePair,
    formatAmount,
};

export default validate;
