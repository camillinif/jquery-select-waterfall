$(document).ready(function(){
    $('#select-1').initWaterfall({
        removeFirst: false,
        loadingCallback: loadingStyle,
        completeLoadingCallback: normalStyle,
    });
});

(function ($){

    var waterfallSettings;

    $.fn.initWaterfall = function(options){

        waterfallSettings = $.extend({
            root: true,
            firstChild: true,
            removeFirst: false,
            addWrapperData: false,
            loadingCallback: undefined,
            completeLoadingCallback: undefined,
        },options);

        $('select[data-waterfall]').on('change', null, $.extend(waterfallSettings,{root:true}), this.updateChild);
    }

    $.fn.updateChild = function(event){
        
        if (!event.data.root) {
            if(!event.data.removeFirst) {
                $(this).find('option:not(:first)').remove();    
            } else {
                $(this).find('option').remove();    
            }

            if (event.data.firstChild) {
                dataOrigin = $(this).data('origin');

                var getData = eval($(this).data('origin'));
                var dataOriginValue;
                var select = this;
    
                loadingElement = $('[data-loading-for="#'+$(this).attr('id')+'"]');
                event.data.loadingCallback(loadingElement);
                $(this).data('loading-element');
                $.when(getData())
                    .then(function(optionValue){
                        if (event.data.addWrapperData) {
                            dataOriginValue = {
                                data: optionValue
                            }    
                        } else {
                            dataOriginValue = optionValue;
                        }
                    }).then(function(){
                        $.each(dataOriginValue.data, function(index, element){
                            var option = $("<option></option>");
                            option.text(element[$(select).data('label-property')]);
                            option.val(element[$(select).data('value-property')]);
                            $(select).append(option);
                        });
                  }).then(function(){
                    loadingElement = $('[data-loading-for="#'+$(select).attr('id')+'"]');
                    event.data.completeLoadingCallback(loadingElement);
                  });

                event.data.firstChild = false;
            } 
        } else {
            event.data = $.extend(event.data, {
                root:false
            });
        }

        var childSelectArray = $('select[data-parent="#'+$(this).attr('id')+'"]');
        childSelectArray.each(function(){
            $(this).updateChild(event);
        });

        if(!childSelectArray.length) {
            event.data = $.extend(event.data, {
                root:true,
                firstChild:true
            });
        }
    }

}(jQuery));