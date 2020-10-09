


$(document).ready(function() {
 
  $('#tweet-text').on('keydown', function(event) {
    const keyStrokes = $(this).val().length;
    const newCounter = 140 - keyStrokes;
    const counter = $(this).siblings('div').children('.counter');
    counter.val(newCounter);
    if (newCounter < 0) {
      counter.addClass('red');
    } else {
      counter.removeClass('red');
    }
  });
  
});




