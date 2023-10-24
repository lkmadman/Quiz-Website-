// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDwOJld8MOWfGKMpGHQ9LJ8OjCJlv6sHs",

    authDomain: "quiz--websites.firebaseapp.com",

    databaseURL: "https://quiz--websites-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "quiz--websites",

    storageBucket: "quiz--websites.appspot.com",

    messagingSenderId: "9700361629",

    appId: "1:9700361629:web:58ac86287b06e65a029b74",

    measurementId: "G-QRMCMV18R5"

};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const databse = firebase.database();
const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");
const signupEmailIn = document.getElementById("email-signup");
const usernameIn = document.getElementById("username-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
  "confirm-password-signup"
);
const createacctbtn = document.getElementById("create-acct-btn");
const forgetBtn = document.querySelector(".forget-btn");

// const returnBtn = document.getElementById("return-btn");

var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignUpPassword,
  username,
  userId;

createacctbtn.addEventListener("click", function () {
  var isVerified = true;
  signupEmail = signupEmailIn.value;

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }

  username = usernameIn.value;
  if (
    signupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  if (isVerified) {
    auth
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("Success! Account created.");
        sessionStorage.setItem("userId", auth.currentUser.uid);
        // console.log(auth.currentUser.uid);
        databse
          .ref("/Users/" + auth.currentUser.uid)
          .set({
            Basic_info: {
              email_id: signupEmail,
              user_name: username,
            },
          })
          .then((res) => {
            console.log("Data added to database.");
            location.replace("./start.html");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        window.alert("Error occurred. ErrorCode ", errorCode);
      });
  }
});

submitButton.addEventListener("click", function () {
  email = emailInput.value;
  password = passwordInput.value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      sessionStorage.setItem("userId", auth.currentUser.uid);
      console.log("Success! Welcome back!");
      // window.alert("Success! Welcome back!");
      location.replace("./start.html");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      window.alert("Error occurred. ErrorCode ", errorCode);
    });
});

// reseting password
forgetBtn.addEventListener("click", function () {
  email = emailInput.value;
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      window.alert("Password reset email sent, check your inbox. ");
    })
    .catch((error) => {
      window.alert(error);
    });
});
