$(document).ready(function() {

  $(".new-tweet textarea").on('keyup', function(event) {
    const charCount = $(this).val().length;
    const counter = $(this).siblings('.counter');
    const button = $(this).siblings('input');
    console.log(charCount);
    if (charCount >= 140) {
      button.css("background-color", "red");
      counter.css("color","red");
    } else if (charCount === 0) {
      button.css("background-color", "red")
    } else {
      button.css("background-color", "#4056a1");
      counter.css("color","inherit");
    }
    counter.text(`${140 - charCount}`);
  });
});
