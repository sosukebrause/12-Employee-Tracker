$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api",
  }).then((res) => {
    console.log("this was sent from our api: ", res);
  });

  $.ajax({
    type: "GET",
    url: "/api/all",
  }).then((res) => {
    console.log("sent from server: ", res);
  });

  $("#submit").on("click", function (e) {
    e.preventDefault();
    const userText = $("#textInput").val();

    $.ajax({
      type: "POST",
      url: "/api/todo",
      data: { txt: userText },
    }).then((res) => {
      console.log(res);
    });
  });
});
