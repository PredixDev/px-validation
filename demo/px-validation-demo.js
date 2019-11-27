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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-icon-set/px-icon-set.js';
import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/css/px-demo-content-helper-styles.js';
import '../px-validation.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-demo-content-helper-styles"></style>

    <!-- Header -->
    <px-demo-header module-name="px-validation" description="Px-validation is a component that provides one or more built-in or developer-supplied validation methods for form elements, data table entries, etc. This component only handles the validation logic and return success/error object - see px-forms-design or px-data-table to see how this logic is then handled by the UI of the individual components.
        Be sure to click the link below to view the API documentation for the child component, px-validator." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">

        <px-validation id="validationEl">
          <px-validator validation-method="{{props.validationMethod.value}}" import\$="[[importPath]]../px-example-validator.html" arguments="[1,5]">
          </px-validator>
        </px-validation>

        <label id="label" for="example">Validation Method: <strong>{{props.validationMethod.value}}</strong></label>
        <input id="example" class="text-input input--regular" type="text" placeholder="" on-input="isValid">
        <br>
        <small id="validationWarning" class="caps form-field__help validation-error">{{errorMessage}}</small>

      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-validator" codepen-link="http://codepen.io/randyaskin/pen/dNyzzg/?editors=1001">
      </px-demo-component-snippet>
    </px-demo-interactive>


    <!-- API Viewer -->
    <px-demo-api-viewer source="px-validation"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-validation-demo',

  properties: {
    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          {
            configName: "Default",
            configReset: true
          }
        ]
      }
    },
    /**
     * String that displays the failedValidationErrorMessage
     *
     * @property errorMessage
     * @type Sring
     */
    errorMessage:{
      type: String,
      value: ""
    }
  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {

    validationMethod: {
      type: String,
      defaultValue: 'isNumber',
      inputType: 'dropdown',
      inputChoices: ['isNumber', 'alwaysFails', 'isBetween']
    },

    parentComponent: {
      type: Array,
      defaultValue: ['<px-validation>','</px-validation>']
    }
  },

  isValid : function() {
    var validator = dom(this.root).querySelector("#validationEl"),
        inputValue = dom(this.root).querySelector('#example').value,
        error = validator.validate(inputValue);
    if(inputValue && !error.passedValidation) {
      dom(this.root).querySelector("#validationWarning").classList.remove("hidden");
      dom(this.root).querySelector("#example").classList.add("validation-error");
      this.set('errorMessage', error.failedValidationErrorMessage);
    }
    else {
      dom(this.root).querySelector("#validationWarning").classList.add("hidden");
      dom(this.root).querySelector("#example").classList.remove("validation-error");
      this.set('errorMessage', '');
    }
  }
});
