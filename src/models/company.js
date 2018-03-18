export default{
  company_Id:"",
  company_Name:"",
  company_Address:"",
  company_Email:"",
  company_CEO:"",
  company_Founder:"",
  company_Website:"",
  company_Information:"",
  company_IsActive:"",
  headers: [
    {
      text: 'Company Name',
      align: 'left',
      sortable: false,
      value: 'company_Name'
    },
    {text:'Headquarters', value:'company_Address', align:'left'},
    {text:'Website', value:'company_Website', align:'left'},
    { text: 'Active', value: 'company_IsActive' },
  ]
};
