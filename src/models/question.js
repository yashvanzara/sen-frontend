export default{
  question_Id:"",
  question_Title:"",
  question_Description:"",
  question_Solution:"",
  question_DifficultyLevel:"",
  question_IsActive:"",
  question_CreatorUserId:"",
  question_ApprovedByUserId:"",
  difficulty_levels:[1, 2, 3, 4, 5],
  headers: [
    {
      text: 'Question',
      align: 'left',
      sortable: true,
      value: 'question_Title'
    },
    {
      text: 'Difficulty',
      align:'left',
      sortable:'true',
      value:'question_DifficultyLevel'
    },
    {
      text: 'Approved',
      align:'left',
      sortable:'true',
      value:'question_ApprovedByUserId'
    },
    {
      text: 'Active',
      align:'left',
      sortable:'true',
      value:'question_IsActive'
    }


  ]
};
