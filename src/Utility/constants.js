const constants = {
  BASE_URL: 'http://localhost:3000',
  PRODUCTION_URL: '',
  ONLY_PLACEMENT_CELL_MEMBER: 4,
  ONLY_STUDENT: 2,
  PLACEMEN_CELL_MEMBER_AND_STUDENT: 6,
  ADMIN: 1,
  QUESTION_SOLVED:1,
  QUESTION_NEEDS_REVIEW:2,
  QUESTION_HELP_NEEDED:4,

  //Failure Scenarios
  INVALID_DATES: 'Please correct the dates!',
  COLOUR_RED: '#F44336',
  AUTH_FAILURE: 'Authentication Failure! Please check credentials!',
  NO_QUESTIONS_AVAILABLE:'No Questions available yet!',
  ALREADY_LAST_QUESTION:'Already on last Question!',
  ALREADY_FIRST_QUESTION:'Already on first Question!',

  //Success scenarios
  COLOUR_GREEN: '#00e676',
  OPENING_CREATED: 'Job Opening Created Successfully!',
  CHANGES_SAVED: 'All changes Saved!',
  COMPANY_CREATED: 'Company added successfully!',
  AUTH_SUCCESS: 'Authentication Successful!',
  QUESTION_ADDED_FOR_APPROVAL:'Question sent for approval!',
  QUESTION_PROGRESS_SAVED:'Progress Saved!',

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
