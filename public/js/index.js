var socket = io();
socket.on('connect', function(){
  console.log('connected to server');

});
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data){
  console.log(data);
  var li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}:`);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){
    jQuery('[name=message]').val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not Supported');
  }
  locationButton.attr('disabled', 'disabled');
  locationButton.text('Fetching...');
  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(e){
    locationButton.removeAttr('disabled').text('Send Location');
    console.log(e);
  });
});
