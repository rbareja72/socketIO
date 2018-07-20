const expect = require('expect');

const {isRealString} = require('./validations');
describe('isRealString',()=>{
  it('should reject nonString values',()=>{
    var res = isRealString(1231);
    expect(res).toBe(false);
  });
  it('should reject String with only spaces',()=>{
    var res = isRealString('            ');
    expect(res).toBe(false);
  });
  it('should allow string with non-space characters',()=>{
    var res = isRealString('   sfsdfs         ');
    expect(res).toBe(true);
  });
});
