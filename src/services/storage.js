class Storage {
  constructor(key) {
    this.key = key;
  }

  get() {
    const res = localStorage.getItem(this.key);
    return res ? JSON.parse(res) : null;
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export default Storage;
