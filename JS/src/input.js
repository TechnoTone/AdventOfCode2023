const fs = require("fs");

class Input {
  data;

  constructor(n, isDan = false) {
    n = ("0" + n.toString()).slice(-2);
    const file = isDan ? `dan-input/day${n}.txt` : `day${n}.txt`
    this.data = fs.readFileSync(file, "utf-8");
  }

  fromLines() {
    this.data = this.data.split(/\r?\n/);
    return this;
  }

  get() {
    return this.data;
  }

  asIntArray() {
    return this.data.map((x) => Number(x));
  }
}

module.exports = Input;
