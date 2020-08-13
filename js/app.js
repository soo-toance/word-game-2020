(function(){
    function App(){
        this.word = new app.Word();
        this.model = new app.Model(this.word);
        this.view = new app.View();
        this.controller = new app.Controller(this.model, this.view);
    }

    let game = new App();
})();
