export default {
  default_object: {
    jobOpening_Id: "",
    jobOpening_CompanyId: "",
    jobOpening_JobProfileId: "",
    jobOpening_HrName: "",
    jobOpening_HrContact: "",
    jobOpening_PackageForJob: "",
    jobOpening_StipendForInternship: "",
    jobOpening_RequirementInternship: "",
    jobOpening_RequirementInternshipJob: "",
    jobOpening_RequirementJob: "",
    jobOpening_RegistrationStartDate: "",
    jobOpening_RegistrationEndDate: "",
    jobOpening_Information: "",
    jobOpening_RequirementSscPercentage: "",
    jobOpening_RequirementHscPercentage: "",
    jobOpening_RequirementGraduationCpi: "",
    jobOpening_RequirementPostGraduationCpi: "",
    jobOpening_PlacementSeasonId: "",
    jobOpening_IsSummerInternship: 0,
  },
  list_headers:[
    {
      text: 'Job Opening',
      align: 'left',
      sortable: true,
      value: 'jobOpening_Id'
    },
    {
      text: 'Company',
      align: 'left',
      sortable: false,
      value: 'jobOpening_CompanyId'
    },
  ]
};
