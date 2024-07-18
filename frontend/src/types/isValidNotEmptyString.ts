function isValidNotEmptyString(input: any): boolean {
    return typeof input === 'string' && input.trim() !== '';
  }
  export default isValidNotEmptyString;