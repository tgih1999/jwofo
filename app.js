/* File: app.js
 * Date: March 22nd, 2017
 * Name: Eric Lin
 * Description: This file contains the necessary JavaScript functions for
 * our Ofo Bike website
 */

$(document).keypress(function(e) {
  if(e.which == 13) {
    document.getElementById('submit_button').click();
  }
});

$('#switch').change(function(){
    const checkbox = document.getElementById('switch');
    if (checkbox.checked == true){
      document.getElementById('background_image').style.visibility = "hidden";
      document.getElementById('submit_button').style.backgroundColor = "black";
      document.getElementById('submit_text').style.color = "white";
      document.getElementById('number_text').style.border = "4px solid black";
      document.getElementById('pass_text').style.border = "4px solid black";
      $("#number_text").addClass("places");
      $("#pass_text").addClass("places");
      document.getElementById('number_text').style.color = "black";
      document.getElementById('pass_text').style.color = "black";
    }
    else{
      document.getElementById('background_image').style.visibility = "visible";
      document.getElementById('submit_button').style.backgroundColor = "#FFFF00";
      document.getElementById('submit_text').style.color = "black";
      document.getElementById('number_text').style.border = "4px solid #FFFF00";
      document.getElementById('pass_text').style.border = "4px solid #FFFF00";
      $("#number_text").removeClass("places");
      $("#pass_text").removeClass("places");
      document.getElementById('number_text').style.color = "#FFFF00";
      document.getElementById('pass_text').style.color = "#FFFF00";
    }
})

(function() {

  const config = {
    apiKey: "AIzaSyCgh3nk8nxUoqFir2LjKYuYiYaRPtQKT0c",
    authDomain: "ofome-f7639.firebaseapp.com",
    databaseURL: "https://ofome-f7639.firebaseio.com",
    storageBucket: "ofome-f7639.appspot.com",
    messagingSenderId: "181493512430"
  };

  firebase.initializeApp(config);

  bike_form = document.getElementById('number_text');
  pass_form = document.getElementById('pass_text');

  bike_form.addEventListener('click', e => {
    number_text.placeholder = "Valid Bikes: 0001-7000";
  });

  pass_form.addEventListener('click', e => {
    pass_text.placeholder = "Hint: I'm a Jenny";
  });

  $(window).click(function() {
    number_text.placeholder = "Bike Number";
    pass_text.placeholder = "Password";
  });

  $('#number_text').click(function(event){
    event.stopPropagation();
  });

  $('#pass_text').click(function(event){
    event.stopPropagation();
  });

  checkbox = document.getElementById('switch');

  reset_button = document.getElementById('reset');
  num_t = document.getElementById('number_text');
  pass_t = document.getElementById('pass_text');

  reset_button.addEventListener('click', e=>{
    num_t.value = "";
    pass_t.value = "";
  });

  submit_button = document.getElementById('submit_button');
  if ( submit_button){

    submit_button.addEventListener('click', e => {
      const name = document.getElementById('name_text');
      const number = document.getElementById('number_text');
      const password = document.getElementById('pass_text');
      const new_text = document.getElementById('submit_text');

      var pass, num;
      var temp = firebase.database().ref('bikeObject/password');

      temp.on('value', function(snapshot) {
        pass = snapshot.val();
        var temp2 = firebase.database().ref('bikeObject/password2');
        var temp = firebase.database().ref('bikeObject/' + number.value);

        temp2.on('value', function(snapshot) {
          pass2 = snapshot.val();

          temp.on('value', function(snapshot) {
            num = snapshot.val();

            if ((password.value == pass || password.value == pass2) && num != undefined){
              new_text.innerHTML = num;
            }
            else{
              new_text.innerHTML = "Try Again";
              setTimeout(myFunction, 3000)
            }
          });
        });
      });
    });
  }

  function myFunction() {
    const new_text = document.getElementById('submit_text');
    new_text.innerHTML = "Ofo me!";
  }
}());
