const {Users} = require('./users');
const expect = require('expect');
describe('Users',()=>{
  var users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node Course'
    },{
      id: 2,
      name: 'Angelica',
      room: 'React Course'
    },{
      id: 3,
      name: 'Gohan',
      room: 'Node Course'
    }];
  });

  it('should add new user',()=>{
    var users = new Users();
    var user = {
      id: 1,
      name: 'Rahul',
      room: 'Go'
    };
    var res = users.addUser(1, 'Rahul','Go');
    expect(users.users).toEqual([user]);
  });
  it('should return names for node course',()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Gohan']);
  });
  it('should return names for react course',()=>{
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Angelica']);
  });
  it('should remove a user',()=>{
    var user = users.removeUser(2);
    expect(user.id).toBe(2);
    expect(users.users.length).toBe(2);
  });
  it('should not remove our user',()=>{
    var user = users.removeUser(44);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it('should find User',()=>{
    var user = users.getUser(3);
    expect(user.id).toBe(3);
  });
  it('should not find a user',()=>{
    var user = users.getUser(44);
    expect(user).toNotExist();
  });
});
