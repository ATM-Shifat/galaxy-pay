import  CryptoJS from 'crypto-js';

export function generateId() {
    return (parseInt((new Date().getTime()/1000).toFixed(0))).toString(16)
}

export function generateAccount(formData) {

    const combinedString = formData.email + formData.password + formData.name + formData.phone
    const hash = CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex)

    return (Math.abs(parseInt(hash.slice(0, 10), 16))).toString();
}

 export  function hashPassword(password) {
    // const salt = CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
 
    const combined = password //+ salt;

    return CryptoJS.SHA256(combined).toString(CryptoJS.enc.Hex);
  }