/**
 * User Model.
 */

export class User {

  _id?;
  firstName = '';
  lastName = '';
  company = '';
  email = '';
  emailVerified = false;
  profileImage = '';

  wallet = {
    address: '',
    provider: ''
  };

  address = {
    street: '',
    state: '',
    city: '',
    country: '',
    pinCode: ''
  };

  subscribeToUpdates = true;
  isAdmin = false;
  active = false;
  dateOfBirth: Date;
  wallets: Array<any> = [];

  twoStepVerificationEnabled = false;

  constructor(data = {}) {

    Object.assign(this, data);

  }

}
