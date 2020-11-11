import axios from "axios";

export async function login( {email, password} ) {
    // console.log("email: " + email);
    // console.log("password: " + password);
    axios.post('oms/login', {
        email: email,
        password: password
      })
} 

export async function sell( { values, trans, deliv, curTime, userName} ) {
    axios.post('oms/post/createpost', {
      deliveryType : deliv,
      transactionMethod : trans,
      postDate : curTime,
      postTitle : values.title,
      postCategory : values.category,
      postCondition : values.condition,
      postDescription : values.description,
      postOwner : userName,
      postStatus : values.status,
      postPrice : parseFloat(values.price),
      postEmail : values.email,
      postPhone : values.phone,
      postZipcode : values.zipcode,
      postAddress : values.address
    })
} 


