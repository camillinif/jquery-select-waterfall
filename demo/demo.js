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