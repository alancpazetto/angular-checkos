'use strict';

/**
 * @ngdoc service
 * @name angular_checkos.angularCheckos
 * @description
 * # Checkos
 * Service in the angular_checkos.
 */
angular.module('angular_checkos')
  .service('angularCheckos', function Checkos() {
    
    this.check = function(){
  		var OSName="Unknown OS";
		if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
		return OSName;
	}

  });
