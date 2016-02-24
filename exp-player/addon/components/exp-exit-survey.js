import Ember from 'ember';

import ExpFrameBaseComponent from 'exp-player/components/exp-frame-base';
import layout from '../templates/components/exp-dynamic-form';

const defaultSchema = {
  "schema": {
    "title":"Exit Survey",
    "description":"How was your experience?",
    "type":"object",
    "properties": {
      "birthdate": {
        "type":"text",
        "format": "date",
        "title":"What is the birthdate of the child who just participated in the study? We ask twice to check for typos."
      },
      "person": {
        "type":"string",
        "title":"Which person would you (the parent) have trusted more to name objects accurately?"
      },
      "ranking": {
        "type":"string",
        "title":"Any comments or suggestions? (Did you get confused by any instructions? Did the study run smoothly?)",
      }
    }
  },
  "options": {
    "fields": {
      "birthdate": {
        "helper": "None of the information we collet is used to identify your child. However, if you are uncomfortable providing an exact birthday, you're welcome to give another date within that week.",
      },
      "person" : {
        "size": 20,
        "helper": "You don't have to be sure -- if you had to choose, which person's answers would you have gone with?",
      },
      "suggestions": {
        "type": "textarea",
        "rows": 5,
        "cols": 40,
      }
    }
  }    
};

export default ExpFrameBaseComponent.extend({
    layout: layout,
    type: 'exp-exit-survey',
    meta: {
        name: 'ExpExitSurvey',
        description: 'Exit survey for Lookit.',
        parameters: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'A unique identifier for this item'
                },
                form: {
                    type: 'jsonschema',
                    description: 'JSON-schema defining this item\'s form',
                    default: defaultSchema
                }
            },
            required: ['id']
        },
        data: {
            type: 'object',
            properties: {
                formData: {
                    type: 'object'
                }
            }
        }
    },
    formSchema: Ember.computed('form', function() {
        return {
            schema: this.get('form'),
            options: {
                form: {
                    buttons: {
                        update: {
                            type: 'button',
                            value: 'Update'
                        }
                    }
                }
            }
        };
    }),
    formData: null,
    formActions: Ember.computed(function() {
        var root = this;

        return {
            update: function() {
                root.set('formData', this.getValue());
            }
        };
    })
});