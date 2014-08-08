'use strict';

/**
 * @ngdoc directive
 * @name monicaFriasApp.directive:scroll
 * @description
 * # scroll
 */
angular.module('monicaFriasApp')
  .directive('scroll', ['$window', '$timeout', 'checkOS', function ($window, $timeout, checkOS) {
  	
  	function invertSymbol(symbol){
  		return (symbol == '+' ? '-' : '+');
  	}
  	
  	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
	    return copy;
	}
  	
  	/**
  	 * PREPARA OS CONTEÚDOS, DEIXANDO PRONTO PARA O INFINITE CAROUSEL
  	 * TRIPLICA O ARRAY
  	 */
  	function prepareArrBarras(arrBarras){
  		
  		var temp = [];
  		
  		arrBarras.forEach(function(elem, key){
  			temp.push( angular.copy(elem) );
  		});
  		
  		temp.forEach(function(elem, key){
  			
  			for(var i = 0; i < 2; i++){
  				arrBarras[key].forEach(function(elemOri, keyOri){
	  				elem.push( angular.copy(elemOri) );
	  			});
  			}
  			
  		});
  		
  		return temp;
  		
  	}
  	
  	var wProjeto = 276;
  	var wPublicacao = 202;
  	function getSizeBarra(barra){
  		
  		var size = 0;
  		
  		for(var i = 0; i < barra.length; i++)
  			size += (barra[i].tipo == 'projeto') ? wProjeto : wPublicacao;
  		
  		return size;
  		
  	}
  	
  	function getSizeBarraAtIndex(barra, index){
  		
  		var size = 0;
  		
  		var limit = index;
  		if(limit >= barra.length)
  			limit = barra.length-1;
  		
  		for(var i = 0; i <= limit; i++)
  			size += (barra[i].tipo == 'projeto') ? wProjeto : wPublicacao;
  		
  		return size;
  		
  	}

    var elem;
    function onScroll(event, delta, deltaX, deltaY, scope){

      if(scope.workScroll){
                           
          elem.find('.barra-home').each(function(){

              var sizePasso = 0;

              for(var i = 0; i <= scope.sizeBarras[ $(this).index() ]; i++)
                  sizePasso += $( $(this).find('.conteudo-home').get(i) ).width();
              
              var thisScrollLeft = $(this).scrollLeft();
              var max = $(this)[0].scrollWidth - $(this)[0].clientWidth;
              
              $(this).parent().css('width', max);

              //REGRA PARA VOLTAR NO FINAL QUANDO FOR 0
              if(thisScrollLeft <= 0){
                $(this).stop(true,true).scrollLeft(thisScrollLeft + sizePasso);
              }

              //REGRA PARA VOLTAR NO COMEÇO QUANDO FOR FINAL
              if( thisScrollLeft >= max ){
                $(this).stop(true,true).scrollLeft( thisScrollLeft - sizePasso );
              }

              var symbol = $(this).data('direcao') == 'left' ? '+' : '-';
              if(delta >= 0)
                  symbol = invertSymbol(symbol);
              
              var newDelta = parseInt(delta) > 0 ? parseInt(delta) : (parseInt(delta)*-1);
              if(checkOS.check() == 'Windows') newDelta = newDelta*5;

              var valor = symbol + '=' + newDelta + 'px';

              $(this).stop(true, true).animate({
                  scrollLeft: valor
              }, 50);

          });

      }
                           
    }
  	
    return {
      restrict: 'E',
      templateUrl : 'views/partials/scroll-home.html',
      scope:{ arrBarras : '=info', workScroll : '=workScroll', callback : '&callback' },
      controller: function($scope){
      	
      },
      link: function postLink(scope, element, attrs) {

        console.log(checkOS.check());

        scope.sizeBarras = [];
        
        scope.arrBarras.forEach(function(elem, key){
          scope.sizeBarras.push( elem.length-1 );
        });

        scope.fullArrBarras = prepareArrBarras( scope.arrBarras );

        elem = jQuery(element);

        scope.$watch('arrBarras', function(newValue, oldValue){

          scope.sizeBarras = [];
          
          newValue.forEach(function(elem, key){
            scope.sizeBarras.push( elem.length-1 );
          });

          console.log(scope.sizeBarras);

          scope.fullArrBarras = prepareArrBarras( newValue );

        });

        /*
        var lastDistance = 0;
        $($window).swipe({
          swipeStatus:function(event, phase, direction, distance, duration, fingerCount){
            console.log('phase', phase, 'direction', direction, 'distance', distance);

            if(distance == 'left') distance = distance * -1;
            onScroll(event, distance, 0, 0, scope);

          },
          threshold:100
        });
        */
    		
        var start = {x:0, y:0};
        $($window).on('touchstart', function(event){
          
          start.x = event.originalEvent.touches[0].pageX;
          start.y = event.originalEvent.touches[0].pageY;

        });

        $($window).on('touchmove', function(event){

          if(scope.workScroll){

            var offset = {};
            offset.x = start.x - event.originalEvent.touches[0].pageX;
            offset.y = start.y - event.originalEvent.touches[0].pageY;

            //DIRECAO
            var direcao = 'y';
            if(offset.x != 0) direcao = 'x';

            var passo = offset.y;
            if(direcao == 'x') passo = offset.x;

            onScroll(event, passo*0.4 , 0, 0, scope);

            start.x = event.originalEvent.touches[0].pageX;
            start.y = event.originalEvent.touches[0].pageY;

            //return false;

          }else{
            //return true;
          }

        });

		    Hamster($window).wheel(function(event, delta, deltaX, deltaY){

          onScroll(event, delta, deltaX, deltaY, scope);

        }); 
		
	   }
    };
  }]);
