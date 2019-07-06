import * as THREE from 'three';
import TweenLite, { Power2 } from '../gsap/TweenLite'
import PromisedLoad from '../promiseLoad';
import { easeOutCubic } from '../utils/easing.js';
// import * as Easing from '../utils/easing';

export default class {
    constructor(scene, ms) {
        this.scene = scene;
        this.mouse = ms;
        document.addEventListener('touchstart', this.OnTouchStart.bind(this), false);
        document.addEventListener('touchend', this.OnTouchEnd.bind(this), false);
        this._setup();
    }
    async _setup() {
        let object = await PromisedLoad.GetGLTF("/models/Silas_Fractured.gltf");
        this.obj = object.scene.children[0];
        this.outsideMat = new THREE.MeshStandardMaterial({ color: 0x33cc33, metalness: 0.3, roughness: 0.7 });
        this.insideMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        this.insideMat.emissive.set(new THREE.Color(0.3, 0.3, 0.3));

        // get it placed correctly in scene
        this.obj.scale.set(1, 1, 1);
        this.obj.rotateX(Math.PI / 12);
        this.obj.rotateZ(0.1);
        this.obj.position.set(0, 0, -75);


        // initialize starting values
        this.obj.traverse( (child) => {
            if (child instanceof THREE.Mesh) {
                child.basePosition = child.position.clone();
                child.pTarg = child.position.clone();
                child.pMath = child.parent.position.clone();

                child.pAngle = child.pMath.clone().normalize();
                if (child.material.name.includes("Inner")) {
                    child.material = this.insideMat;
                } else if (child.material.name.includes("Outer")) {
                    child.material = this.outsideMat;
                }
            }
        })

        this.scene.add(this.obj);
        this.keyLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1 );
        this.keyLight.position.set(-1, 1, 0.25);
        this.scene.add(this.keyLight);

        this.fillLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.3);
        this.fillLight.position.set(1, 0, 0.5);
        this.scene.add(this.fillLight);
    }

    OnTouchStart(e) {
        if (this.obj != null) {
            this.Explode();
        }
    }

    OnTouchEnd(e) {
        if (this.obj != null) {
            this.Unexplode();
        }
    }

    Explode() {
        this.obj.traverse( (child) => {
            if (child instanceof THREE.Mesh) {
                TweenLite.to(child.position, 1.5, {
                    x: child.basePosition.x + (child.pAngle.x * 50),
                    y: child.basePosition.y + (child.pAngle.y * 50), 
                    z: child.basePosition.z + (child.pAngle.z * 50),
                    ease: Power2.easeOut
                });
            }
        })
    }

    Unexplode() {
        this.obj.traverse( (child) => {
            if (child instanceof THREE.Mesh) {
                TweenLite.to(child.position, 0.5, {
                    x: child.basePosition.x,
                    y: child.basePosition.y,
                    z: child.basePosition.z,
                    ease: Power2.easeOut
                });
            }
        })
    }

    Update(color) {
        if (this.obj == null) return;
        this.insideMat.color.copy(color)
        
        if (this.mouse.isTouch) return;
        let threshold = 0.7;
        let mouseDistance = 1 - (Math.abs(this.mouse.normalizedX) + Math.abs(this.mouse.normalizedY));
        this.obj.traverse( (child) => {
            if (child instanceof THREE.Mesh) {
                // calculate new position based on mouse
                if ( mouseDistance >= threshold ) {
                    let normalized = (mouseDistance - threshold) * (3 + (1/3)); 
                    let eased = easeOutCubic( normalized );
                    child.pTarg.set(
                        child.basePosition.x + ( eased * child.pAngle.x * 50),
                        child.basePosition.y + ( eased * child.pAngle.y * 50),
                        child.basePosition.z + ( eased * child.pAngle.z * 50)
                    )
                } else {
                    child.pTarg.set(
                        child.basePosition.x,
                        child.basePosition.y,
                        child.basePosition.z
                    )
                }

                child.position.lerp(child.pTarg, 0.05);
            }
        })
    }

}