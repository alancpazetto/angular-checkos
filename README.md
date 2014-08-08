angular-checkos
===============

Angular service to check client OS.

How to install
===============

Using bower:
```
bower install angular-checkos [--save]
```

Or using Git:
```
git clone git://github.com/alancpazetto/angular-checkos.git
```

How to use
===============

Include the js file in project:
<script type="text/javascript" src="path/to/angular-checkos-min.js"></script>

Add angular-checkos in your app module:
angular.module('you app', ['angular_checkos']);

Use:
app.directive('test', ['angularCheckos', function(checkOS){
	console.log(checkOS.check());
}]);

Returns
===============

The checkOS.check() returns this values:

Windows, MacOS, UNIX or Linux.

Credits
===============

Logic from here http://www.javascripter.net/faq/operatin.htm
Copyright © 1999-2012, JavaScripter.net.

I only made the angular service to help angular developers! :)

Thanks!