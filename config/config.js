class Config {
  constructor(){
    this.user = "Anonymous";
    this.url = undefined
    this.auth = undefined;
    this.rps = undefined;
  }

  set({user = "Anonymous", url, auth, rps}) {
    this.user = user ? user : this.user;
    this.url = url ? url : this.url;
    this.auth = auth ? auth : this.auth;
    this.rps = rps ? rps : this.rps;
  }
}

const config = new Config()
module.exports = config;