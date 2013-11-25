<?php

$url = $_SERVER['HTTP_HOST'].'/~liquir_ice/2014_Merry_Christmas/index.php?surprise='.$_POST["data"]["url"];
$surprise = $_POST["data"]["url"];

echo "Copy below the link and share it to your dearest ";

 echo "<a href='http://code.cm.nsysu.edu.tw/~liquir_ice/2014_Merry_Christmas/index.php?surprise=".$surprise."' target='_blank'>$url</a>";

?>

<html>
<head>
	<title></title>
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<div class="row">
  			<div class="col-md-3 col-md-offset-3">
			
			</div>	
		</div>	

	</div>
   

</body>
</html>