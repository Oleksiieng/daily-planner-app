$(document).ready(function () {

    let currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $('#currentDay').text(currentDate);

    function loadEvents() {
        let date = dayjs().format('YYYY-MM-DD');
        let schedulerData = JSON.parse(localStorage.getItem('scheduler')) || {};

        if (schedulerData[date]) {
            Object.keys(schedulerData[date]).forEach(function(hour) {
                let text = schedulerData[date][hour];
                $('.description[data-hour="' + hour + '"]').val(text);
            });
        }
    }

    function saveEvent(hour, text) {
        let date = dayjs().format('YYYY-MM-DD');
        let schedulerData = JSON.parse(localStorage.getItem('scheduler')) || {};
    
        if (!schedulerData[date]) {
            schedulerData[date] = {};
        }
    
        if (!schedulerData[date][hour]) {
            schedulerData[date][hour] = [];
        }
        schedulerData[date][hour].push(text);
    
        localStorage.setItem('scheduler', JSON.stringify(schedulerData));
        displayMessage('Appointment added to LocalStorage');
    }

    function generateTimeBlocks() {
        let times = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
        let container = $('.container');

        times.forEach(function (time) {

            let timeBlock = $('<div>').addClass('row time-block');

            let hourColumn = $('<div>').addClass('col-md-1 hour').text(time);

            let textArea = $('<textarea>').addClass('col-md-10 description').attr('data-hour', time);

            let saveButton = $('<button>').addClass('btn saveBtn col-md-1').html('<i class="fas fa-save"></i>');
            saveButton.on('click', function () {
                let hour = $(this).siblings('.description').data('hour');
                let text = $(this).siblings('.description').val();
                saveEvent(hour, text);
            });

            timeBlock.append(hourColumn, textArea, saveButton);
            container.append(timeBlock);

        });
    }

   
    generateTimeBlocks();
    loadEvents();
});

function displayMessage(message) {
    let messageElement = $('<div>')
        .addClass('alert alert-success fixed-top text-center')
        .text(message);

    $('body').prepend(messageElement);

    setTimeout(function() {
        messageElement.fadeOut();
    }, 1000);
}