export class UserModel {
  constructor({ uid, displayName, email, photoURL = null }) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
  }

  getFirstName() {
    return this.displayName?.split(" ")[0] || "Usuario";
  }
}
