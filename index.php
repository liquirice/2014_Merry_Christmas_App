<?php

require_once("lib/dbConfig.php");
require_once("lib/dbClass.php");

$surprise = isset($_GET["surprise"]);

if($surprise){
    $db = new DB();
    $con = $db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);

    $surprise = $_GET["surprise"];

    $sql = "SELECT 
            to_whom 
        FROM 
            user_detail
        WHERE
            web_address = '$surprise'
        ";

    $select = $db->query($sql);
    $result = $db->fetch_array();
    $name = $result['to_whom'];
}
else{
    $name = "Click Me";
}

// $date = date("Y-m-d H:i:s");
// print_r($date);
?><!-- 
親愛的 Kahori Hirose

曾經我們就好像好朋友一樣，無所不談。

談到天荒地老也不會覺得時間很久。

曾經我們就像一般的情侶一樣，

甜蜜的渡過每一天。

如今我們卻變成熟悉的陌生人

不過，我還是要感謝你為我帶來了一切人生最美好、最可貴的回憶。

感謝你帶來給我一切的歡樂，也從我身邊帶走

感謝你讓我走進你的世界，並創造了屬於我們的空間、時段。

只可惜的是，這一切卻無法維持到最後。

這一切對我來說就好像發生了一場美夢，

可是我卻一直不想醒來，只因為想永遠沉睡在這一場夢永遠中

如今夢已醒，那麼我把自由還回給你，


最後，謝謝你這兩年半的陪伴，也希望你可以好好的照顧自己

祝：“生日快樂”

by 田
2013/11/12
 -->
<!DOCTYPE HTML>
<html lang="en">
    <head>
        <!-- simplified meta charset - works on legacy browsers -->
        <meta charset="utf-8"> 
        
        <!-- Page Title -->
        <title>Merry Christmas</title> 
        <!-- Favicon -->
        <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/jbclock.css">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        
    </head>
    <body onload="init()">
        <div class="header"></div>
        <div class="wrap">
            <div class="container">
                <div class=".col-xs-6 .col-md-4">
                    <span class="title glow">Merry Christmas</span>
                </div>
                <div class=".col-xs-6 .col-md-4">
                    <div class="clock" >
                        <!-- Days -->
                        <div class="clock_days">
                            <div class="bgLayer">
                                <div class="topLayer"></div>
                                <canvas id="canvas_days" width="188" height="188">
                                </canvas>
                                <div class="text">
                                    <p class="val"></p>
                                    <p class="type_days">Days</p>
                                </div>
                            </div>
                        </div>
                        <!-- Days -->
                        <!-- Hours -->
                        <div class="clock_hours">
                            <div class="bgLayer">
                                <div class="topLayer"></div>
                                <canvas id="canvas_hours" width="188" height="188">
                                </canvas>
                                <div class="text">
                                    <p class="val"></p>
                                    <p class="type_hours">Hours</p>
                                </div>
                            </div>
                        </div>
                        <!-- Hours -->
                        <!-- Minutes -->
                        <div class="clock_minutes">
                            <div class="bgLayer">
                                <div class="topLayer"></div>
                                <canvas id="canvas_minutes" width="188" height="188">
                                </canvas>
                                <div class="text">
                                    <p class="val"></p>
                                    <p class="type_minutes">Minutes</p>
                                </div>
                            </div>
                        </div>
                        <!-- Minutes -->
                        <!-- Seconds -->
                        <div class="clock_seconds">
                            <div class="bgLayer">
                                <div class="topLayer"></div>
                                <canvas id="canvas_seconds" width="188" height="188">
                                </canvas>
                                <div class="text">
                                    <p class="val"></p>
                                    <p class="type_seconds">Seconds</p>
                                </div>
                            </div>
                        </div>
                        <!-- Seconds -->
                    </div>
                </div>
                <div class=".col-xs-6 .col-md-4" >
                    <?php 
                    if(!$surprise){ 
                    ?>
                        <a class="various" data-fancybox-type="iframe" href="fbfanpage.html"><span id="dearest" class="name"><?php print_r($name); ?></span></a>

                    <?php }
                    else{
                    ?>
                       <span id="dearest" class="name"><?php print_r($name); ?></span>
                    <?php 
                    }
                    ?>
                </div>

            </div>
        </div>
        
        <div class="footer">
            <div class="container" style="position:absolute;">
                <audio id="player"  autoplay>
                  <source src="audio/Edward Scissorhands-Ice Dance.mp3" type="audio/mpeg">
                </audio>
               
            </div>
        </div>
        <div id="fb-root"></div>
    <script type="text/javascript" src="js/jquery-1.8.0.min(1).js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/ThreeCanvas.js"></script>
    <script type="text/javascript" src="js/Snow.js"></script>
    <script type="text/javascript" src="js/jbclock.js"></script>
    
    <!-- Add fancyBox -->
    <link rel="stylesheet" href="plug/fancybox/source/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
    <script type="text/javascript" src="plug/fancybox/source/jquery.fancybox.pack.js?v=2.1.5"></script>

    <!-- Optionally add helpers - button, thumbnail and/or media -->
    <link rel="stylesheet" href="plug/fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5" type="text/css" media="screen" />
    <script type="text/javascript" src="plug/fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>
    <script type="text/javascript" src="plug/fancybox/source/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

    
    </body>
</html>
