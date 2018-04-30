/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
