var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

var particle;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var particles = [];
var particleImage = new Image(); //THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
particleImage.src = 'img/ParticleSmoke.png';

var fb = new Object;

function init() {

    var unix = Math.round(+new Date() / 1000); //unix timestamp for todays date
    // alert(unix);

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    var material = new THREE.ParticleBasicMaterial({
        map: new THREE.Texture(particleImage)
    });

    for (var i = 0; i < 700; i++) {

        particle = new Particle3D(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = 1;
        scene.add(particle);

        particles.push(particle);
    }

    container.appendChild(renderer.domElement);


    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    setInterval(loop, 1000 / 60);



    $(document).ready(function() {

        JBCountDown({
            secondsColor: "#ffdc50",
            secondsGlow: "#ff6565",

            minutesColor: "#9cdb7d",
            minutesGlow: "#378cff",

            hoursColor: "#378cff",
            hoursGlow: "#9cdb7d",

            daysColor: "#ff6565",
            daysGlow: "#ffdc50",

            startDate: "1384214400",
            endDate: "1387897200",
            now: unix,
            seconds: unix % 60 //unix timestamp for seconds in realtime
        });

        nextTrack();

    });

    jQuery(".fancybox").fancybox();

    fancyboxTrigger();

    dataSubmit();

    FB.Event.subscribe('edge.create', function(response) {
        // like clicked
        alert("liked clicked");
    });

    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
    

    FB.Event.subscribe('edge.create',
        function(response) {
            alert('You liked the URL: ' + response);
        }
    );

    }(document, 'script', 'facebook-jssdk'));
}

function dataSubmit() {
    var me = this;
            // alert("preview2");
        $('.preview2').on("click", function(e) {
            //  $.fancybox(
            // {
            //     href : site_url + '/ajax/apps_ajax/quick_look',
            //     type : 'ajax',
            //     ajax : {
            //         type: 'POST',
            //         data: {
            //             app_id: appID,
            //             opinion_id: opinionID
            //         }
            //     }
            // });

            e.preventDefault(); // avoids calling preview.php
            $.ajax({
                type: "POST",
                cache: false,
                url: this.href, // share.php
                data:{
                    name: name,
                    msg: msg,
                    fb:fb
                },
                success: function(data) {
                    console.log(data);
                    alert(data);

                    // on success, post (preview) returned data in fancybox
                    $.fancybox(data, {
                        // fancybox API options
                        fitToView: false,
                        width: 905,
                        height: 505,
                        autoSize: false,
                        closeClick: false,
                        openEffect: 'none',
                        closeEffect: 'none'
                    }); // fancybox
                } // success
            }); // ajax
        }); // on

    jQuery("#name").keyup(function() {
        name = jQuery("#name").val();
        jQuery("#dearest").text(name);
        // jQuery( "p" ).text( name );
    });


    jQuery("#send").click(function() {
            // parent.jQuery.fancybox.close();

            // setTimeout(function() {
            //     jQuery.fancybox({
            //         href: "share.php",
            //         type: 'ajax',
            //         ajax: {
            //             type: 'POST',
            //             data: {
            //                 data: "hello"
            //             }
            //         }
            //     });
            // }, 1000); // 1000 = 1 secs

        var name = jQuery("#name").val(),
            msg = jQuery("#msg").val();


        if(name == ""){
            alert("Your dearest will be angry if you forget to type their name...");
            return false;
        }



        jQuery.ajax({
            type: "POST",
            url: "lib/proxy.php",
            data: {
                name: name,
                msg: msg,
                fb:fb
            },
            cache: false,
            dataType: "json",
            success: function(data) {
                // jQuery.fancybox.open
                // jQuery(".various").fancybox.close();
                console.log(data);
                

                fancyboxShareTrigger(data);
                // $.fancybox(data, {
                //     // fancybox API options
                //     fitToView: false,
                //     openEffect: 'none',
                //     closeEffect: 'none'
                // }); // fancybox
               
                // jQuery.fancybox.open({href : '1_b.jpg', title : 'My title'});
            },
            error: function() {
                alert('Error occured');
            }
        });
    });

}


function fancyboxShareTrigger(data){
    jQuery.fancybox({
        href: "share.php",
        type: 'ajax',
        ajax: {
            type: 'POST',
            data: {
                data: data
            }
        }
    });

}



function fancyboxTrigger() {

    // jQuery.fancybox.open([
    //     {
    //         // href : 'http://fancyapps.com/fancybox/demo/2_b.jpg', 
    //         // title : 'Post it to your dearest wall',

    //     }
    //     ],{
            
    //         'padding'           : 0,
    //         'transitionIn'      : 'none',
    //         'transitionOut'     : 'none',
    //         'type'              : 'image',
    //         'changeFade'        : 0

    //     });
    
    // $.fancybox({
    //     href: '#dearest', 
    //     modal: true
    // });
    // jQuery.attr('rel', 'gallery').fancybox.open({
    //     'content' : $("#divForm").html()
    // });
    


    jQuery(".various").fancybox({
        maxWidth: 400,
        maxHeight: 300,
        fitToView: true,
        width: '70%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'elastic',
        closeEffect: 'elastic',
        // afterLoad: function() {
        //     setTimeout(function() {
        //         $.fancybox.close();
        //     }, 3000); // 3000 = 3 secs
        // }
    });
}

function nextTrack() {
    var audio = document.getElementById("player");
    audio.addEventListener("ended", function() {
        audio.src = "audio/mayday_freedom.mp3";
        audio.play();
    });
}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
    }
}

//

function loop() {

    for (var i = 0; i < particles.length; i++) {

        var particle = particles[i];
        particle.updatePhysics();

        with(particle.position) {
            if (y < -1000) y += 2000;
            if (x > 1000) x -= 2000;
            else if (x < -1000) x += 2000;
            if (z > 1000) z -= 2000;
            else if (z < -1000) z += 2000;
        }
    }

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);

}

/*window.fbAsyncInit = function() {
  FB.init({
    appId      : '243288162390498', // App ID
    channelUrl : 'http://taiwan-talk.org', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "https://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
}*/

window.fbAsyncInit = function() {
    console.log("fbAsyncInit");
    // init the FB JS SDK
    FB.init({
        appId: '118356711602778', // App ID from the app dashboard
        channelUrl: 'http://code.cm.nsysu.edu.tw/', // Channel file for x-domain comms
        status: true, // Check Facebook Login status
        xfbml: true // Look for social plugins on the page
    });

    // 判斷是否已經有FB的login session 如果以登入 可以跳過登入的步驟進行下一步
    FB.getLoginStatus(function(response) {
        if (response.authResponse) {
            FB.api('/me', function(response) {
                // LoginSuccess(response);
            });
        } else {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', function(response) {
                        LoginSuccess(response);
                    });
                } else {
                    alert('!authResponse');
                }
            }, {
                scope: 'email'
            });
        }
    })


    // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
    // for any authentication related change, such as login, logout or session refresh. This means that
    // whenever someone who was previously logged out tries to log in again, the correct case below 
    // will be handled. 
    FB.Event.subscribe('auth.authResponseChange', function(response) {
        // Here we specify what we do with the response anytime this event occurs. 
        if (response.status === 'connected') {
            // The response object is returned with a status field that lets the app know the current
            // login status of the person. In this case, we're handling the situation where they 
            // have logged in to the app.
            console.log("connected");
            testAPI();
            dataSubmit();
            FB.Event.subscribe('edge.create',
        function(response) {
            alert('You liked the URL: ' + response);
        }
    );
        } else if (response.status === 'not_authorized') {
            // In this case, the person is logged into Facebook, but not into the app, so we call
            // FB.login() to prompt them to do so. 
            // In real-life usage, you wouldn't want to immediately prompt someone to login 
            // like this, for two reasons:
            // (1) JavaScript created popup windows are blocked by most browsers unless they 
            // result from direct interaction from people using the app (such as a mouse click)
            // (2) it is a bad experience to be continually prompted to login upon page load.
            console.log("not_authorized");
            
            FB.login();
        } else {
            // In this case, the person is not logged into Facebook, so we call the login() 
            // function to prompt them to do so. Note that at this stage there is no indication
            // of whether they are logged into the app. If they aren't then they'll see the Login
            // dialog right after they log in to Facebook. 
            // The same caveats as above apply to the FB.login() call here.
            console.log("nothing");
            
            FB.login();
        }
    });
};


// Here we run a very simple test of the Graph API after login is successful. 
// This testAPI() function is only called in those cases. 
function testAPI() {
    FB.api('/me', function(response) {
    // FB.api('/me/likes/'+page_id, function(response) {
        
        fb.id = response.id;
        fb.name = response.name;
        fb.email = response.email;

    });

    // Additional initialization code such as adding Event Listeners goes here
};

// Load the SDK asynchronously
(function() {
    // If we've already installed the SDK, we're done
    if (document.getElementById('facebook-jssdk')) {
        return;
    }

    // Get the first script element, which we'll use to find the parent node
    var firstScriptElement = document.getElementsByTagName('script')[0];

    // Create a new script element and set its id
    var facebookJS = document.createElement('script');
    facebookJS.id = 'facebook-jssdk';

    // Set the new script's source to the source of the Facebook JS SDK
    facebookJS.src = '//connect.facebook.net/en_US/all.js';

    // Insert the Facebook JS SDK into the DOM
    firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
}());


