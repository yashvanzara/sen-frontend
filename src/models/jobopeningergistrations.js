export default {
  default_object: {
    jobOpeningRegistration_OpeningId: 0,
    jobOpeningRegistration_StudentId: 0,
    jobOpeningRegistration_Timestamp: null
  },
  job_opening_registration_headers: [
    {
      text: 'Student ID',
      align: 'left',
      sortable: true,
      value: 'jobOpeningRegistration_StudentId'
    },
    {
      text: 'Student Name',
      align: 'left',
      sortable: false,
    },
    {
      text: 'Registration time',
      align: 'left',
      sortable: true,
      value: 'jobOpeningRegistration_Timestamp'
    }
  ]
};
