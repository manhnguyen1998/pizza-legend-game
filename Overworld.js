class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }
 
 startGameLoop() {
   const step = () => {

    // clear off the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Establish the camera
    const cameraPerson = this.map.gameObjects.hero;

    //Update all object
    Object.values(this.map.gameObjects).forEach(object => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map,
      });
    });

    this.map.drawLowerImage(this.ctx, cameraPerson);


    //draw game object
    Object.values(this.map.gameObjects).sort((a, b) => {
      return a.y - b.y;
    }).forEach(object => {
      object.sprite.draw(this.ctx, cameraPerson);
    })


    this.map.drawUpperImage(this.ctx, cameraPerson);

     requestAnimationFrame( () => {
       step();
     })
    }
    step();
 }

 bindActionInput() {
   new KeyPressListener("Enter", () => {
     this.map.checkForActionCutscene();
   })
 }

 bindHeroPositionCheck() {
   document.addEventListener("PersonWalkingComplete", e => {
     if (e.detail.whoId === "hero") {
       console.log("new hero pos")
       this.map.checkForFootstepCutscene();
     }
   })
 }

 startMap(mapConfig) {
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.mountObjects();
 }

 init() {
   this.startMap(window.OverworldMaps.DemoRoom);

   this.bindActionInput();
   this.bindHeroPositionCheck();

   this.directionInput = new DirectionInput();
   this.directionInput.init();
  //  this.directionInput.direction; //down
   this.startGameLoop();
  //  this.map.startCutscene([
  //    { who: "hero", type: "walk", direction: "down"},
  //    { who: "hero", type: "walk", direction: "down"},
  //   //  { who: "npc1", type: "walk", direction: "down"},
  //    { who: "npc1", type: "stand", direction: "left", time: 800},
  //    { type: "textMessage", text: "Hello" }
  //  ])

 }

}
