export default class User {
  constructor(
    full_name,
    email,
    password,
    password_confirmation,
    farm_name,
    security_question,
    security_question_answer
  ) {
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.farm_name = farm_name;
    this.security_question = security_question;
    this.security_question_answer = security_question_answer;
  }
}
