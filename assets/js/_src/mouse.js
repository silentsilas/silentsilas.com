export default class {
    constructor() {
        this.x = 0; //(window.innerWidth / 2) + 20;
        this.y = 0; //(window.innerHeight / 2) + 10;
        this.Normalize(this.x, this.y);
        document.addEventListener('mousemove', this.OnMouseMove.bind(this));    
        document.addEventListener('touchstart', this.OnTouchMove.bind(this), false);
        document.addEventListener('touchmove', this.OnTouchMove.bind(this), false);
    }

    Normalize(x, y) {
        this.normalizedX = (x / window.innerWidth) - 0.5;
        this.normalizedY = (y / window.innerHeight) - 0.5;
    }

    OnMouseMove(e) {
        this.x = e.clientX;
        this.y = e.clientY;
        this.Normalize(this.x, this.y);
    }
    
    OnTouchMove(event) {
        this.x = event.touches[0].clientX;
        this.y = event.touches[0].clientY;
        this.Normalize(this.x, this.y);
    }
}