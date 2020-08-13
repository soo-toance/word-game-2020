(function(exports){
	let Controller = function(model, view) {
		this.model = model;
        this.view = view;
	    let self = this;

	    // Start Button 클릭 시 Start     
	    this.view.initialize("start", function() {
	    	self.start();
	 	});

	 	// Input필드에서 Enter Key 입력 시 Answer
 	    this.view.initialize("answer", function() {
	    	self.hitAnswer();
	 	});

	    // Model에서 word Pool Remove
	 	this.view.bind("removeWord", function() {
            return self.removeWord();
        });

		// Model에서 word Pool Add
        this.view.bind("addWord", function(text) {
            self.addWord(text);
        });
	}

	// Start Game
	Controller.prototype.start = function() {
		let self = this;

		this.model.initialize(); 	
		self.view.render("start", {
			word: this.model.word
		});
	}


	// Hit Answer
	Controller.prototype.hitAnswer = function() {
		let self = this;

		self.view.render("hitAnswer", {
			word: this.model.word
		});
	}

	// Remove Word 
	Controller.prototype.removeWord = function() {
		let self = this;

		return self.model.removeWord();
	}


	// Add Word 
	Controller.prototype.addWord = function(text) {
		let self = this;

		self.model.addWord(text);
	}


	Controller.prototype.endGame = function() {
		let quiz = document.getElementById("quiz");
		let words = document.getElementsByClassName("word");

		clearInterval(this.gametimer);
		this.word.stopTimer();

		let length = words.length;

		for (let i = 0; i < length; i++)
		{
			quiz.removeChild(words[0]);
		}
	}

    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);
