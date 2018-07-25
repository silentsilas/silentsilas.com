(function() {
    var tau = Math.PI * 2;
    var greeter;
    var greetingTime = 3;
    var width, height;
    var scene, camera, renderer;
    var currentColor = new THREE.Color( 0x339933 );
    var nextColorIdx = 1;
    var colorPalette = [
        new THREE.Color (0x339933),
        new THREE.Color (0x00b8ff),
        new THREE.Color (0xbd00ff),
        new THREE.Color (0xfdff45)
    ];

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
        "You are the global constant in my life.",
        "Don't be such a circuit breaker.",
        "If you're seeing things that you thought were dead, who you gonna call? Cache Busters!",
        "I think I need a blockchain to keep track of all my blockchains",
        "Contrary to popular belief, I do in fact know a few things outside my realm of expertise."
    ]
    function OnDocumentReady(){
        greeter = document.getElementById("greeting");
        if (greeter != null) {
            ShowGreet();
        }


        Initialize();
        var interimColor = new THREE.Color( 0x339933 );

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
        
            geometry.vertices.push(new THREE.Vector3(x, y, z));
            geometry.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
        }
    
        var pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        var iterator = 0;
        var colorIterator = 0;
        var colorSteps = 400;

        function render(){
            window.requestAnimationFrame(render);

            iterator++;
            colorIterator++;
            if (colorIterator > colorSteps) {
                colorIterator = 0;
                currentColor = colorPalette[nextColorIdx];
                nextColorIdx = (nextColorIdx + 1) % colorPalette.length;
            }

            var startColor = currentColor.clone();
            var newColor = startColor.lerp(colorPalette[nextColorIdx], (colorIterator) / colorSteps);
            for (var vertexIdx = 0; vertexIdx < geometry.vertices.length; vertexIdx++) {
                var particle = geometry.vertices[vertexIdx];
                var dX, dY, dZ;
                var direction = vertexIdx % 2 == 0 ? 1 : -1;

                dX = (Math.cos((iterator + vertexIdx) / 30) * 20 * direction) +
                    (Math.sin((iterator - vertexIdx) / 40) * 5);
                dY = Math.sin((iterator - vertexIdx) / 40) * 5 * direction +
                    (Math.cos((iterator + vertexIdx) / 40) * 5);
                // dZ = Math.sin((iterator - vertexIdx) / 20) * -20;
                dZ = 0;
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

    function ShowGreet() {
        TweenLite.fromTo(greeter, greetingTime, {opacity: "0"}, {opacity: "1", onComplete: HideGreet});
    }

    function HideGreet() {
        TweenLite.fromTo(greeter, greetingTime/2, {opacity: "1"}, {opacity: "0", onComplete: NextGreet});
    }

    function NextGreet() {
        greeter.innerHTML = greetings[Math.floor(Math.random() * greetings.length)];
        ShowGreet();
    }

    document.addEventListener('DOMContentLoaded', OnDocumentReady);
})();