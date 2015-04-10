/*jslint white: true */ 
(function (window){
 'use strict';	


 	var base_url = '/mfisheries/coastguard/api/index.php/',
	 	starttrackid,
	 	type,
	 	userid = '2',
	 	map,
	 	markers = [],
		user = [],
		origin = [{"jb": 10.447805230449376, "kb": -61.405677795410156, "x" : "0.0", "y" : "0.0"},{"jb":10.5438616,"kb": -61.37915709999999, "x" : "0.0", "y" : "0.0"},{"jb":10.3439566,"kb":-61.279170699999996, "x" : "0.0", "y" : "0.0"}],		 		 
		count = 0;


	function initialize() {
		var trinidad = new google.maps.LatLng(10.533720315515536,-61.59210205078125);

		var mapOptions = {
			zoom		:	9,
			center		: 	trinidad,
			mapTypeId	: 	google.maps.MapTypeId.ROADMAP 
		};

		var data = {};

		map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);


		google.maps.event.addListener(map, 'click', function(event) {
		 	addMarker(event.latLng);	
		 // console.log(event.latLng);		
		});		   		 
	} 


	// Add a marker to the map and push to the array.
	function addMarker(location) {
		 // console.log(location);
		 var title = location.k+' '+location.B,
		 
		 marker = new google.maps.Marker({
			 position	:	location,//new google.maps.LatLng(location.jb,location.kb),
			 map		: 	map,
			 title		: 	title
		 });

		addInfoWindow(title, marker);					
		var data = {};
		data.userid = userid;
		data.rssi = '54';
		data.accuracy = '145.65';
		data.altitude = '5645';
		data.bearing = '45';		
		data.speed = '54';
		data.mockprovider = '1';
		data.latitude = location.k;
		data.longitude = location.B;
		data.deviceTimestamp = timeStamp();
		data.type = "track";
		// data.starttrackid = 2272;
		// console.log(location);
		markers.push({"latitude":location.k,"longitude":location.D});	
		user.push(data);
		 // console.log(JSON.stringify(data));
	}

	function addInfoWindow(name,marker){
		var infowindow = new google.maps.InfoWindow();

		google.maps.event.addListener(marker, 'click', (function(name, marker) {
			return function() {
				infowindow.setContent(name);
				infowindow.open(map, marker);
			}
		})(name,marker));			 
	}

	// Sets the map on all markers in the array.
	function setAllMap(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}		 		

	// Removes the overlays from the map, but keeps them in the array.
	function clearOverlays() {
		setAllMap(null);
	}

	// Shows any overlays currently in the array.
	function showOverlays() {
		setAllMap(map);
	}	 

	function timeStamp() {
		var str = "";

		var currentTime = new Date(),
		year = currentTime.getFullYear(),
		month = currentTime.getMonth()+1,
		day = currentTime.getDate(),
		hours = currentTime.getHours(),
		minutes = currentTime.getMinutes(),
		seconds = currentTime.getSeconds();

		if (minutes < 10) {
		minutes = "0" + minutes
		}
		if (seconds < 10) {
		seconds = "0" + seconds
		}
		str += year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return str;
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

	function returntracks(){		
		var temp = [];
		for (var i = 1; i <user.length ; i++) {
			temp.push(user[i]);
		};
		return temp;
	}

	function stringify(){
		$('#pts').unbind('click').click(function(){
			console.log(JSON.stringify(user));
		});
	}

	function makeDup(data,num){
		var arr = [];
		$.each(data,function(i,d){
			for (var i = 0; i < num; i++) {
				arr.push(d);
			};
		});		
		return arr;
	}

	function postFirstTrack(){		
		
		$("#postfirsttrack").unbind('click').click(function(){
			
			// // if(user.length === 1){
			// // 	var data = {
			// // 		"tracks" : JSON.stringify(user)
			// // 	};				
			// // 	_post('posttrack',data,
			// // 		function(res){					
			// // 			$("#error").html(res);				
			// // 			console.log(res);
			// // 		},
			// // 		function(res){						
			// // 			$("#error").html(res.responseText);
			// // 		}
			// // 	);
			// // }
			// console.log(JSON.stringify(user));
			console.log(JSON.stringify(markers));
		});	

	}

	function postAllTrack(){		
		$("#postalltracks").unbind('click').click(function(){
			
			var data = {					
				"tracks" : JSON.stringify(user)
			};

			_post('posttrack',data,
				function(res){
					$("#error").html(res);				
					console.log(res);
				},
				function(res){						
					$("#error").html(res.responseText);
				}
			);			
		});		
	}


	function postAllTrackBundle(){		
		$("#bundle").unbind('click').click(function(){
			
			var data = {					
				"tracks" : JSON.stringify(user)
			};

			// _post('posttrackbundle',data,
			_post('posttrack',data,
				function(res){
					$("#error").html(res);				
					console.log(res);
				},
				function(res){

					$("#error").html(res.responseText);
				}
			);
		});		
	}


	//Code Loads when Document Loads
	$(window.document).ready(function (){ 

		google.maps.event.addDomListener(window, 'load', initialize);	
		stringify();
		postFirstTrack();
		postAllTrack();	
		postAllTrackBundle();
	});
		
 }(this)); 