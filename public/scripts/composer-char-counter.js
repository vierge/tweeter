$(document).ready(function() {

  $(".new-tweet textarea").on('keyup', function(event) {
    const charCount = $(this).val().length;
    const counter = $(this).siblings('.counter');
    console.log(charCount);
    if (charCount >= 140) {
      counter.css("color","red");
    } else {
      counter.css("color","inherit");
    }
    counter.text(`${140 - charCount}`);
  });
});
