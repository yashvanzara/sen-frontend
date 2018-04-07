export default {
  default_object: {
    question_Id: "",
    question_Title: "",
    question_Description: "",
    question_Solution: "",
    question_DifficultyLevel: 3,
    question_IsActive: 1,
    question_CreatorUserId: 0,
    question_ApprovedByUserId: null,
  },

  difficulty_levels: [1, 2, 3, 4, 5],
  headers: [
    {
      text: 'Question',
      align: 'left',
      sortable: true,
      value: 'question_Title'
    },
    {
      text: 'Difficulty',
      align: 'left',
      sortable: 'true',
      value: 'question_DifficultyLevel'
    },
    {
      text: 'Approved',
      align: 'left',
      sortable: 'true',
      value: 'question_ApprovedByUserId'
    },
    {
      text: 'Active',
      align: 'left',
      sortable: 'true',
      value: 'question_IsActive'
    }


  ]
};
