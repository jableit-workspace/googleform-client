export const API_URL = {
  baseUrl: process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_SERVER_URL,
  // ! survey
  update_survey: 'question/',
  delete_survey: 'question/',
  get_survey: 'question/',

  get_myList: 'question/mypaper/',
  update_form: 'question/my/',

  get_statistics: 'question/statistics/',
  get_statistics_list: 'question/statistics_list',



} as const;
