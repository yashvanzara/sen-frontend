const constants = {
  BASE_URL: 'http://192.168.137.1:3000',
  PRODUCTION_URL: '',
  ONLY_PLACEMENT_CELL_MEMBER: 4,
  ONLY_STUDENT: 2,
  PLACEMEN_CELL_MEMBER_AND_STUDENT: 6,
  ADMIN: 1,

  //Failure Scenarios
  INVALID_DATES: 'Please correct the dates!',
  COLOUR_RED: '#F44336',
  AUTH_FAILURE: 'Authentication Failure! Please check credentials!',

  //Success scenarios
  COLOUR_GREEN: '#00e676',
  OPENING_CREATED: 'Job Opening Created Successfully!',
  CHANGES_SAVED: 'All changes Saved!',
  COMPANY_CREATED: 'Company added successfully!',
  AUTH_SUCCESS: 'Authentication Successful!',

  //Validations
  RULES: {
    email: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    required: (value) => !!value || 'This field is required!',
  }
}
module.exports = constants;
