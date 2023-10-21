const username = {
  required_error: "Username is required for signup ",
  invalid_type: "Username should be of the string data type",
  min_length: "Username should be longer than 6 Characters",
  max_length: "Username cannot be longer than 15 Characters",
};

const email = {
  required_error: "Email is required for signup ",
  invalid_type: "Email should be of the string data type",
  invalid_email: "Enter a valid email address",
  min_length: "Email should be longer than 5 Characters",
  max_length: "Email cannot be longer than 30 Characters",
};

const password = {
  required_error: "Password is required for signup ",
  invalid_type: "Password should be of the string data type",
  min_length: "Password should be longer than 8 Characters",
  max_length: "Password cannot be longer than 30 Characters",
};

export { username, email, password };
