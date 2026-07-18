class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.size = 0;
    this.bucket = new Array(this.capacity);
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);
    if (!this.bucket[index]) {
      this.bucket[index] = [];
    }
    for (let i = 0; i < this.bucket[index].length; i++) {
      const [existingKey, existingValue] = this.bucket[index][i];
      if (existingKey === key) {
        this.bucket[index][i][1] = value;
        return;
      }
    }
    this.bucket[index].push([key, value]);
    this.size++;
    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }
  get(key) {
    const index = this.hash(key);
    if (!this.bucket[index]) {
      return null;
    }

    for (let i = 0; i < this.bucket[index].length; i++) {
      const [existingKey, existingValue] = this.bucket[index][i];
      if (existingKey === key) {
        return existingValue;
      }
    }
    return null;
  }
  has(key) {
    const index = this.hash(key);
    if (!this.bucket[index]) {
      return false;
    }

    for (let i = 0; i < this.bucket[index].length; i++) {
      const [existingKey, existingValue] = this.bucket[index][i];
      if (existingKey === key) {
        return true;
      }
    }
    return false;
  }
  remove(key) {
    const index = this.hash(key);
    if (!this.bucket[index]) {
      return false;
    }

    for (let i = 0; i < this.bucket[index].length; i++) {
      const [existingKey, existingValue] = this.bucket[index][i];
      if (existingKey === key) {
        this.bucket[index].splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }
  length(key) {
    return this.size;
  }
  clear() {
    this.bucket = new Array(this.capacity);
    this.size = 0;
  }
  keys() {
    const allKeys = [];

    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i]) {
        for (let j = 0; j < this.bucket[i].length; j++) {
          const [key] = this.bucket[i][j];
          allKeys.push(key);
        }
      }
    }
    return allKeys;
  }
  values() {
    const allValues = [];

    for (let i = 0; i < this.bucket.size; i++) {
      if (this.bucket[i]) {
        for (let j = 0; j < this.bucket[i].length; j++) {
          const [, value] = this.bucket[i][j];
          allValues.push(value);
        }
      }
    }
    return allValues;
  }
  entries() {
    const allEntries = [];

    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i]) {
        for (let j = 0; j < this.bucket[i].length; j++) {
          const [key, value] = this.bucket[i][j];
          allEntries.push([key, value]);
        }
      }
    }
    return allEntries;
  }
  resize() {
    this.capacity *= 2;
    const newBuckets = new Array(this.capacity);

    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i]) {
        for (let j = 0; j < this.bucket[i].length; j++) {
          const [key, value] = this.bucket[i][j];
          const newIndex = this.hash(key);

          if (!newBuckets[newIndex]) {
            newBuckets[newIndex] = [];
          }
          newBuckets[newIndex].push([key, value]);
        }
      }
    }

    this.bucket = newBuckets;
  }
}

export { HashMap };
