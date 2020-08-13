(function(exports) {
	function Word() {
		let timerOffset; // timer offset
		let downOffset;  // down offset 

		Word.prototype.pool = ["기린","원숭이","토끼","강아지","사슴","꽃사슴","거북이","자라","고양이","개","게","거위","고래",
			"족제비","종다리","쥐","지네","구관조","구렁이","지렁이","붕어","금붕어","비글",
			"이구아나","이집트코브라","범고래","벼룩","자메이카딱다구리","검은고양이","범도룡뇽",
			"사과","포도","검정색","카레","치킨","피자","크라임씬","삼겹살","바나나","키위",
			"됴됴됴","비빔국수","김치전","우리집","책","도서관","공룡","박물관","텀블러","마우스",
			"컴퓨터","스튜디오","데이터베이스","도넛","설탕","소금","김치","감자","고구마","토마토"];

		Word.prototype.initialize = function() {
			this.timerOffset = 1000;
			this.downOffset = 20; 
		}	
	}

    exports.app = exports.app || {};
    exports.app.Word = Word;
})(this);
