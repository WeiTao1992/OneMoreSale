import axios from "axios";

export async function login( {email, password} ) {
    // console.log("email: " + email);
    // console.log("password: " + password);
    axios.post('oms/login', {
        email: email,
        password: password
      })
} 

export async function sell( { values, transactionArray, deliveryArray, curtime } ) {
    axios.post('oms/post/createpost', {
      postOwner : " ",
      postDate : curtime,
      postStatus : values.status,
      postTitle : values.title,
      postCategory : values.category,
      postCondition : values.condition,
      postDescription : values.description,
      postPrice : values.price,
      postEmail : values.email,
      postPhone : values.phone,
      postZipcode : values.zipcode,
      postAddress : values.address,
      deliveryType : transactionArray,
      transactionMethod : deliveryArray
    })
} 


