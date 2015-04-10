/*jslint white: true */ 
(function (window){
 'use strict';	

 	// if you are posting to server, user this as base
 	var base_url = '/',	 
	 	map,
	 	markers = [];


	function initialize() {
		// change origin here...
		var origin = new google.maps.LatLng(10.5,-61.4);

		var mapOptions = {
			zoom		:	10,
			center		: 	origin,
			mapTypeId	: 	google.maps.MapTypeId.ROADMAP 
		};

		var data = {};

		map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);


		google.maps.event.addListener(map, 'click', function(event) {
		 	addMarker(event.latLng);			 	
		});		   		 
	} 


	// Add a marker to the map and push to the array.
	function addMarker(location) {
		var title = location.k+' '+location.B,
		 
		 marker = new google.maps.Marker({
			 position	:	location,//new google.maps.LatLng(location.jb,location.kb),
			 map		: 	map,
			 title		: 	title
		 });
		markers.push({"latitude":location.k,"longitude":location.D});	
	}




	function _post(url, data, success_callback, error_callback){
		$.ajax({
			type: "POST",
			url: base_url + url,
			data: data,
			success: function(res){
				if(typeof success_callback === 'function'){
					success_callback(res);
				}
			},
			error: function(res){
				if(typeof error_callback === 'function'){
					error_callback(res);
				}	
			}
		});
	}


	function getpoints(){		
		
		$("#get_points").unbind('click').click(function(){
			
			// if(user.length === 1){			
			// 	_post('myserverurl',markers,
			// 		function(res){					
			// 			$("#error").html(res);				
			// 			console.log(res);
			// 		},
			// 		function(res){						
			// 			$("#error").html(res.responseText);
			// 		}
			// 	);
			// }			
			console.log(JSON.stringify(markers));
		});	

	}

	//Code Loads when Document Loads
	$(window.document).ready(function (){ 

		google.maps.event.addDomListener(window, 'load', initialize);			
		getpoints();
	});
		
 }(this)); 