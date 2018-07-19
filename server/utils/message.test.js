const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage',()=>{
  it('should generate a correct message object',()=>{
    var from = 'admin';
    var text = 'i am kicking you out';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
describe('generateLocationMessage',()=>{
  it('should generate a correct location object',()=>{
    var from = 'admin';
    var lat = 15;
    var long = 20;
    var url = 'https://www.google.com/maps?q=15,20';
    var message = generateLocationMessage(from, lat, long);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url})
  });
});
