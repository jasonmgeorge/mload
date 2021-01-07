class Config {
  constructor(){
    this.name = "Anonymous";
    this.url = undefined
    this.auth = undefined;
    this.rps = undefined;
  }

  set({name = "Anonymous", url, auth, rps}) {
    this.name = name ? name : this.name;
    this.url = url ? url : this.url;
    this.auth = auth ? auth : this.auth;
    this.rps = rps ? rps : this.rps;
  }
}

const config = new Config()
module.exports = config;