import Users from 'meteor/vulcan:users';
import SimpleSchema from 'simpl-schema';
import { Utils } from 'meteor/vulcan:lib';

// also being repeated in nith:flagging
// put it in Utils 
function addUserFields(fieldSchemaMapping){
  for(let key in fieldSchemaMapping) {
    if (fieldSchemaMapping.hasOwnProperty(key)) {
      Users.addField({
        fieldName: `${key}`,
        fieldSchema: fieldSchemaMapping[key]
      })
    }
   }
}

function buildYearSelectorOps() {
  let list = [];
  let lastValidYear = new Date().getFullYear() + 5;
  for (let i = 1986; i <= lastValidYear; i++) {
    list.push({
      value: i,
      label: i
    });
  }

  return list;
}

function buildBranches() {
  let list = [];
  let branches = new Set([
    "ECE",
    "MED",
    "Archi",
    "EEE",
    "Civil",
    "CSE",
    "Chemistry",
    "Chemical",
    "Mathematics",
    "Physics",
    "CEE",
    "Mgtm & Humanity",
    "CMSE"
  ])

  for (let branch of branches) {
    list.push({
      value: branch,
      label: branch
    })
  }

  return list;
}

let fieldSchemaMapping = {
  linkedinId: {
    type: String,
    regEx: /(ftp|http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
    optional: true,
    mustComplete: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },
  rollNoOrRegNo: {
    type: String,
    max: 20,
    optional: true,
    mustComplete: true,
    control: "text",
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },
  graduatingYear: {
    type: SimpleSchema.Integer,
    optional: true,
    mustComplete: true,
    control: "select",
    form: {
      options: function classOfOptions() {
        return buildYearSelectorOps();
      }
    },
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },
  branch: {
    type: String,
    optional: true,
    mustComplete: true,
    control: "select",
    form: {
      options: function branchOptions() {
        return buildBranches();
      }
    },
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },

  degreeType: {
    type: String,
    optional: true,
    mustComplete: true,
    control: "select",
    form: {
      options: function branchOptions() {
        return [
          {value: "Bachelor's", label: "Bachelor's"},
          {value: "Master's", label: "Masters's"},
          {value: "Integrated", label: "Integrated"},
          {value: "PhD", label: "PhD"}
        ]
      }
    },
    insertableBy: ['members'],
    editableBy: ['members'],
    viewableBy: ['members']
  },

  // not indelible
  phone: {
    type: String,
    regEx: SimpleSchema.RegEx.Phone,
    optional: true,
    insertableBy: ["members"],
    editableBy: ["members"],
    viewableBy: ["members"]
  },
  website: {
    type: String,
    optional: true,
    insertableBy: ["members"],
    editableBy: ["members"],
    viewableBy: ["members"]
  },
  currentOccupation: {
    type: String,
    optional: true,
    mustComplete: true,
    max: 100,
    insertableBy: ["members"],
    editableBy: ["members"],
    viewableBy: ["members"]
  },
  availableForServices: {
    type: Boolean,
    mustComplete: true,
    optional: true,
    insertableBy: ["members"],
    editableBy: ["members"],
    viewableBy: ["members"],
    control: "select",
    form: {
      options: function availableForServices() {
        return [
          {value: true, label: "true"},
          {value: false, label: "false"}
        ]
      }
    },
  },

  // had to repeat this from vulcan and change just one setting 'viewableBy' to let any loggedin user access any user's email 
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    mustComplete: true,
    control: "text",
    insertableBy: ['guests'],
    editableBy: ['members'],
    viewableBy: ["members"],
    onInsert: (user) => {
      // look in a few places for the user email
      const meteorEmails = Utils.getNestedProperty(user, 'services.meteor-developer.emails');
      const facebookEmail = Utils.getNestedProperty(user, 'services.facebook.email');
      const githubEmail = Utils.getNestedProperty(user, 'services.github.email');
      const googleEmail = Utils.getNestedProperty(user, 'services.google.email');
      const linkedinEmail = Utils.getNestedProperty(user, 'services.linkedin.emailAddress');

      if (meteorEmails) return _.findWhere(meteorEmails, { primary: true }).address;
      if (facebookEmail) return facebookEmail;
      if (githubEmail) return githubEmail;
      if (googleEmail) return googleEmail;
      if (linkedinEmail) return linkedinEmail;
      return undefined;
    }
    // unique: true // note: find a way to fix duplicate accounts before enabling this
  }
  // } 
}

addUserFields(fieldSchemaMapping);
