$(document).ready(function() {
    // Function to position the garden at a random location
    function randomPosition() {
        const containerWidth = $('#image-container').width() - $('#garden').width();
        const containerHeight = $('#image-container').height() - $('#garden').height();
        const randomLeft = Math.floor(Math.random() * containerWidth);
        const randomTop = Math.floor(Math.random() * containerHeight);
        return { left: randomLeft, top: randomTop };
    }

    // Function to initialize or reset the game
    function initializeGame() {
        // Reset clouds position
        $('#dark_clouds').css({ left: 0, top: 0 });
        
        // Randomly position the garden
        const initialPos = randomPosition();
        $('#garden').css(initialPos).show();
        
        // Hide the green garden if visible
        $('#green_garden').hide();
        
        // Clear any previous result messages
        $('#result').html('');
    }

    // Initial game setup
    initializeGame();

    // Reset Button Click Event
    $('#reset').on('click', function() {
        initializeGame();
    });

    // Make the dark clouds draggable within the image container
    $('#dark_clouds').draggable({
        containment: "#image-container",
        stop: function() {
            const cloudsPos = $(this).position();
            const gardenPos = $('#garden').position();
            const cloudsWidth = $(this).width();
            const cloudsHeight = $(this).height();
            const gardenWidth = $('#garden').width();
            const gardenHeight = $('#garden').height();

            // Simple collision detection
            const isOverlap = !(
                cloudsPos.left + cloudsWidth < gardenPos.left ||
                cloudsPos.left > gardenPos.left + gardenWidth ||
                cloudsPos.top + cloudsHeight < gardenPos.top ||
                cloudsPos.top > gardenPos.top + gardenHeight
            );

            if (isOverlap) {
                // User wins
                $('#result').html("<h2 class='text-success'>YOU WON!</h2>");
                $('#garden').hide();
                $('#green_garden').css({ left: gardenPos.left, top: gardenPos.top }).show();
            } else {
                $('#result').html("<h2 class='text-danger'>Keep Trying!</h2>");
            }
        }
    });
});