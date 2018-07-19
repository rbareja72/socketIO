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

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){});
});
var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not Supported');
  }
  navigator.geolocation.getCurrentPosition(function (position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    alert('unable to fetch location');
  });
});
