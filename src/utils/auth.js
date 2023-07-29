const tokenKey = 'token';
//token存
export const setToken = token =>sessionStorage.setItem(tokenKey,token);

//取
export const getToken = () =>sessionStorage.getItem(tokenKey);

//删
export const removeToken = () =>sessionStorage.removeItem(tokenKey);