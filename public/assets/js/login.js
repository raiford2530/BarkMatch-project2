$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const username = $("input#username-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
      username: username.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    username.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password,
    })
      .then(() => {
        window.location.replace("/dashboard");

        // If there's an error, log the error
      })
      .catch((err) => {
        if (err.status === 401) {
          $("#error").show();
        } else {
          console.log(err);
        }
      });
  }
});
