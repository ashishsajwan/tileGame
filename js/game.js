var timing = 900;
var _throttle = function(fn, limit) {
    var inThrottle = true;
    return function() {
        var args = arguments,
            context = this;
        if (inThrottle) {
            fn.apply(context, args);
            inThrottle = false;
            setTimeout(function() {
                inThrottle = true;
            }, limit);
        }
    }
};
var score = 0;
var activateGrid = function() {
    var randomID = Math.ceil(Math.random() * 9);
    if (document.querySelector('.grid.activate')) {
        document.querySelector('.grid.activate').classList.remove('activate');
    }
    document.querySelector('.grid[id="' + randomID + '"]').classList.add('activate');
    setTimeout(function() {
        activateGrid();
    }, timing);
};
var updateScore = function() {
    document.getElementById('score').innerHTML = score;
};
document.querySelector('.gridContainer').addEventListener('click', _throttle(function(e) {
    if (e.target && e.target.classList.contains('activate')) {
        score++;
    } else {
        score--;
    }
    updateScore();
}, timing));
activateGrid();