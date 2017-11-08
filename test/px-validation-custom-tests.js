suite('Custom Automation Tests for px-validation', function() {
  let px_validation;

  suiteSetup(function(done){
    px_validation = fixture('px_validation_1');
    flush(function(){
      done();
    });
  });

  test('Check there is a single px-validator child defined on test fixture', function(){
    assert.lengthOf(Polymer.dom(px_validation).children, 1);
  });
  test('Integer isNumber validation returns true', function() {
    assert.isTrue(px_validation.validate(2).passedValidation);
  });
  test('String representation of number via isNumber validation returns true', function() {
    assert.isTrue(px_validation.validate('2').passedValidation);
  });
});
