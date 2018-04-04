const constants = {
  BASE_URL: 'http://localhost:3000',
  PRODUCTION_URL: '',

  //Failure Scenarios
  INVALID_DATES: 'Please correct the dates!',
  COLOUR_RED: '#F44336',

  //Success scenarios
  COLOUR_GREEN: '#00e676',
  OPENING_CREATED: 'Job Opening Created Successfully!',
  CHANGES_SAVED: 'All changes Saved!',
  COMPANY_CREATED: 'Company added successfully!',

  //Validations
  RULES: {
    email: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }
}
module.exports = constants;
