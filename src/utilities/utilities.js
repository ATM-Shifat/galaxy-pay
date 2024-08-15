export function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  };

export const validPassword = (password) =>{
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/
    return regex.test(password)
}