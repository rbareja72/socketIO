var socket = io();
socket.on('connect', function(){
  console.log('connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(error){
    if(error){
      alert(error);
      window.location.href ='/';
    }else{
      console.log('No Error');
    }
  });
});

function scrollToBottom (){
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('updateUserList', function(users){
  console.log(users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user){
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
  console.log(message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html =  Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery ('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  var m = jQuery('[name=message]').val().trim();
  if(m===''){
    return;
  }
  socket.emit('createMessage', {
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
