String.prototype.tokenize = function() {
  return this.split(/\s+/);
}

Array.prototype.choice = function() {
  var i = floor(random(this.length));
  return this[i];
}

function MarkovGeneratorWord(n, max) {
  this.n = n;
  this.max = max;
  this.ngrams = {};
  this.beginnings = [];

  this.feed = function(text) {

    var tokens = text.tokenize();

    // Discard this line if it's too short
    if (tokens.length < this.n) {
      return false;
    }

    var beginning = tokens.slice(0, this.n).join(' ');
    this.beginnings.push(beginning);

    for (var i = 0; i < tokens.length - this.n; i++) {
      gram = tokens.slice(i, i + this.n).join(' ');
      next = tokens[i + this.n];

      if (!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }
      this.ngrams[gram].push(next);
    }
  }

  this.generate = function() {

    var current = this.beginnings.choice();

    var output = current.tokenize();

    for (var i = 0; i < this.max; i++) {
      if (this.ngrams[current]) {
        var possible_next = this.ngrams[current];
        var next = possible_next.choice();
        output.push(next);
        current = output.slice(output.length - this.n, output.length).join(' ');
      } else {
        break;
      }
    }
    return output.join(' ');
  }
}
