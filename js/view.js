(function(exports){
	var View = function(model, controller) {
		let self = this; 

		self.limitHeight = 530; // 제한 높이 : 해당 높이 넘어가면 fail 증가  
		self.limitSuccessOrFail = 10; 	 // 제한 개수 : 해당 개수 넘어가면 게임 success or fail 처리 

		self.eventList = { };
		self.timer = { };
	}

	View.prototype.initialize = function(dom, listener) {
		// Game Start 
		if (dom === "start") { 
			document.getElementById(dom).addEventListener("click", function() {
			 		listener();
			 });
		}
		// Hit Answer 
		else if (dom === "answer") { 
		 	document.getElementById("answer").addEventListener("keyup", function(event) {
				if (event.key === "Enter") {
					listener();
				}
			});
		}
	}

	// Model Bind 
	View.prototype.bind = function(event, handler) {
		let self = this;

		self.eventList[event] = handler;
	}

	// View Render 
	View.prototype.render = function(event, parameter) {
        let self = this;
        let renderList = {
            start : function() {
            	self.start();
                self.pushWord(parameter);
            },
            hitAnswer : function() {
            	self.hitAnswer(parameter)
            }
        };
        renderList[event]();
    };

    // Start 
    View.prototype.start = function() {
    	document.getElementById("start").setAttribute("disabled","");
    }

    // End 
    View.prototype.end = function() {
    	document.getElementById("answer").setAttribute("disabled","");
    }

    // Push Word 
	View.prototype.pushWord = function(parameter) {
		let self = this;
		let word = parameter.word;

        self.timer = setInterval(function(){
		  	self.wordTimer(self.eventList["removeWord"](), word.downOffset);
		}, word.timerOffset);
    };

    // Hit Answer 
    View.prototype.hitAnswer = function(parameter) {
    	let self = this;
    	let answer = document.getElementById("answer").value;
		let words = document.getElementsByClassName("word");
		let quiz = document.getElementById("quiz");

		let isSuccess = false;
		if (answer !== "") {
			Array.from(words).forEach(function(word) {
	 			if (answer === word.innerHTML) {
	 				self._complete(word, "success");
	 				isSuccess = true; 
				}
			});
		}
		
		if (isSuccess !== true) 
			self._complete(undefined, "fail");


		document.getElementById("answer").value = "";
    }

    // Word Timer 
 	View.prototype.wordTimer = function(text, downOffset) {		
 		let self = this;
 		let quiz = document.getElementById("quiz");
 		let words = document.getElementsByClassName("word");

 		let quizWidth = window.innerWidth * 0.7;

 		let newWord = document.createElement("a");
 		let top = 0;
 		let left = Math.random() * (quizWidth - 120);
 		
 		newWord.setAttribute("class", "word");
 		newWord.style.left = left + "px";
 		newWord.style.top = top + "px";
 		newWord.innerHTML = text;

 		document.getElementById("quiz").appendChild(newWord);

		Array.from(words).forEach(function(word){
		    let tmp = word.style.top.split("px")[0];
 			tmp = parseInt(tmp) + downOffset;

 			if (tmp > self.limitHeight) 
			{
				self._complete(word, "fail");
 				self.eventList["addWord"](word.innerHTML);
			}
 			else 
 				word.style.top = tmp + "px";

		});
 	}

 	View.prototype._complete = function(word, result) {
 		let self = this;

 		if (word !== undefined)
 		{
			quiz.removeChild(word);
			self.eventList["addWord"](word.innerHTML);
		}

		let score = parseInt(document.getElementById(result).innerHTML) + 1 ;
		document.getElementById(result).innerHTML = score;
		if (score >= self.limitSuccessOrFail)
		{
			let words = document.getElementsByClassName("word");
			clearInterval(self.timer);

			Array.from(words).forEach(function(word) {
	 			quiz.removeChild(word);
			});
			self.end();
		}
 	}

    exports.app = exports.app || {};
    exports.app.View = View;
})(this);
