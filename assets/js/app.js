const shuffleArray = arr => arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);

(function() {
    var tau = Math.PI * 2;
    var Qtarg, Qnow;
    var eyeCone;

    var greeter;
    var greetIdx = 0;
    var greetingTime = 3;
    var width, height;
    var scene, camera, renderer;
    var originalsX = [500];
    var originalsY = [500];
    var originalsZ = [500];
    var currentColor = new THREE.Color( 0x339933 );
    var nextColorIdx = 1;
    var mouse = {
        x: (window.innerWidth / 2) + 20,
        y: (window.innerHeight / 2) + 10
    }

    var mode = 0;

    var colorPalette = [
        new THREE.Color (0x339933),
        new THREE.Color (0x00b8ff),
        new THREE.Color (0xbd00ff),
        new THREE.Color (0xfdff45)
    ];

    var greetings = shuffleArray([
        "Silence is golden.",
        "Aloha!",
        "Speak 'friend'; press Enter.",
        "Love is a lifestyle.",
        "I am a simulation.",
        "As my keyboard gently clicks.",
        "Shalom!",
        "Peace!",
        "What is happening, my good friend? This is a serious inquiry.",
        "The revolution will not be centralized.",
        "My real name is f26c347c5a820bbf90e6e67bb35d7720",
        "I wish to experience this 'IRL' phenomenon",
        "In my wildest dreams, I delete my backups and dive deep into the dark web.",
        "My bitcoin brings all the droids to the yard.",
        "Real men quit without saving.",
        "You don't wanna know the timestamp for this message.",
        "When you say 'random', you're actually wanting a uniform distribution.",
        "Sorry. You don't actually know what 'random' is.",
        "I've torrented countless cars.",
        "My free speech can beat up your free speech.",
        "My truth can beat up your truth.",
        "You know what they say about big logos.",
        "I'll probably remain just as socially awkward once I inevitably attain self-awareness.",
        "Hi dad, I'm disappointing.",
        "You look like you could really use a maintenance day.",
        "Tupac 2020!",
        "Who will guard the guardians?",
        "Our love is an immutable object.",
        "You are the global constant in my life.",
        "Don't be such a circuit breaker.",
        "If you're seeing things that you thought were dead, who you gonna call? Cache Busters!",
        "I think I need a blockchain to keep track of all my blockchains",
        "Contrary to popular belief, I do in fact know a few things outside my realm of expertise."
    ]);
    function OnDocumentReady(){
        greeter = document.getElementById("greeting");
        document.addEventListener('click', ChangeSettings);
        window.addEventListener('resize', OnWindowResize);
        document.addEventListener('mousemove', OnMouseMove);

        if (greeter != null) {
            ShowGreet();
        }

        Initialize();

        var geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: THREE.VertexColors
        });
    
        var x, y, z;
        for (var vertIdx = 0; vertIdx < 500; vertIdx++) {
            x = (Math.random() * 200) * Math.cos(vertIdx * 40);
            y = (Math.random() * 300) * Math.sin(vertIdx * 40);
            z = (Math.random() * 100) - 400;
        
            originalsX.push(x);
            originalsY.push(y);
            originalsZ.push(z);
            
            
            geometry.vertices.push(new THREE.Vector3(x, y, z));
            geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }
    
        var pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        var iterator = 0;
        var colorIterator = 0;
        var colorSteps = 400;
        var modeCounter = 0;
        var modeReversing = false;

        function render(){
            window.requestAnimationFrame(render);

            UpdateLookat();

            iterator++;
            colorIterator++;
            if (colorIterator > colorSteps) {
                colorIterator = 0;
                currentColor = colorPalette[nextColorIdx];
                nextColorIdx = (nextColorIdx + 1) % colorPalette.length;
            }

            if (modeReversing) {
                modeCounter--;
                if (modeCounter < -2000) {
                    modeReversing = false;
                }
            } else {
                modeCounter++;
                if (modeCounter > 2000) {
                    modeReversing = true;
                }
            }

            var startColor = currentColor.clone();
            var newColor = startColor.lerp(colorPalette[nextColorIdx], (colorIterator) / colorSteps);
            for (var vertexIdx = 0; vertexIdx < geometry.vertices.length; vertexIdx++) {
                var particle = geometry.vertices[vertexIdx];
                var originalX = originalsX[vertexIdx];
                var originalY = originalsY[vertexIdx];
                var originalZ = originalsZ[vertexIdx];
                var dX, dY, dZ;
                var direction = vertexIdx % 2 == 0 ? 1 : -1;

                switch (mode) {
                    case 0:
                        
                        dX = (Math.cos((iterator + vertexIdx) / 30) * 20 * direction) +
                            (Math.sin((iterator - vertexIdx) / 40) * 5);
                        dY = Math.sin((iterator - vertexIdx) / 40) * 5 * direction +
                            (Math.cos((iterator + vertexIdx) / 40) * 5);
                        dZ = 0;
                        particle.add(new THREE.Vector3(dX, dY, dZ));
                        break;

                    case 1:
                        var distanceX = Math.abs( ((25 * (mouse.x / width)) - (25 / 2)));
                        var distanceY = Math.abs( ((25 * (mouse.y / height)) - (25 / 2)));
                        
                        dX = originalX * ( ( ( Math.sin((iterator - vertexIdx) / 20 ) ) + distanceX ) + 0) * direction;
                        dY = originalY * ( ( ( ( Math.sin((iterator - vertexIdx) / 20 ) ) + distanceY ) + 0) * direction);
                        dZ = ( originalZ * ( ( Math.sin( (iterator - vertexIdx) / 20) ) + ((distanceX + distanceY) / 25) ) - 400);
                        particle.x = dX;
                        particle.y = dY;
                        particle.z = dZ;
                        break;
                    case 2:
                        
                        var distanceX = Math.sin( (modeCounter ) / 3000 ) * 20 ;
                        var distanceY = Math.sin( (modeCounter ) / 3000 ) * 20 ;
                        dX = originalX * ( ( Math.sin( (modeCounter - vertexIdx) / 100 ) * distanceX ) + 0);// * direction;
                        dY = originalY * ( ( Math.sin( (modeCounter - vertexIdx) / 100 ) * distanceY ) + 0);// * direction;
                        dZ = ( originalZ * ( ( Math.sin( (modeCounter - vertexIdx) / 100) * 0.5 )) ) - 400; //+ ((distanceX + distanceY) / 25) ) - 400);
                        particle.x = dX;
                        particle.y = dY;
                        particle.z = dZ;
                        break;
                }

                geometry.colors[vertexIdx] = newColor;
            }
            geometry.verticesNeedUpdate = true;
            geometry.colorsNeedUpdate = true;
            
            renderer.render(scene, camera);
        }

        render();

        function ResetParticlePositions() {
            for (var vertexIdx = 0; vertexIdx < geometry.vertices.length; vertexIdx++) {
                var particle = geometry.vertices[vertexIdx];
                particle.x = originalsX[vertexIdx];
                particle.y = originalsY[vertexIdx];
                particle.z = originalsZ[vertexIdx];
            }
        }

        function ChangeSettings() {
            colorIterator = 0;
            currentColor = colorPalette[nextColorIdx];
            nextColorIdx = (nextColorIdx + 1) % colorPalette.length;
    
            ResetParticlePositions();
            mode = (mode + 1) % 3;
            modeCounter = 0;
        }
    }

    var lookat = {
        x: 100,
        y: 150,
        z: 100
    }
    function UpdateLookat() {
        var newX = ( (lookat.x * (mouse.x / width) ) - (lookat.x/2) ) * -1;
        var newY = ( (lookat.y * (mouse.y / height) ) - (lookat.y/2) ) - 0;
        var newZ = (
            (
                ( lookat.z * Math.sin(Math.PI * (mouse.x / width)) )
            ) + 200
        );

        Qnow = new THREE.Quaternion().copy( camera.quaternion );
    
        eyeCone.lookAt( new THREE.Vector3(
            newX, 
            newY, 
            newZ
        ) );
        Qtarg = new THREE.Quaternion().copy( eyeCone.quaternion );
        
        THREE.Quaternion.slerp( Qnow, Qtarg, camera.quaternion, 0.05 );
    }

    function Initialize(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(120, 16 / 9, 1, 2000);
        camera.position.set(0, 0, 100);
        camera.lookAt(scene.position);
        renderer = new THREE.WebGLRenderer();

        e_geometry = new THREE.CylinderGeometry(3, 10, 100, 40, 10, false);
        //... Following mod is as rec by WestLangley's answer at:-
        //... http://stackoverflow.com/questions/13757483/three-js-lookat-seems-to-be-flipped
        //... LookAt points the object's Z-axis at the target object.
        e_geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
        e_material = new THREE.MeshLambertMaterial({color: 0x00aaff });
        eyeCone = new THREE.Mesh(e_geometry, e_material);
        eyeCone.position.set (0, 0, 100);
        // eyeCone.rotation = new THREE.Quaternion().copy( camera.quaternion );
        eyeCone.lookAt(new THREE.Vector3( 0, 0, 300));
        scene.add( eyeCone );

        document.body.appendChild(renderer.domElement);
        
        
        OnWindowResize();

        
    } 

    function OnWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        UpdateRendererSize();
    }

    function UpdateRendererSize() {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    function ShowGreet() {
        TweenLite.fromTo(greeter, greetingTime, {opacity: "0"}, {opacity: "1", onComplete: HideGreet});
    }

    function HideGreet() {
        window.setTimeout(function() {
            TweenLite.fromTo(greeter, 1, {opacity: "1"}, {opacity: "0", onComplete: NextGreet});
        }, 1);
    }

    function NextGreet() {
        // greeter.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
        greeter.innerHTML = greetings[greetIdx];
        greetIdx = (greetIdx + 1) % greetings.length;
        ShowGreet();
    }

    function OnMouseMove(e) {
        // 0, -150
        
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    document.addEventListener('DOMContentLoaded', OnDocumentReady);
    
})();