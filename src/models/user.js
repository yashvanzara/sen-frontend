export default {
  user_StudentId:"",
  user_TypeFlag:2,
  user_FirstName:"",
  user_MiddleName:"",
  user_LastName:"",
  user_Password:"",
  user_DateOfBirth:null,
  user_Gender:"M",
  user_ContactNo:"",
  user_EmailId:"",
  user_AddressPermanent:"",
  user_AddressCurrent:"",
  user_ProgramId:"",
  user_JoinDate:new Date(),
  user_SscYear:"",
  user_HscYear:"",
  user_QualifyingBoard:"",
  user_QualifyingPercentage:"",
  user_QualifyingDegree:"",
  user_Stream:"",
  user_Cpi:0,
  user_CurrentBacklog:0,
  user_TotalBacklog:0,
  user_IsPlaced:0,
  user_IsInterested:1,
  user_IsActive:1,
  headers: [
    {text: 'Student ID', align:'left', value:'user_StudentId'},
    { text: 'First Name', align: 'left', sortable: true, value: 'user_FirstName' },
    {text: 'Last Name', align:'left', sortable:true, value:'user_LastName'},
    {text: 'Gender', align:'left', sortable:true, value:'user_Gender'},
    {text: 'Program', sortable:true, value:'user_ProgramId', align:'left'},
    {text: 'Placed', align:'left', sortable:true, value:'user_IsPlaced'},
    { text: 'Active', value: 'user_IsActive' }


  ]
};
