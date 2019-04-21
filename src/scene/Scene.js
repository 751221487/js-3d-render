import Renderer from '../renderer/Renderer'
export default class Scene {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this._time = 0

    this.mainCamera = null
    this.objects = []
    this.lights = []
    
    this.isPause = false
    this.width = width
    this.height = height
    this.renderer = new Renderer(this.ctx, width, height)
    this.renderer.scene = this
  }

  setMainCamera(cam) {
    this.mainCamera = cam
    cam.setScene(this)
  }

  addObject(o) {
    this.objects.push(o);
    o.scene = this
  }

  addLight(l) {
    this.lights.push(l)
    this.renderer.addLight(l)
    l.scene = this
  }

  start() {
    this.isPause = false;
    this._loop()
  }

  _loop() {
    this._time++;
    
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.beginPath()
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.mainCamera._update()
    this.renderer.resetTriangle()

    for(let i = 0, l = this.objects.length; i < l; i++) {
      if(this.objects[i].canDestroy) {
        delete this.objects[i]
        this.objects.splice(i, 1)
        i--;l--;
        continue
      }
      this.objects[i] && this.objects[i]._update();
    }
    this.renderer.render()
    window.requestAnimationFrame(this._loop.bind(this));
  }

}