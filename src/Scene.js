export default class Scene {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this._time = 0

    this.mainCamera = null
    this.objects = []
    
    this.isPause = false
    this.width = width
    this.height = height
  }

  setMainCamera(cam) {
    this.mainCamera = cam
  }

  addObject(o) {
    this.objects.push(o);
    o.scene = this
  }

  start() {
    this.isPause = false;
    window.requestAnimationFrame(this._loop.bind(this));
  }

  _loop() {
    if (!this.isPause) {
      this._time++;
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.width, this.height);

      for(let i = 0, l = this.objects.length; i < l; i++) {
        if(this.objects[i].canDestroy) {
          delete this.objects[i]
          this.objects.splice(i, 1)
          i--;l--;
          continue;
        }
        this.objects[i] && this.objects[i]._update();
      }
      this.ctx.restore();
    }
    window.requestAnimationFrame(this._loop.bind(this));
  }

  pause() {
    this.isPause = true;
  }

}