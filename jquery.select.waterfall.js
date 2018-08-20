(function ($){

    var waterfallSettings;
    var waterfallMap;

    $.fn.initWaterfall = function(options){

        waterfallSettings = $.extend({
            root: true,
            firstChild: true,
            removeFirst: false,
            addWrapperData: false,
            loadingCallback: undefined,
            disableSelectWhenEmpty: true,
            completeLoadingCallback: undefined,
        },options);

        waterfallMap = mapParentChild();

        return $('[data-waterfall]').on('change', null, $.extend(waterfallSettings,{root:true}), this.updateChild);
    }

    $.fn.updateChild = function(event){
        
        var select = this;

        if (!event.data.root) {
            if(!event.data.removeFirst) {
                $(this).find('option:not(:first)').remove();    
            } else {
                $(this).find('option').remove();    

                if (event.data.disableSelectWhenEmpty) {
                    $(this).prop('disabled', true);
                }
            }

            if (event.data.firstChild) {
                dataOrigin = $(this).data('origin');

                var getData = eval($(this).data('origin'));
                var dataOriginValue;
    
                loadingElement = $('[data-loading-for="#'+$(this).attr('id')+'"]');
                if (event.data.loadingCallback) {
                    event.data.loadingCallback(loadingElement);
                }
                
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

                        if (event.data.disableSelectWhenEmpty) {
                            $(this).prop('disabled', false);
                        }

                        if ($(select).data('loading-callback')) {
                            loadingCallbackFunction = eval($(select).data('loading-callback'));
                            loadingCallbackFunction($(select), dataOriginValue);
                        }

                  }).then(function(){
                    loadingElement = $('[data-loading-for="#'+$(select).attr('id')+'"]');
                    if (event.data.completeLoadingCallback) {
                        event.data.completeLoadingCallback(loadingElement);
                    }
                    
                  });

                event.data.firstChild = false;
            } else {
                loadingElement = $('[data-loading-for="#'+$(select).attr('id')+'"]');
                if (event.data.completeLoadingCallback) {
                    event.data.completeLoadingCallback(loadingElement);
                }
            } 
        } else {
            event.data = $.extend(event.data, {
                root:false
            });
        }

        var childIdsArray = waterfallMap['#'+$(this).attr('id')];
        if (childIdsArray) {
            childIdsArray.forEach(function(childId){
                $('#'+childId).updateChild(event);
            });    
        } else {
            event.data = $.extend(event.data, {
                root:true,
                firstChild:true
            });
        }
    }

}(jQuery));

function mapParentChild()
{
    var waterfallMap = [];
    $('[data-parent]').each(function(){
        var childElement = this;
        parentsIdsArray = $(childElement).data('parent');
        parentsIdsArray.forEach(function(parentId){
            if (!waterfallMap[parentId]) {
                waterfallMap[parentId] = [];
            }
            waterfallMap[parentId].push($(childElement).attr('id'));
        });
    });

    return waterfallMap;

}