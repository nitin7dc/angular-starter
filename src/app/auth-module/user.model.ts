/**
 * User Model.
 */

export class User {

  // MongoDb Object Id
  _id?: string;


  // Basic profile info
  user_name = '';
  email = '';
  password = '';
  first_name = '';
  last_name = '';
  bio_description = '';
  contact_number = '';
  date_of_birth: Date = null;
  company = '';
  timeZone = '';


  // flags
  is_email_verified = false;
  is_active = true;


  default_address = {
    first_name: '',
    last_name: '',
    address: '',
    state: '',
    city: '',
    zip_code: '',
    country: ''
  };


  profile_image: {
    small: '',
    medium: '',
    large: '',
    regular: ''
  };

  createdAt: Date = null;
  updatedAt: Date = null;
  subscribeToUpdates = true;

  constructor(user) {
    if (!user) {
      return;
    }
    Object.keys(user).forEach(key => {
      this[key] = user[key];
    });
  }

}
