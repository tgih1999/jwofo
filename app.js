$(document).keypress(function(e) {
  if(e.which == 13) {
    document.getElementById('submit_button').click();
  }
});

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

(function() {
  const config = {
    apiKey: "AIzaSyCgh3nk8nxUoqFir2LjKYuYiYaRPtQKT0c",
    authDomain: "ofome-f7639.firebaseapp.com",
    databaseURL: "https://ofome-f7639.firebaseio.com",
    storageBucket: "ofome-f7639.appspot.com",
    messagingSenderId: "181493512430"
  };

  firebase.initializeApp(config);

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

        var temp = firebase.database().ref('bikeObject/' + number.value);
        temp.on('value', function(snapshot) {
          num = snapshot.val();

          if (password.value == pass && num != undefined){
            new_text.innerHTML = num;
          }
          else{
            new_text.innerHTML = "Try Again";
            setTimeout(myFunction, 3000)
          }
        });
      });
    });
  }

  login_button = document.getElementById('login_button');

  if ( submit_button){

    login_button.addEventListener('click', e => {
      const username = document.getElementById('username_text');
      const password_account = document.getElementById('password_login_text');

      var pass, num;
      var temp = firebase.database().ref('bikeObject/' + username.value);

      temp.on('value', function(snapshot) {
        pass = snapshot.val();

          if (password_account.value == pass || password_account.value.toLowerCase() == pass){
            console.log("working");
          }
          else{
            console.log("not working");
          }
      });
    });
  }

  function myFunction() {
    const new_text = document.getElementById('submit_text');
    new_text.innerHTML = "Ofo me!";
  }
}());
