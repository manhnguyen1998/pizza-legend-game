class DirectionInput {
  constructor() {
    this.heldDirection = [];
    this.map = {
      "ArrowUp": "up",
      "ArrowDown": "down",
      "ArrowRight": "right",
      "ArrowLeft": "left"
    }
  }


  get direction() {
    return this.heldDirection[0];
  }
  init() {
    document.addEventListener("keydown", e => {
      const dir = this.map[e.code];
      if (dir && this.heldDirection.indexOf(dir) === -1 ) {
        this.heldDirection.unshift(dir);
        // console.log(this.heldDirection)
      }
    });

    document.addEventListener("keyup", e => {
      const dir = this.map[e.code];
      const index = this.heldDirection.indexOf(dir);
      if (index > -1) {
        this.heldDirection.splice(index, 1);
        // console.log(this.heldDirection)
      }
    })
  }
}