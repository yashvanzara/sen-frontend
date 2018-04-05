export default {

  default_object: {
    spcPolicy_Id:"",
    spcPolicy_PlacementSeasonId:"",
    spcPolicy_CriteareaOrCategory:"",
    spcPolicy_Minimum:"",
    spcPolicy_Maximum:"",
    spcPolicy_SwitchAllowed:0,
    spcPolicy_Multiplier:"",
    spcPolicy_Description:""
  },
  headers: [
    {
      text: 'Policy ID',
      align: 'left',
      sortable: false,
      value: 'spcPolicy_Id'
    },
    {
      text: 'Placement Season',
      align: 'left',
      sortable: false,
      value: 'spcPolicy_PlacementSeasonId'
    },
    {
      text: 'Minimum Package',
      align: 'left',
      sortable: false,
      value: 'spcPolicy_Minimum'
    },
    {
      text: 'Maximum Package',
      align: 'left',
      sortable: false,
      value: 'spcPolicy_Maximum'
    },
    {
      text: 'Switches allowed',
      value: 'spcPolicy_SwitchAllowed',
      align: 'left',
      sortable: true
    },
    {
      text: 'Description',
      value: 'spcPolicy_Description',
      align: 'left',
      sortable: true
    }
  ]
};
