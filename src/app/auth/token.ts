export interface Token {
  token: string;
  user: {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    img_profile: string;
  };
}
