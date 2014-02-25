<?php

	require_once("dbConfig.php");
    require_once("dbClass.php");


    $db = new DB();
    $con = $db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
    // $select = $db->query("SELECT * FROM user_detail");
    // $result = $db->fetch_array();
    // print_r($result);
    // print_r($select);
    // while($result = $db->fetch_array())
    // {
        
    // }
 	

	$date = date("YmdHms");
	$current_time = date("Y-m-d H:i:s");
 	$to_whom = $_POST["name"];
	$msg = $_POST["msg"];
	$fb = $_POST["fb"];
 	$hash = strtoupper(hash( 'crc32b', $date.$to_whom ));
 	// print_r($fb);

	$sql = "INSERT INTO user_detail(
				fb_id,
				fb_name,
				fb_username,
				fb_gender,
				fb_email,
				fb_location_id,
				fb_location_name,
				fb_locale,
				fb_timezone,
				to_whom,
				msg,
				web_address,
				time
			) 
			VALUES (
				". $fb['id'] .",
				'". $fb['name'] ."',
				'". $fb['username'] ."',
				'". $fb['gender'] ."',
				'". $fb['email'] ."',
				'". $fb['location_id'] ."',
				'". $fb['location_name'] ."',
				'". $fb['locale'] ."',
				'". $fb['timezone'] ."',
				'$to_whom',
				'$msg',
				'$hash',
				'$current_time'
				)";

 	// print_r($sql);
 	$result = $db->query($sql);

 	// echo "<br/>";
 	// print_r($result);

 	if($result){
 		$arr = array(
			'result'=>true,
			'url'=>$hash
		);
 		// return true;
 	}
 	else{
 		$arr = array(
			'result'=>false
		);
 		// return false;
 	}

 
 	echo json_encode($arr);

 	return $arr;


?>


