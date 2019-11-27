/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**

### Usage

    <px-validator validation-method="isNumber" import="px-example-validator.html"></px-validator>

@element px-validator
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <slot></slot>
`,

  is: 'px-validator',

  properties: {
    /**
     * The URL pointing to the validation function(s) to be imported for this validator.
     * See px-example-validator.html for an example of this.
     *
     *     <px-validator import="px-example-validator.html"></px-validator>
     */
    import: {
      type: String,
      value: ''
    },
    /**
     * Array container that stores the validation function(s) imported from the html import (specified in the `import` property).
     */
    validators: {
      type: Array,
      value: function(){
        return [];
      }
    },
    /**
     * Array containing the validation function names the developer wants to run against the value they wish to validate.
     * Should EITHER specify validation-method (for single) or multi-step-validation (for multiple).
     *
     *     <px-validator multi-step-validation='["isNumber", "isRed", "isBlue"]' import="px-example-validator.html"></px-validator>
     */
    multiStepValidation: {
      type: Array,
      value: function(){
        return [];
      }
    },
    /**
     * String containing the single validation function name the developer wants to run to validate the supplied test value.
     * Should EITHER specify validation-method (for single) or multi-step-validation (for multiple).
     *
     *     <px-validator validation-method='isNumber' import="px-example-validator.html"></px-validator>
     */
    validationMethod: {
      type: String,
      value: ''
    },
    /**
    * Additional arguments to pass in to the validation method. For cases like px-data-table where the `validate` method
    * is fired automatically instead of programmatically by the developer.
    */
    arguments: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  observers: [
    '_validationMethodChanged(multiStepValidation,validationMethod)'
  ],

  /**
   * Observer to update the validation method.
   */
  _validationMethodChanged: function () {
    if(this.validationMethod === undefined || this.multiStepValidation === undefined) return;
    this._importHref();
  },

  /**
   * Imports the Href with the validation methods.
   */
  _importHref: function () {
    this.validators = [];
    this.importHref(this.import, function(e) {
      if (this.validationMethod && window.PxValidators[this.validationMethod]){
        this.validators[0] = window.PxValidators[this.validationMethod];
      }
      else if(this.multiStepValidation) {
        this.multiStepValidation.forEach(function(method) {
          this.validators.push(window.PxValidators[method]);
        }.bind(this));
      }
      this.fire('px-validator-loaded');
    }, function(e) {
      console.error('Error, could not load ' + this.import);
    });
  }
});
