var current = 0;
var lock = false;
var galleryReady = false;

var transluscent = .35;
var slideSpeed = 500;
var photoHeight = 500;
var menuHeight = 160;

var colorPrimary = '#000000';
var colorSecondary = '#FFFFFF';

function onLoad(){
	menuHeight=$('.header').outerHeight(true)+$('.footer').outerHeight(true)+20;
	//setting up gallery
	resizeGallery();
	centerGallery();
	$(window).resize(function() {
		menuHeight=$('.header').outerHeight(true)+$('.footer').outerHeight(true)+20;
		resizeGallery();
		centerGallery();
	});
}

$(window).load(onLoad);

function onReady(){
		
	//link hover effects
	$('a').each(function(){
		$(this).mouseenter(function(){
			$(this).animate({
				backgroundColor:colorPrimary,
				color: colorSecondary
			},200);
		});
		$(this).mouseout(function(){
			$(this).animate({
				backgroundColor:colorSecondary,
				color: colorPrimary
			},200);
		});
	});
	
	$('.header a').each(function(){
		$(this).bind('click', function(event){
			changeState($(this).attr('id'));
		});
	});
	
	$('.header a#'+state).addClass('current');
	
	//scroll down = next photo, prev for scroll up
	$('.content').bind('mousewheel', function(event, delta, deltaX, deltaY) {
		if(!galleryReady) return false;
		
		if((deltaY < 0 || deltaX > 0) && delta < 0 ){
			nextPhoto();
		} else if ((deltaY > 0 || deltaX < 0) && delta > 0){
			prevPhoto();
		}
		return false;
	});
	
	$('.content').bind('click', function(event){
		if(!galleryReady) return;
		
		if(event.pageX > $(this).width()/2){
			nextPhoto();
		} else {
			prevPhoto();
		}
	});
	
	//title effect upon hover
	$('h1').mouseover(function(){
		var offset = 0;
		var interval = 20;
		$('h1 span').each(function(){
			var that = this;
			setTimeout(function(){
				$(that).css({'background-color':colorPrimary,'color':colorSecondary});
			},offset);
			setTimeout(function(){
				$(that).css({'background-color':colorSecondary,'color':colorPrimary});
			},interval+offset);
			offset += interval;
		});
		
		$($("h1 span").get().reverse()).each(function(){
			var that = this;
			setTimeout(function(){
				$(that).css({'background-color':colorPrimary,'color':colorSecondary});
			},offset)
			setTimeout(function(){
				$(that).css({'background-color':colorSecondary,'color':colorPrimary});
			},interval+offset);
			offset += interval;
		});
	});
	
	//swiping on phone
	$(".content").touchwipe({
		wipeLeft: function() { nextPhoto(); },
		wipeRight: function() { prevPhoto(); },
		wipeUp: function() { nextPhoto();},
		wipeDown: function() { prevPhoto(); },
		min_move_x: 20,
		min_move_y: 20,
		preventDefaultEvents: true
   });
}

$(document).ready(onReady);

/*function centerGallery(wrapper){
	if(typeof wrapper === 'undefined'){
        wrapper = state;
    } 
	wrapper = '#wrapper_'+wrapper+' ';
	
	var photoPrev2 = $(wrapper+".img"+(current-2));
	var photoPrev = $(wrapper+".img"+(current-1));
	var photo = $(wrapper+".img"+current);
	var photoNext = $(wrapper+".img"+(current+1));
	var photoNext2 = $(wrapper+".img"+(current+2));
	
	var offset = $(document).width()/2 - $(wrapper+'.img0').width()/2 - 10;
	var id = 0;
	$(wrapper+".photo").each(function(){
		if(id >= current) {
			//offset -= 5;
			photoPrev2.css("left",offset);
			photoPrev2.css("opacity",0);
			photoPrev.css("left",offset);
			photoPrev.css("opacity",transluscent);
			photo.css("left",offset);
			photoNext.css("left",offset);
			photoNext.css("opacity",transluscent);
			photoNext2.css("left",offset);
			photoNext2.css("opacity",0);
			return;
		}
		offset -= $(this).width()/2 + $('.img'+(id+1)).width()/2 + 10;
		id ++;
	});
}*/

function resizeGallery(){
	photoHeight = 100;
	var contentHeight = photoHeight + 30;
	if($(window).height()-menuHeight > 100){
		photoHeight = $(window).height()-menuHeight-30;
		contentHeight = photoHeight + 30;
	}
	if($(window).height()-menuHeight-30 > 1000){
		photoHeight = 1000;
		contentHeight = photoHeight + 30;
	}
	$('.content').css('height',contentHeight);
	$('.photo img').css('height',photoHeight);
	$('.photo').css('height',photoHeight);
	$('.image').css('height',photoHeight + 30);
}

function prevPhoto(){
	var id = current;
	if(current <= 0 || lock) return; //only slide if prev photo exists and not locked
	
	var photo = $(".img"+id);
	var photoPrev = $(".img"+(id-1));
	var photoPrev2 = $(".img"+(id-2));
	var photoNext = $(".img"+(id+1));
	var offset = parseFloat(photo.css("left")) + (photo.width()/2 + photoPrev.width()/2)+10;
	
	//animate everything
	if(photoPrev2.length){
		photoPrev2.animate({
			opacity: transluscent,
			left:offset
		}, slideSpeed );
	}
	photoPrev.animate({
		opacity: 1,
		left:offset
	}, slideSpeed );
	photo.animate({
		opacity: transluscent,
		left:offset
	}, slideSpeed );
	photoNext.animate({
		opacity: 0,
		left:offset
	}, slideSpeed );
	
	lock = true;
	setTimeout( function(){
         lock = false;
      }, slideSpeed);
	
	current --;
}

function nextPhoto(){
	var id = current;
	if(!$(".img"+(id+1)).length || lock) return; //only slide if next photo exists and not locked
	console.log(lock);
	
	
	var photo = $(".img"+id);
	var photoPrev = $(".img"+(id-1));
	var photoNext = $(".img"+(id+1));
	var photoNext2 = $(".img"+(id+2));
	var offset = parseFloat(photo.css("left")) - (photo.width()/2 + photoNext.width()/2)-10;
	
	//animate everything
	if(photoPrev.length){
		photoPrev.animate({
			opacity: 0,
			left:offset
		}, slideSpeed );
	}
	if(photoNext2.length){
		photoNext2.animate({
			opacity: transluscent,
			left:offset
		}, slideSpeed );
	}
	photo.animate({
		opacity: transluscent,
		left:offset
	}, slideSpeed );
	photoNext.animate({
		opacity: 1,
		left:offset
	}, slideSpeed );
	
	lock = true;
	setTimeout( function() {
        lock = false;
    }, slideSpeed);
	
	if(!$(".img"+(current+3)).length){
		$.post('includes/photo.php',{
			action:'add',
			current:current,
			dir:state
		}, function(ret){
			$(".content").append(ret);
			$(".img"+(current+3)).css("opacity",0);
			$(".img"+(current+3)).css("left",offset);
			$(".img"+(current+3)).css("height",photoHeight+30);
			$(".img"+(current+3)+" .photo").css("height",photoHeight);
			$(".img"+(current+3)+" img").css("height",photoHeight);
			current ++;
		});
	} else {
		current ++;
	}
	
	
}

function changeState(to){
	if(state == to || lock) return;
	lock = true;
	current = 0;
	
	var currentWrapper = '#wrapper_'+state;
	var newWrapper = '#wrapper_'+to;
	toggleColors();
	$(currentWrapper).animate({
		top:-1*$(window).height()
	}, 1000);
	$.get('view/'+to+'.php', function(ret){
		state = to;
		$('body').append(ret);
		$('.header a#'+state).addClass('current');
		setColors(newWrapper);
		
		//center the img before it loads
		$.post('includes/photo.php', {
			action: 'width',
			dir: 'live',
			index : 0
		}, function(ret){
			onLoad();
			var imgSize = ret.split(' ');
			ratio = imgSize[0]/imgSize[1];
			tempOffset = $(window).width()/2 - ratio * photoHeight / 2-10;
			$(newWrapper+' .img0').css('left',tempOffset);
			$(newWrapper+' .img1').css('left',tempOffset);
		});
		
		$(newWrapper).animate({
			top:-1*$(window).height()
		}, 1000, function(){
			$(currentWrapper).remove();
			$(newWrapper).css('top',0);
			onLoad();
			onReady();
			lock = false;
		});
	});
}

function centerGallery(wrapper){
	if(typeof wrapper === 'undefined'){
        wrapper = state;
    } 
	wrapper = '#wrapper_'+wrapper+' ';
	
	var photoPrev2 = $(wrapper+".img"+(current-2));
	var photoPrev = $(wrapper+".img"+(current-1));
	var photo = $(wrapper+".img"+current);
	var photoNext = $(wrapper+".img"+(current+1));
	var photoNext2 = $(wrapper+".img"+(current+2));
	
	$.post('includes/photo.php', {
		action: 'width',
		dir: 'live',
		index : current
	}, function(ret){
		var imgSize = ret.split(' ');
		var ratio = imgSize[0]/imgSize[1];
		var offset = $(window).width()/2 - ratio * photoHeight / 2-10;
		
		for(var i=2;i<=imgSize.length-2;i+=2){
			var ratioPrev = ratio;
			ratio = imgSize[i]/imgSize[i+1];
			offset -= ratio * photoHeight / 2 + ratioPrev * photoHeight / 2 + 10;
		}
		
		photoPrev2.css("left",offset);
		photoPrev2.css("opacity",0);
		photoPrev.css("left",offset);
		photoPrev.css("opacity",transluscent);
		photo.css("left",offset);
		photoNext.css("left",offset);
		photoNext.css("opacity",transluscent);
		photoNext2.css("left",offset);
		photoNext2.css("opacity",0);
		galleryReady = true;
		return;
	});
}

function toggleColors(){
	if(colorPrimary == '#000000'){
		colorPrimary = '#FFFFFF';
		colorSecondary = '#000000';
	} else {
		colorPrimary = '#000000';
		colorSecondary = '#FFFFFF';
	}
}

function setColors(wrapper){
	$(wrapper).css({'background':colorSecondary,'color':colorPrimary});
	$(wrapper+' a').css('color',colorPrimary);
	$(wrapper+' .header').css({'background':colorSecondary,'color':colorPrimary});
	$(wrapper+' .header a').css({'color':colorPrimary,'border':'1px solid '+colorSecondary});
	$(wrapper+' .header a.current').css('border','1px solid '+colorPrimary);
	$(wrapper+' .content').css({'background':colorPrimary,'color':colorSecondary});
}