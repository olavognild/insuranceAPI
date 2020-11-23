function login() {
   const usernameInput = document.getElementById("username");
   const username = usernameInput.value;
   let user;

   if (invalidUserInput(username)) {
      handleErrorMessage(usernameInput);
      return;
   }

   $.ajax({
      url: "https://my-json-server.typicode.com/proactivehealth/work-test-sample/users",
      type: "GET",
      success: function(data) {
        if (data) {
          let userExists = false;
          for (let i = 0; i < data.length; i++) {
            if (data[i].login === username) { // Beware - case sensitive
              user = data[i]
              userExists = true;
              break;
            }
          }
          if (!userExists) {
            handleErrorMessage(usernameInput);
            return;
          }
        }
        localStorage.setItem('user', JSON.stringify(user)) // Store user data for insurances.js
        $(location).attr('href', './insurances.html');
      },
      error: function (err) {
      console.log(`Could not get users from endpoint, ${err}`);
      }
   })
}

function invalidUserInput(possibleUsername) {
   // An empty username or a username containing only of spaces are considered invalid
   const username = possibleUsername ? possibleUsername.trim() : '';

   return username == '' ? true : false;
}

function handleErrorMessage(inputfield) { // 'handle' is very generic, but in this case it's considered fine
   const errorClass = "has-error"; // Class to track if an error message is shown

   if (inputfield.classList.contains(errorClass)) { // Error message is already printed
      return;
   }

   const errorElem = document.createElement("p");
   errorElem.innerHTML = "Felaktigt användarnamn";
   errorElem.classList.add("error-text");
   inputfield.classList.add(errorClass);

   const parentElement = inputfield.parentElement;
   parentElement.appendChild(errorElem); // Print error message 
}