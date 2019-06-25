import * as THREE from 'three';
import PromisedLoad from '../promiseLoad';

export default class {
    constructor(scene, ms) {
        this.scene = scene;
        this.mouse = ms;
        console.log("setting up");
        this._setup();
    }
    async _setup() {
        let object = await PromisedLoad.GetGLTF("/models/Silas_Fractured.gltf");
        this.obj = object.scene.children[0];
        this.dynamicMaterial = new THREE.MeshPhongMaterial({color: 0x66cc66});

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
                console.log(child.pAngle);
                child.material = this.dynamicMaterial;
            }
        })

        this.scene.add(this.obj);
        this.keyLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1 );
        this.keyLight.position.set(-2.5, 2.5, 1);
        this.scene.add(this.keyLight);

        this.fillLight = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.3);
        this.fillLight.position.set(2.5, 0, 1);
        this.scene.add(this.fillLight);
    }

    Update() {
        if (this.obj == null) return;
        let mouseDistance = Math.abs(this.mouse.normalizedX) + Math.abs(this.mouse.normalizedY);
        this.obj.traverse( (child) => {
            if (child instanceof THREE.Mesh) {
                // calculate new position based on mouse
                if ( mouseDistance >= 0.2 ) {
                    child.pTarg.set(
                        child.basePosition.x + (mouseDistance * child.pAngle.x * 100),
                        child.basePosition.y + (mouseDistance * child.pAngle.y * 100),
                        child.basePosition.z + (mouseDistance * child.pAngle.z * 100)
                    )
                } else {
                    child.pTarg.set(
                        child.basePosition.x,
                        child.basePosition.y,
                        child.basePosition.z
                    )
                }

                child.position.lerp(child.pTarg, 0.05);
                // console.log(child.position);
            }
        })
    }

}