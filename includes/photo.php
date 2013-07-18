<?php
require_once(dirname(__FILE__).'/functions.php');

if(isset($_POST['action'])){
	switch($_POST['action']){
		case 'add':
			addNextPhoto($_POST['current'],$_POST['dir']);
			break;
		case 'width':
			getPhotoWidths($_POST['dir'],$_POST['index']);
			break;
		default:
			break;
	}
}

function addNextPhoto($current,$dir){
	if(getPhoto($current+3,$dir)){
		echo addPhoto($current+3,$dir);
	}
}

function getPhotoWidth($dir,$index){
	$photo = getPhoto($index,$dir);
	$filename = array_keys($photo);
	$filename = $filename[0];
	$path = '../photos/'.$dir.'/'.$filename.'.jpg';
	$size = getimagesize($path);
	echo $size[0].' '.$size[1];
}

function getPhotoWidths($dir,$index){
	for($i=0;$i<=$index;$i++){
		$photo = getPhoto($i,$dir);
		$filename = array_keys($photo);
		$filename = $filename[0];
		$path = '../photos/'.$dir.'/'.$filename.'.jpg';
		$size = getimagesize($path);
		echo $size[0].' '.$size[1];
		if($i != $index) echo ' ';
	}
}