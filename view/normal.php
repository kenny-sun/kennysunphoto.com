<?php
if(file_exists('../includes/functions.php')) include_once('../includes/functions.php');
?>
<div id="wrapper_normal" class="wrapper">
	<?php include(dirname(__FILE__).'/header_div.php'); ?>
	<div class="content">
		<?php echo addPhoto(0,'normal');echo addPhoto(1,'normal');echo addPhoto(2,'normal'); ?>
	</div>
	<?php include(dirname(__FILE__).'/footer_div.php'); ?>
</div>