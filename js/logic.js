$(document).ready(function () {

    let currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);



    var currentHour = dayjs().hour();
    $('.time-block').each(function() {
        var blockHour = parseInt($(this).find('.hour').text());
        if(blockHour < currentHour) {
            $(this).find('.description').addClass('past');
        } else if(blockHour === currentHour) {
            $(this).find('.description').addClass('present');
        } else {
            $(this).find('.description').addClass('future');
        }
    });

});