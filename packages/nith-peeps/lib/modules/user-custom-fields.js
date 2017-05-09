import Users from 'meteor/vulcan:users';
import SimpleSchema from 'simpl-schema';

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
  classOf: {
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

  levelOfDegree: {
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
  }
    
}

addUserFields(fieldSchemaMapping);
