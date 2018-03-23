$(document).ready(function () {
  $('.registration').submit(function (event) {
    event.preventDefault();
    var email = $(".email-reg").val();
    var pass = $(".password-reg").val();
    var passConfirm = $(".password-reg-repeat").val();
    var checkbox = $(".check-reg").prop("checked");
    var result = (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email));
    
    if ((email.length < 5) || (!result)) {
      alert("E-Mail введен неправильно (example@example.example)");
    } else {
      if (pass.length < 6) {
        alert("Пароли должны быть неменее 6-ти символов и совпадать.");
      } else {
        if (pass != passConfirm) {
          alert("Пароли должны быть неменее 6-ти символов и совпадать.");
        } else {
          if (!checkbox) {
            alert("Примите условия соглашения.");
          } else {
            alert("Регистрация завершенна");
          }
        }
      }
    }
  });
});