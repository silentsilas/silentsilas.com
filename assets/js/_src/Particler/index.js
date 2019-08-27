import * as THREE from 'three';
import TweenLite, { Power2 } from '../gsap/TweenLite'
import TimelineLite from '../gsap/TimelineLite'
import { shuffle } from '../utils/shuffle.js'


export default class Particler extends THREE.Object3D {

  // Setup ---------------------------------------------------------------------

  constructor(textureUrl, ms, discard, camera, cbs) {
    super()
    this.camera = camera;
    this.mouse = ms;
    this.startingMagnitude = 2.0;
    this.startingDistortion = 0.0;
    this.isExploding = false;
    this.explosionCallbacks = cbs || [];
    this.explosionTimeout;
    this.urlIdx = 0;
    this.urls = shuffle([
      {
        url: '/imgs/textures/astronaut.png',
        dropLight: false,
        skipAmount: 2,
        threshold: 50,
        attribution: 'https://valenberg.tumblr.com/post/115809531644/zero-by-valenberg-deviantart-facebook'
      },
      {
        url: '/imgs/textures/valenburg_cityscape.gif',
        dropLight: false,
        skipAmount: 2,
        threshold: 50,
        attribution: 'https://www.deviantart.com/valenberg/art/Rolly-Rocket-601618597'
      },
      {
        url: '/imgs/textures/blades.jfif',
        dropLight: true,
        skipAmount: 1,
        threshold: 200
      },
      {
        url: '/imgs/textures/dark_cyberpunk.png',
        dropLight: false,
        skipAmount: 3,
        threshold: 10
      },
      {
        url: '/imgs/textures/cyberpunk_bartender.png',
        dropLight: false,
        skipAmount: 4,
        threshold: 20
      },
      {
        url: '/imgs/textures/cyberpunk_car.png',
        dropLight: false,
        skipAmount: 3,
        threshold: 50,
        attribution: 'https://whvn.cc/39qg9y'
      },
      {
        url: '/imgs/textures/cyberpunk_neon.jpg',
        dropLight: false,
        skipAmount: 6,
        threshold: 50,
        attribution: 'https://whvn.cc/489m9j'
      },
      {
        url: '/imgs/textures/cyberpunk_samurai.jpg',
        dropLight: false,
        skipAmount: 6,
        threshold: 50,
        attribution: 'https://whvn.cc/zmm6og'
      },
      {
        url: '/imgs/textures/ocean_house.png',
        dropLight: true,
        skipAmount: 6,
        threshold: 300,
        attribution: 'https://whvn.cc/6kjwgl'
      },
      {
        url: '/imgs/textures/kanagawa_wave.jpg',
        dropLight: false,
        skipAmount: 8,
        threshold: 50,
        attribution: 'https://whvn.cc/48xwxy'
      },
      {
        url: '/imgs/textures/valenburg_dreams.gif',
        dropLight: false,
        skipAmount: 3,
        threshold: 50
      },
      {
        url: '/imgs/textures/samus.jpg',
        dropLight: false,
        skipAmount: 5,
        threshold: 50,
        attribution: 'https://whvn.cc/4ly532'
      },
      {
        url: '/imgs/textures/valenburg_skeleton.gif',
        dropLight: false,
        skipAmount: 3,
        threshold: 50,
        attribution: 'https://valenberg.tumblr.com/post/160530586329/connect'
      },
      {
        url: '/imgs/textures/valenburg_soupz.png',
        dropLight: false,
        skipAmount: 3,
        threshold: 50
      },
      {
        url: '/imgs/textures/circle_of_the_moon.jpg',
        dropLight: false,
        skipAmount: 2,
        threshold: 50
      },
      {
        url: '/imgs/textures/super_metroid.jpg',
        dropLight: false,
        skipAmount: 2,
        threshold: 1
      },
      {
        url: '/imgs/textures/kirby_superstar.jpg',
        dropLight: false,
        skipAmount: 1,
        threshold: 50
      },
      {
        url: '/imgs/textures/nba_jam.jpg',
        dropLight: false,
        skipAmount: 2,
        threshold: 50
      },
      {
        url: '/imgs/textures/gradius_iii.jpg',
        dropLight: false,
        skipAmount: 1,
        threshold: 20
      },
      {
        url: '/imgs/textures/wotakoi.jfif',
        dropLight: false,
        skipAmount: 4,
        threshold: 40
      },
      {
        url: '/imgs/textures/shield_hero.jfif',
        dropLight: false,
        skipAmount: 4,
        threshold: 20
      },
      {
        url: '/imgs/textures/reincarnated_slime.jfif',
        dropLight: false,
        skipAmount: 5,
        threshold: 50
      }
    ]);
    this.initialize(this.urls[this.urlIdx].url, discard);
  }

  async initialize(url, discard, dropLight = false, skipAmount = 2, threshold = 50, cb) {
    let texture;
    try {
      texture = await this.loadTexture(url);
    } catch(err) {
      console.log(err);
    }
    if (texture == null) {
      console.log("issue loading texture");
      return;
    }
// this._width = window.innerWidth
    // this._height = window.innerHeight
    this._texture = texture;
    this._texture.minFilter = THREE.LinearFilter;
    this._texture.magFilter = THREE.LinearFilter;
    this._texture.format = THREE.RGBFormat;
    this._textureWidth = texture.image.width;
    this._textureHeight = texture.image.height;
    this._width = texture.image.width;
    this._height = texture.image.height;
    this._skipAmount = skipAmount;
    this._dropLight = dropLight;
    this._threshold = threshold;
    this._explosionAmount = 1000;
    // this.position.set(0, 0, -10);
    // this.position.set(-1, -2, -10)
    // this.rotation.set(0.63, -0.69, 0.42)
    // this.rotation.set(0, 2.4, 0)
    // this.rotation.set(3.14, 0, 0);
    this._setupGeometry(discard);
    this._setupMaterial();
    this._setupMesh();
    this.Resize();
    TweenLite.fromTo(this._mesh.material.uniforms.uRandom, 1, {value: this._explosionAmount}, { value: 0.0 });
    if (cb != null) {
      if (this.explosionTimeout) {
        clearTimeout(this.explosionTimeout);
      }
      this.isExploding = false;
      this.explosionTimeout = setTimeout(cb.bind(this), 10000);
    }
  }

  loadTexture(url) {
    return new Promise( ( resolve, reject ) => {
      new THREE.TextureLoader().load(
        url,
        ( texture ) => {
          resolve( texture );
        },
        undefined,
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  _setupGeometry(discard) {
    this.numPoints = this._width * this._height;

    let numVisible = this.numPoints;
    let threshold = 0;
    let originalColors;

    if (discard) {
      // discard pixels darker than threshold #22
      numVisible = 0;
      threshold = this._threshold;

      this._texture.image.crossOrigin = "Anonymous";
      const img = this._texture.image;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d'); 

      canvas.width = this._width;
      canvas.height = this._height;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, this._width, this._height * -1);
      // ctx.crossOrigin = "Anonymous";
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalColors = Float32Array.from(imgData.data);

      for (let i = 0; i < this.numPoints; i += this._skipAmount) {
        if (this._dropLight) {
          if (originalColors[i * 4 + 0] <= threshold) numVisible++;
        } else {
          if (originalColors[i * 4 + 0] >= threshold) numVisible++;
        }
      }

      console.log('numVisible', numVisible, this.numPoints);
    } 

    this._geometry = new THREE.InstancedBufferGeometry();

    // positions
    this._positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    this._positions.setXYZ(0, -0.5, 0.5, 0.0);
    this._positions.setXYZ(1, 0.5, 0.5, 0.0);
    this._positions.setXYZ(2, -0.5, -0.5, 0.0);
    this._positions.setXYZ(3, 0.5, -0.5, 0.0);
    this._geometry.addAttribute('position', this._positions);

    // uvs
    this._uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    this._uvs.setXYZ(0, 0.0, 0.0);
    this._uvs.setXYZ(1, 1.0, 0.0);
    this._uvs.setXYZ(2, 0.0, 1.0);
    this._uvs.setXYZ(3, 1.0, 1.0);
    this._geometry.addAttribute('uv', this._uvs);

    // index
    this._geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < this.numPoints; i += this._skipAmount) {
      if (this._dropLight) {
        if (discard && originalColors[i * 4 + 0] > threshold) continue;
      } else {
        if (discard && originalColors[i * 4 + 0] < threshold) continue;
      }
      let currentY = Math.floor(i / this._width);
      if (this._skipAmount > 1) {
        if (currentY % (this._skipAmount - 1) != 0) continue;
      }

      offsets[j * 3 + 0] = i % this._width;
      offsets[j * 3 + 1] = Math.floor(i / this._width);

      indices[j] = i;

      angles[j] = Math.random() * Math.PI;

      j++;
    }

    this._geometry.addAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
    this._geometry.addAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
    this._geometry.addAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));
    console.log(this._geometry);
  }

  _setupMaterial() {
    this.startingRandom = 0.0;
    const uniforms = {
      uTime: { value: 0.0 },
      uRandom: { value: this.startingRandom },
      uDistortion: { value: this.startingDistortion},
      uDepth: { value: 0.0 },
      uSize: { value: 1.0 },
      uSizeMin: { value: 0.1 },
      uSizeMax: { value: 1.0 },
      uTextureSize: { value: new THREE.Vector2(this._width, this._height) },
      uTexture: { value: this._texture },
      uStartTint: { value : new THREE.Color(0x33cc33) },
      uGoalTint: { value: new THREE.Color(0x33ee33) },
      uTouch: { value: null },
      uMagnitude: { value: this.startingMagnitude },
      uRadius: { value: 1.0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() }

    };

    uniforms.u_resolution.value.x = window.innerWidth
    uniforms.u_resolution.value.y = window.innerHeight

    console.log(uniforms);

    this._material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: this.vertexShader(),
      fragmentShader: this.fragmentShader(),
      depthTest: true,
      transparent: false
    });
  }

  _setupMesh() {
    if (this._mesh != null) {
      this.remove(this._mesh);
    }
    this._mesh = new THREE.Mesh(this._geometry, this._material)
    // this._mesh.visible = false
    this.add(this._mesh)
    // this.scale.set(this._width, this._height, 1)
  }

  _addEvents() {
    document.addEventListener('mousedown', this.OnMouseDown.bind(this));
    document.addEventListener('mouseup', this.OnMouseUp.bind(this));  
    document.addEventListener('touchstart', this.OnTouchStart.bind(this), false);
    document.addEventListener('touchend', this.OnTouchEnd.bind(this));
    document.addEventListener('keydown', this.SkipHead.bind(this));
  }
  
  _removeEvents() {
    if (this.explosionTimeout) {
      clearTimeout(this.explosionTimeout);
    }
    document.removeEventListener('mousedown', this.OnMouseDown);
    document.removeEventListener('mouseup', this.OnMouseUp);  
    document.removeEventListener('touchstart', this.OnTouchStart);
    document.removeEventListener('touchend', this.OnTouchEnd);
    document.removeEventListener('keydown', this.SkipHead);
  }

  // Events --------
  handleExplosion() {
    if (this._mesh == null || this._mesh == undefined) {
      console.log('aw we cant explode')
      return;
    } else {
      this.isExploding = true;
      TweenLite.to(
        this._mesh.material.uniforms.uRandom, 0.5, { 
          value: this._explosionAmount, 
          ease: 'Power2.easeInOut',
          onComplete: this.handleExploded.bind(this)
        }
      )
    }
  }

  handleExploded() {
    this.urlIdx = (this.urlIdx + 1) % this.urls.length;
    let currentImage = this.urls[this.urlIdx];
    this.initialize(currentImage.url, true, currentImage.dropLight, currentImage.skipAmount, currentImage.threshold, this.handleExplosion);
  }

  Distort() {
    if (this.isExploding) return;

    TweenLite.to(
      this._mesh.material.uniforms.uMagnitude, 0.5, { 
        value: 4.0,
        ease: 'Power2.easeOut'
      }
    );
    TweenLite.to(
      this._mesh.material.uniforms.uDistortion, 0.5, { 
        value: 200.0, 
        ease: 'Power2.easeOut'
      }
    );
  }

  Undistort() {
    if (this.isExploding) return;

    TweenLite.to(
      this._mesh.material.uniforms.uMagnitude, 0.3, { 
        value: this.startingMagnitude, 
        ease: 'Power2.easeOut'
      }
    );
    TweenLite.to(
      this._mesh.material.uniforms.uDistortion, 0.3, { 
        value: this.startingDistortion, 
        ease: 'Power2.easeOut'
      }
    );
  }

  SkipHead(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 32) {
      if (this.explosionTimeout) {
        clearTimeout(this.explosionTimeout);
      }
      this.handleExplosion();
    }
  }

  OnMouseDown(e) {
    this.Distort();
  }

  OnMouseUp(e) {
    this.Undistort();
  }

  OnTouchStart(e) {
    this.Distort();
  }

  OnTouchEnd(e) {
    this.Undistort();
  }

  onInteractiveMove(e) {
    this._mesh.material.uniforms.u_mouse.value = {x: e.clientX, y: this._height - e.clientY};
  }

  Hide() {
    this.visible = false;
    this._removeEvents();
  }

  Show(time = 1.0) {
    this.visible = true;
    this._addEvents();
    this.explosionTimeout = setTimeout(this.handleExplosion.bind(this), 7000);
  }

  Resize() {
    this.fovHeight = 2 * Math.tan((this.camera.fov * Math.PI) / 180 / 2) * this.camera.position.z;
    const scale = (this.fovHeight / this._height) * 2.0;
    this._mesh.scale.set(scale, scale, 1);
  }

  fragmentShader() {
    return `
    precision highp float;

    uniform sampler2D uTexture;
    uniform vec3 uStartTint;
    uniform vec3 uGoalTint;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 vPUv;
    varying vec2 vUv;
    varying float vDist;
    varying vec3 vDisplacement;
    varying vec2 normalizedMouse;
    varying float grey;
    
    void main() {
      vec4 color = vec4(0.0);
      vec2 puv = vPUv;
      vec2 uv = vUv;
    
      // pixel color
      vec4 colA = texture2D(uTexture, puv);
      vec3 start = colA.xyz;
    
      // same color
      // vec4 colB = colA;
    
      // tint color
      // vec4 colB = vec4(colA.r * uTint.r, colA.g * uTint.g, colA.b * uTint.b, colA.a);
    
      // inverse color
      // vec4 colB = vec4(1.0 - colA.r, 1.0 - colA.g, 1.0 - colA.b, colA.a);
    
      // greyscale
      float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
      vec3 greyColor = vec3(grey, grey, grey);
      // float grey = offset.x;
    
      // float vDist;
    
      // dir = (u_mouse / u_resolution) - puv;
      // vDist = distance( (u_mouse / u_resolution) , puv);
    
      // vec3 goal = mix(uGoalTint, uStartTint, max(min(vDist * 5.0, 1.0), 0.0) );
      vec3 goal = mix(start, greyColor, max(min(vDist + 0.5, 1.0), 0.0));
      // float green = smoothstep(uStartTint.g, uGoalTint.g, vDisplacement.z);
      // float blue = smoothstep(uStartTint.b, uGoalTint.b, vDisplacement.z);
      vec4 colB = vec4(goal, 0.5);
    
      // circle
      // float border = 0.3;
      // float radius = 0.5;
      // float dist = radius - distance(uv, vec2(0.5));
      // float t = smoothstep(0.0, border, dist);
    
      // final color
      color = colB;
      // color = vec4(vec2(u_mouse / u_resolution).x, 0.0, vec2(u_mouse / u_resolution).y, 1.0);
      // color.a = t;
    
      gl_FragColor = color;
    }
    `;
  }

  vertexShader() {
    return `
    precision highp float;

    attribute float pindex;
    attribute vec3 position;
    attribute vec3 offset;
    attribute vec2 uv;
    attribute float angle;
    
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    
    uniform float uTime;
    uniform float uRandom;
    uniform float uDistortion;
    uniform float uDepth;
    uniform float uSize;
    uniform float uSizeMin;
    uniform float uSizeMax;
    uniform vec2 uTextureSize;
    uniform sampler2D uTexture;
    uniform sampler2D uTouch;
    uniform float uMagnitude;
    uniform float uRadius;
    
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    varying vec2 vPUv;
    varying vec2 vUv;
    varying float vDist;
    varying vec3 vDisplacement;
    varying vec2 normalizedMouse;
    varying float grey;
    
    //
    // Description : Array and textureless GLSL 2D simplex noise function.
    //      Author : Ian McEwan, Ashima Arts.
    //  Maintainer : ijm
    //     Lastmod : 20110822 (ijm)
    //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
    //               Distributed under the MIT License. See LICENSE file.
    //               https://github.com/ashima/webgl-noise
    //
    
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec2 mod289(vec2 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec3 permute(vec3 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    float snoise(vec2 v)
      {
      const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                          0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                         -0.577350269189626,  // -1.0 + 2.0 * C.x
                          0.024390243902439); // 1.0 / 41.0
    // First corner
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
    
    // Other corners
      vec2 i1;
      //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
      //i1.y = 1.0 - i1.x;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      // x0 = x0 - 0.0 + 0.0 * C.xx ;
      // x1 = x0 - i1 + 1.0 * C.xx ;
      // x2 = x0 - 1.0 + 2.0 * C.xx ;
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
    
    // Permutations
      i = mod289(i); // Avoid truncation effects in permutation
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
    
    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
    
    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    
    // Compute final noise value at P
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }
    
    float random(float n) {
      return fract(sin(n) * 43758.5453123);
    }
    
    float map(float value, float minA, float maxA, float minB, float maxB) {
      return (value - minA) / (maxA - minA) * (maxB - minB) + minB;
    }
    
    void main() {
      vUv = uv;
    
      // particle uv
      vec2 puv = offset.xy / uTextureSize;
      vPUv = puv;
    
      // pixel color
      vec4 colA = texture2D(uTexture, puv);
    
      // displacement
      vec3 displaced = offset;
    
      // // randomise
      displaced.xy += vec2( (random(pindex) - 0.5), (random(offset.x + pindex) - 0.5) ) * (uRandom * angle);
      float rndz = (random(pindex) + snoise(vec2(pindex * 0.1, uTime * 0.1)));
      displaced.z += rndz * (random(pindex) * uDepth);
      displaced.x += cos(uTime) * rndz;
      displaced.y += sin(uTime) * rndz;
      // center
      displaced.xy -= uTextureSize * 0.5;
    
      // // touch
      // vec2 adjustedMouse = vec2( (u_mouse.x - 10.0) , u_mouse.y);
      vDist = min(max(distance( (u_mouse / u_resolution) , puv), 0.0), uRadius);
      float distDisplacement = log2( vDist + 0.1 );

      // distortion
      displaced.xy += vec2( (random(pindex) - 0.5) * max(((vDist * vDist) ), 0.0), (random(offset.x + pindex) - 0.5) ) * ( max(((vDist * vDist)), 0.0) * uDistortion * angle);

      displaced.z += (distDisplacement * uMagnitude);
      displaced.x += distDisplacement * uMagnitude;
      displaced.y += distDisplacement * uMagnitude;
    
      // offset according to how high the R channel is
      // float t = texture2D(uTouch, puv).r;
      // displaced.z += t * uMagnitude * rndz;
      // displaced.x += cos(angle) * t * uMagnitude * rndz;
      // displaced.y += sin(angle) * t * uMagnitude * rndz;
    
      // particle size
      // float psize = (snoise2(vec2(uTime, pindex) * 0.5) + 2.0);
      float psize = max(uSizeMax - min(vDist * uSize, uSizeMax), uSizeMin);
      // psize *= (1.0 + (colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07));
      // float psize = uSize;
      vDisplacement = displaced;
    
      // final position
      vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
      mvPosition.xyz += position * psize;
      vec4 finalPosition = projectionMatrix * mvPosition;
    
      gl_Position = finalPosition;
    }
    `;
  }
}
