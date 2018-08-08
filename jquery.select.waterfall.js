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
        }

        var childSelectArray = $('select[data-parent="#'+$(this).attr('id')+'"]');
        childSelectArray.each($(this).updateChild);
    }
}(jQuery));

