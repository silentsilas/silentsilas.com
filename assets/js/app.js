(function() {
    var tau = Math.PI * 2;
    var width, height;
    var scene, camera, renderer;
    var greetings = [
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
        "You are the global constant to my life."
    ]
    function OnDocumentReady(){

        Greeting();

        Initialize();
        var interimColor = new THREE.Color( 0x339933 );

        var geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: THREE.VertexColors
        });
    
        var x, y, z;
        for (var vertIdx = 0; vertIdx < 2000; vertIdx++) {
            x = (Math.random() * 1600) * Math.cos(vertIdx);
            y = (Math.random() * 1200) * Math.sin(vertIdx);
            z = (Math.random() * 800) - 400;
        
            geometry.vertices.push(new THREE.Vector3(x, y, z));
            geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }
    
        var pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        var iterator = 0;
        var colorIterator = 0;
        var colorSteps = 400;
        var colorReversing = false;

        function render(){
            window.requestAnimationFrame(render);

            iterator++;
            if (colorReversing) {
                colorIterator--;
                if (colorIterator < 0) {
                    colorReversing = false;
                }
            } else {
                colorIterator++;
                if (colorIterator > colorSteps) {
                    colorReversing = true;
                }
            }

            var startColor = new THREE.Color( 0x330033 );
            var newColor = startColor.lerp(interimColor, (colorIterator) / colorSteps);
            for (var vertexIdx = 0; vertexIdx < geometry.vertices.length; vertexIdx++) {
                var particle = geometry.vertices[vertexIdx];
                var dX, dY, dZ;
                var direction = vertexIdx % 2 == 0 ? 1 : -1;

                dX = (Math.cos(iterator / 30) * 20 * direction) +
                    (Math.sin(iterator / 40) * 5);
                dY = Math.sin(iterator / 40) * 5 * direction +
                    (Math.cos(iterator / 40) * 5);
                dZ = Math.sin(iterator / 20) * -20;
            
                particle.add(new THREE.Vector3(dX, dY, dZ));
                geometry.colors[vertexIdx] = newColor;
            }
            geometry.verticesNeedUpdate = true;
            geometry.colorsNeedUpdate = true;
            
            renderer.render(scene, camera);
        }
            
        render();
    
    }

    function Initialize(){
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(120, 16 / 9, 1, 1000);
        renderer = new THREE.WebGLRenderer();
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', OnWindowResize);
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

    function Greeting() {
        var greeter = document.getElementById("greeting");

        if (greeter != null) {
            console.log(Math.random() * greetings.length);
            greeter.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
        }

    }

    document.addEventListener('DOMContentLoaded', OnDocumentReady);
})();