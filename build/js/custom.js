(function($){
    "use strict";
    $(document).ready(function () {

        var betElements = $('.digits li').not( '.li-bg' );

        function newPosition(elem){

            var leftPosition = +elem.width()/2 - elem.closest('.digits').find('.li-bg').width()/2;

            elem.closest('.digits').find('.li-bg').stop().animate({
                'left' : elem.position().left + leftPosition
            }, 300);
        }

        betElements.on('click', function(){
            if(!$(this).hasClass('checked')){

                $(this).closest('.digits').find('.checked').removeClass('checked');
                $(this).addClass('checked');

                newPosition($(this));

            }
        });

        $(window).on('resize orientationchage load', function(){
            newPosition($('.settings-block-value-coin .checked'))
        });
        $(window).on('resize orientationchage load', function(){
            newPosition($('.settings-block-value-bet .checked'))
        });


        

    });
})(jQuery);