'use strict';

angular.module('fireflyApp')
  .controller('FooterCtrl', function ($scope, $location) {
    
  	$scope.url = document.URL;


    $scope.copyUrl = function(e) {
	    var clip = new ClipboardEvent( 'copy' );
	    clip.clipboardData.setData( 'text/plain', "test" );
	    clip.preventDefault();
	 
	    e.target.dispatchEvent( clip );
    }
  });
