import * as THREE from 'three';

export default class {
    constructor(scene, ms) {
        this.mouse = ms;
        this.scene = scene;
        this._setup();
    }
    _setup() {
        this.colorPalette = [
            new THREE.Color (0x339933),
            new THREE.Color (0x00b8ff),
            new THREE.Color (0xbd00ff),
            new THREE.Color (0xfdff45)
        ];
        this.currentColor = new THREE.Color( 0x339933 );
        this.nextColorIdx = 1;
        this.originalsX = [500];
        this.originalsY = [500];
        this.originalsZ = [500];
        this.mode = 0;

        // make sure canvas is always at correct aspect ratio
        window.addEventListener('resize', this.OnWindowResize.bind(this));

        // set up listeners for mouse interaction
        document.addEventListener('click', this.ChangeColor.bind(this));
        document.addEventListener('touchstart', this.ChangeColor.bind(this), false);

        this.geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: THREE.VertexColors
        });

        var x, y, z;
        for (var vertIdx = 0; vertIdx < 500; vertIdx++) {
            x = (Math.random() * 50) * Math.cos(vertIdx * 40);
            y = (Math.random() * 75) * Math.sin(vertIdx * 40);
            z = (Math.random() * 25) - 400;
        
            this.originalsX.push(x);
            this.originalsY.push(y);
            this.originalsZ.push(z);
            
            this.geometry.vertices.push(new THREE.Vector3(x, y, z));
            this.geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }

        var pointCloud = new THREE.Points(this.geometry, material);
        this.scene.add(pointCloud);

        this.iterator = 0;
        this.colorIterator = 0;
        this.colorSteps = 400;
        this.modeCounter = 0;
        this.modeReversing = false;
        this.OnWindowResize();
        this.Show();
    }

    Show() {
        this.active = true;
        this.ResetParticlePositions()
    }

    Hide() {
        this.active = false;
        for (var vertexIdx = 0; vertexIdx < this.geometry.vertices.length; vertexIdx++) {
            var particle = this.geometry.vertices[vertexIdx];
            particle.x = -100;
            particle.y = -100;
            particle.z = -100;
        }
        this.geometry.verticesNeedUpdate = true;
    }

    Update(){
        if (!this.active) return;
        this.iterator++;
        this.colorIterator++;
        if (this.colorIterator > this.colorSteps) {
            this.colorIterator = 0;
            this.currentColor = this.colorPalette[this.nextColorIdx];
            this.nextColorIdx = (this.nextColorIdx + 1) % this.colorPalette.length;
        }

        if (this.modeReversing) {
            this.modeCounter--;
            if (this.modeCounter < -2000) {
                this.modeReversing = false;
            }
        } else {
            this.modeCounter++;
            if (this.modeCounter > 2000) {
                this.modeReversing = true;
            }
        }

        var startColor = this.currentColor.clone();
        var newColor = startColor.lerp(this.colorPalette[this.nextColorIdx], (this.colorIterator) / this.colorSteps);
        for (var vertexIdx = 0; vertexIdx < this.geometry.vertices.length; vertexIdx++) {
            var particle = this.geometry.vertices[vertexIdx];
            var originalX = this.originalsX[vertexIdx];
            var originalY = this.originalsY[vertexIdx];
            var originalZ = this.originalsZ[vertexIdx];
            var dX, dY, dZ;
            var direction = vertexIdx % 2 == 0 ? 1 : -1;

            switch (this.mode) {
                case 0:
                    dX = (Math.cos((this.iterator + vertexIdx) / 30) * 10 * direction) +
                        (Math.sin((this.iterator - vertexIdx) / 40) * 2.5);
                    dY = Math.sin((this.iterator - vertexIdx) / 40) * 2.5 * direction +
                        (Math.cos((this.iterator + vertexIdx) / 40) * 2.5);
                    dZ = 0;
                    particle.add(new THREE.Vector3(dX, dY, dZ));
                    break;

                case 1:
                    var distanceX = Math.abs( ((25 * (this.mouse.x / this.width)) - (25 / 2)));
                    var distanceY = Math.abs( ((25 * (this.mouse.y / this.height)) - (25 / 2)));
                    
                    dX = originalX * ( ( ( Math.sin((this.iterator - vertexIdx) / 20 ) ) + distanceX ) + 0) * direction;
                    dY = originalY * ( ( ( ( Math.sin((this.iterator - vertexIdx) / 20 ) ) + distanceY ) + 0) * direction);
                    dZ = ( originalZ * ( ( Math.sin( (this.iterator - vertexIdx) / 20) ) + ((distanceX + distanceY) / 25) ) - 400);
                    particle.x = dX;
                    particle.y = dY;
                    particle.z = dZ;
                    break;
                case 2:
                    var distanceX = Math.sin( (this.modeCounter ) / 3000 ) * 20 ;
                    var distanceY = Math.sin( (this.modeCounter ) / 3000 ) * 20 ;
                    dX = originalX * ( ( Math.sin( (this.modeCounter - vertexIdx) / 100 ) * distanceX ) + 0);// * direction;
                    dY = originalY * ( ( Math.sin( (this.modeCounter - vertexIdx) / 100 ) * distanceY ) + 0);// * direction;
                    dZ = ( originalZ * ( ( Math.sin( (this.modeCounter - vertexIdx) / 100) * 0.5 )) ) - 400; //+ ((distanceX + distanceY) / 25) ) - 400);
                    particle.x = dX;
                    particle.y = dY;
                    particle.z = dZ;
                    break;
                case 3:
                    particle.x = originalX;
                    particle.y = originalY;
                    particle.z = originalZ;
                    break;
            }

            this.geometry.colors[vertexIdx] = newColor;
        }
        this.geometry.verticesNeedUpdate = true;
        this.geometry.colorsNeedUpdate = true;
    }

    ResetParticlePositions() {
        for (var vertexIdx = 0; vertexIdx < this.geometry.vertices.length; vertexIdx++) {
            var particle = this.geometry.vertices[vertexIdx];
            particle.x = this.originalsX[vertexIdx];
            particle.y = this.originalsY[vertexIdx];
            particle.z = this.originalsZ[vertexIdx];
        }
    }

    ChangeColor() {
        this.colorIterator = 0;
        this.currentColor = this.colorPalette[this.nextColorIdx];
        this.nextColorIdx = (this.nextColorIdx + 1) % this.colorPalette.length;
    }

    ChangeMode(modeIndex, max = 3) {
        this.mode = modeIndex;
        this.modeCounter = 0;
        this.ResetParticlePositions();
    }

    OnWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

}