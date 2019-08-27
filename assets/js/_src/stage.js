import * as THREE from 'three';
import Particle from './scenes/particles';
import Particler from './Particler';
import Head from './scenes/head';

var Qtarg, Qnow;
var eyeCone;

var width = window.innerWidth;
var height = window.innerHeight;
var middle = {
    x: width / 2,
    y: height / 2
}
var scene, camera, renderer;
var lookat = {
    x: 20,
    y: 20,
    z: 100
}
var clock;
var particles;
var particler;
var head;
var ms;
var modeElement;
var currentMode = 0;
var totalModes = 3;

export function Initialize(element, mouse){
    ms = mouse;
    clock = new THREE.Clock();
    modeElement = document.querySelector(".particles_mode");
    // make sure canvas is always at correct aspect ratio
    window.addEventListener('resize', OnWindowResize);
    document.querySelector(".particles_left").addEventListener('click', LeftControl);
    document.querySelector(".particles_right").addEventListener('click', RightControl);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    renderer = new THREE.WebGLRenderer({ canvas: element });

    // create cone that we'll use to help us
    // interpolate camera movement
    var e_geometry = new THREE.CylinderGeometry(3, 10, 100, 40, 10, false);
    //... Following mod is as rec by WestLangley's answer at:-
    //... http://stackoverflow.com/questions/13757483/three-js-lookat-seems-to-be-flipped
    //... LookAt points the object's Z-axis at the target object.
    e_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
    var e_material = new THREE.MeshLambertMaterial({color: 0x00aaff });
    eyeCone = new THREE.Mesh(e_geometry, e_material);
    eyeCone.position.set (0, 0, 100);
    eyeCone.lookAt(new THREE.Vector3( 0, 0, 300));
    scene.add( eyeCone ); 

    OnWindowResize();

    particles = new Particle(scene, ms);
    particler = new Particler('/imgs/textures/astronaut.png', ms, true, camera);
    scene.add(particler);
    particler.visible = false;
    particler.position.set(0, 0, -75);
    head = new Head(scene, ms);

    Update();
} 

function OnWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    middle = {
        x: width / 2,
        y: height / 2
    }
    UpdateRendererSize();
}

function UpdateRendererSize() {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

function UpdateLookat() {
    var newX = ( (lookat.x * (ms.x / width) ) - (lookat.x/2) ) * -1;
    var newY = ( (lookat.y * (ms.y / height) ) - (lookat.y/2) ) - 0;
    var newZ = (
        (
            ( lookat.z * Math.sin(Math.PI * (ms.x / width)) )
        ) + 200
    );

    Qnow = new THREE.Quaternion().copy( camera.quaternion );

    eyeCone.lookAt( new THREE.Vector3(
        newX, 
        newY, 
        newZ
    ) );
    Qtarg = new THREE.Quaternion().copy( eyeCone.quaternion );
    
    THREE.Quaternion.slerp( Qnow, Qtarg, camera.quaternion, 0.025 );
}

function RightControl() {
    currentMode = (currentMode + 1) % totalModes;
    ChangeMode();
}

function LeftControl() {
    currentMode = ((currentMode - 1) + totalModes) % totalModes;
    ChangeMode();
}

function ChangeMode() {
    if (currentMode <= 1) {
        head.obj.visible = true;
        particler.Hide();
        particles.Show();
        particles.ChangeMode(currentMode);
    } else {
        head.obj.visible = false;
        particles.Hide();
        particler.Show();
    }
    modeElement.innerHTML = `${(currentMode + 1)}/${totalModes}`;
}

function Update() {
    const delta = clock.getDelta()
    const time = clock.getElapsedTime()
    
    window.requestAnimationFrame(Update);
    UpdateLookat();
    particles.Update();
    if (particler) {
        if (particler._mesh) {
            particler._mesh.material.uniforms.uTime.value = time;
            particler._mesh.material.uniforms.u_mouse.value = {x: ms.x , y: height - ms.y };
        }
    }
    head.Update(particles.geometry.colors[0]);
    renderer.render(scene, camera);
}