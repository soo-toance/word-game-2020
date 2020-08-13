(function(exports){
	var Model = function Model(word) {
		this.word = word;
	}

	// Model Initialize 
	Model.prototype.initialize = function() {
		this.word.initialize();
	}

	// Model AddWord 
	Model.prototype.addWord = function(text) {
		this.word.pool.push(text);
	}

	// Model RemoveWord 
	Model.prototype.removeWord = function() {
		let index = (Math.random() * this.word.pool.length) | 0;
  		return this.word.pool.splice(index, 1)[0];
	}

    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);
