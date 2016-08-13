
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var labelIndex = 0;
      var count=0;
      var start;
      var end;
      var latitude;
      var longitude;
      function initMap() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 28.6544, lng:  77.1689}
        });
           
             google.maps.event.addListener(map, 'click', function(event) {
             
          addMarker(event.latLng, map);
          latitude = event.latLng.lat();
             longitude = event.latLng.lng();


             console.log(longitude);
             console.log(latitude);
            
              console.log(count);
              if(count==0){
                start= { lat: latitude, lng: longitude};
              }
              else if(count==1){
              end= { lat: latitude, lng: longitude};
              directionsDisplay.setMap(map);
              calculateAndDisplayRoute(directionsService, directionsDisplay);
              
            }
            else
            {
              start=end;
             end= { lat: latitude, lng: longitude};
              directionsDisplay.setMap(map);
              calculateAndDisplayRoute(directionsService, directionsDisplay); 
            }



               count++;
        }); 
             
           

      }

       function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        var marker = new google.maps.Marker({
          position: location,
          label: labels[labelIndex++ % labels.length],
          map: map
        });
        
      }


      function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        console.log(start);
        console.log(end);
        directionsService.route({
          origin: start,
  destination: end,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
