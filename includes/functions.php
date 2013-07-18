<?php

require_once(dirname(__FILE__).'/settings.php');

function getPhoto($index,$dir){
	if($dir == 'live'){
		global $photos_live;
		$photos = $photos_live;
	} else if($dir == 'normal'){
		global $photos_normal;
		$photos = $photos_normal;
	} else {
		$photos = array();
	}
	
	if($index >= sizeof($photos)) return false;
	return array_slice($photos,$index,1,true);
}

function addPhoto($index,$dir){
	$photo = getPhoto($index,$dir);
	$filename = array_keys($photo);
	$filename = $filename[0];
	$title = $photo[$filename];
	
	$output = '<div class="img'.$index.' image">';
	$output .= '<div class="photo"><img src="photos/'.$dir.'/'.$filename.'.jpg" /></div>'
	.'<div class="caption">'.$title.'</div></div>';
	
	return $output;
}