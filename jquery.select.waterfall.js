$(document).ready(function(){
    $('#select-1').initWaterfall();
});

(function ($){
    $.fn.initWaterfall = function(){

    $('select[data-waterfall]').on('change', null, 'root', this.updateChild);
    }
    $.fn.updateChild = function(event){
        if(event.data !== 'root') {
            $(this).find('option:not(:first)').remove();
            dataOrigin = $(this).data('origin');

            var a = eval(dataOrigin);
            var dfd = jQuery.Deferred();

            dfd.promise(a);
            a.done(function(data){
                console.log(data);
            });
        } 



        var childSelectArray = $('select[data-parent="#'+$(this).attr('id')+'"]');
        childSelectArray.each($(this).updateChild);
    }
}(jQuery));

function test() {
    return [3,2,1];
}

function test2() {
    return [3,4,5];
}
