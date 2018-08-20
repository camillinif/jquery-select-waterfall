$(document).ready(function(){
    $('#select-1').initWaterfall({
        removeFirst: false,
        loadingCallback: loadingStyle,
        completeLoadingCallback: normalStyle,
    });
});

function test() {
    return $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos'
    }).then(function(data){
        return {
            data: data
        }
    });
}

var loadingStyle = function (element) {
    $(element).html('carico');
}

var normalStyle = function (element) {
    console.log(1);
    $(element).html('');
}

var testCallback = function(dataOrigin) {
    console.log(dataOrigin);
}