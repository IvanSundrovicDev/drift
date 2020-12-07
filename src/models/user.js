export default class User {
    constructor(
        username,
        email,
        password,
        password_confirmation,
        farm_name,
        security_question,
        security_question_answer
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation
        this.farm_name = farm_name;
        this.security_question = security_question
        this.security_question_answer = security_question_answer
    }
}