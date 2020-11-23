window.onload = function() {
   const user = JSON.parse(localStorage.getItem('user'));

   const usernameLabel = document.getElementById('user-full-name');
   usernameLabel.innerHTML = user.name; // Welcomes the user with its name

   getInsurances(user.id);
}

function getInsurances(user) {
   let userInsurances;
   $.ajax({
      url: 'https://my-json-server.typicode.com/proactivehealth/work-test-sample/user_insurances',
      type: 'GET',
      success: function(data) {
        if (data) {
           userInsurances = data[user];
           $.ajax({ // Get which insurances the user has
            url: 'https://my-json-server.typicode.com/proactivehealth/work-test-sample/insurances',
            type: 'GET',
            data: {
               id: userInsurances
            },
            success: function(insurances) {
              if (insurances) {
                createInsurancesBody(insurances); // Creates the DOM in which the insurances are displayed
              }
            },
            error: function (err) {
               console.log(`Could not get users from endpoint, ${err}`);
            }
         });
        }
      },
      error: function (err) {
         console.log(`Could not get users from endpoint, ${err}`);
      }
   });
}

function createInsurancesBody(insurances) {
  const insurancesBody = document.getElementById('insurances-body');

  for (let i = 0; i < insurances.length; i++) {
    // wrapper
    const insurance = document.createElement('div');
    insurance.classList.add('insurance')

    //Header
    const insuranceHeader = document.createElement('h1');
    insuranceHeader.innerHTML = insurances[i].title;

    //Preamble
    const insurancePreamble = document.createElement('h2');
    insurancePreamble.innerHTML = insurances[i].preamble;

    //Body
    const insuranceBody = document.createElement('p');
    insuranceBody.innerHTML = insurances[i].body;

    //Link
    const insuranceLink = document.createElement('a');
    insuranceLink.innerHTML = 'L&auml;s mer' // Scuffed hack to write 'Ä'
    insuranceLink.title = 'L&auml;s mer';
    insuranceLink.href = insurances[i].url;
    insuranceLink.classList.add('insurance-link');

    // Add insurance to DOM
    insurance.appendChild(insuranceHeader);
    insurance.appendChild(insurancePreamble);
    insurance.appendChild(insuranceBody);
    insurance.appendChild(insuranceLink);

    insurancesBody.appendChild(insurance);
  }
}

function logout() {
  $(location).attr('href', './index.html');
}