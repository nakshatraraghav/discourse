type response = {
  variant: "destructive" | "default" | null | undefined;
  title: string;
  description: string;
};

export function handleUserCreationResponse(status: number) {
  let response: response = {
    variant: "destructive",
    title: "Uh oh! Something went wrong.",
    description: "There was a problem with your user creation request.",
  };

  switch (status) {
    case 201:
      response.variant = "default";
      response.title = "User Created";
      response.description = "Your user account was successfully created.";
      break;
    case 400:
      response.title = "Invalid Request";
      response.description =
        "The request to create a user is invalid or malformed.";
      break;
    case 401:
      response.title = "Unauthorized";
      response.description = "You are not authorized to create a user account.";
      break;
    case 403:
      response.title = "Forbidden";
      response.description = "Creating a user account is forbidden.";
      break;
    case 409:
      response.title = "Conflict";
      response.description = "A user with the same information already exists.";
      break;
    case 500:
      response.title = "Server Error";
      response.description =
        "There was a server error while processing your user creation request.";
      break;
    default:
      response.variant = "default";
      break;
  }

  return response;
}
