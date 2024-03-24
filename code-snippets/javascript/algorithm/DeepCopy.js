/* 
Description: Deep Copy 
Source: https://youtu.be/3Ay2lS6tm4M
Date: 03/04/2021 
*/

function deepyCopy(obj) {
  const newObject = {};

  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === "object") {
      newObject[key] = deepyCopy(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  }

  return newObject;
}
