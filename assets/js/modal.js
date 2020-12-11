function setModal(data){
	var modal = getE('modal')
	if(data.close){
		getE('modal-close-btn').style.display = 'block'
		if(data.action){
			getE('modal-close-btn').setAttribute('onclick',data.action+"()")
		}else{
			getE('modal-button').setAttribute('onclick',"unsetModal(null)")
		}
	}else{
		getE('modal-close-btn').style.display = 'none'
	}

	if(data.title!=null&&data.title!=undefined){
		if(data.title!=''){
			getE('modal-title').style.display = 'block'
			getE('modal-title').innerHTML = data.title
		}else{
			getE('modal-title').style.display = 'none'
		}
	}else{
		getE('modal-title').style.display = 'none'
	}
	if(data.content!=""){
		getE('modal-content').innerHTML = data.content
	}	

	if(data.button){
		if(data.value!=null){
			getE('modal-button').innerHTML = data.value
		}else{
			getE('modal-button').innerHTML = 'aceptar'
		}

		getE('modal-button').style.display = 'block'
		if(data.action){
			if(data.params){
				getE('modal-button').setAttribute('onclick',data.action+"("+data.params+")")
			}else{
				getE('modal-button').setAttribute('onclick',data.action+"()")
			}
			
		}else{
			getE('modal-button').setAttribute('onclick',"unsetModal(null)")
		}
	}else{
		getE('modal-button').style.display = 'none'
		getE('modal-button').setAttribute('onclick','')
	}

	if(data.orientation!=null&&data.orientation!=undefined){
		if(data.orientation=='left'){
			getE('modal-box').className = 'modal-box-left'
		}else if(data.orientation=='full'){
			console.log("full")
			getE('modal-box').className = 'modal-box-full'
		}
	}else{
		getE('modal-box').className = ''
	}

	modal.style.top = '0px'
	modal.className = 'modal-on'
	animacion_modal = setTimeout(function(){
		clearTimeout(animacion_modal)
		animacion_modal = null
		if(data.callBack!=null&&data.callBack!=undefined){
			data.callBack()
		}
	},500)
}

var animacion_modal = null
function unsetModal(callBack){
	var modal = getE('modal')
	modal.className = 'modal-off'

	animacion_modal = setTimeout(function(){
		clearTimeout(animacion_modal)
		animacion_modal = null

		//el modal solo muestra las instrucciones, por lo tanto, cada vez que se oculte el modal, se paran las animaciones de las instrucciones y los videos

		if(getE('instrucciones-wrap')!=null){
			getE('instrucciones-wrap').className = 'instrucciones-wrap-left-1'
		}
		
		modal.style.top = '-1000px'
		actual_page_inst = 1

		if(callBack!=null){
			callBack()
		}		
	},500)
}


////////////////////VIDEO INSTRUCCIONES////////////////
function setVideoInstrucciones(div){
	var video = div.getElementsByTagName('video')[0]
	var btn = div.getElementsByTagName('button')[0]
	if(btn.className==''){
		btn.className = 'video-playing'
		video.play()
	}else{
		btn.className = ''
		video.pause()
	}
}

var animacion_mensaje = null
var showing_mensaje = false
function setMensaje(data){
	if(!showing_mensaje){
		getE('mensaje').innerHTML = data.content
		if(data.posx!=null&&data.posx!=undefined){
			console.log("left")
			getE('mensaje').className = 'mensaje-on mensaje-left'
		}else{
			getE('mensaje').className = 'mensaje-on'
		}	

		clearTimeout(animacion_mensaje)
		showing_mensaje = true

		animacion_mensaje = setTimeout(function(){
			showing_mensaje = false
			clearTimeout(animacion_mensaje)
			animacion_mensaje = null

			getE('mensaje').className = 'mensaje-off'
		},data.delay)
	}else{
		//console.log("mostrando")
	}
}

var animacion_mensaje2 = null
var showing_mensaje2 = false
function setMensaje2(data){
	if(!showing_mensaje2){
		getE('viejito-mensaje').innerHTML = data.content
		if(data.posx!=null&&data.posx!=undefined){
			console.log("left")
			getE('viejito-mensaje').className = 'mensaje-on mensaje-left'
		}else{
			getE('viejito-mensaje').className = 'mensaje-on'
		}	

		clearTimeout(animacion_mensaje2)
		showing_mensaje2 = true

		animacion_mensaje2 = setTimeout(function(){
			showing_mensaje2 = false
			clearTimeout(animacion_mensaje2)
			animacion_mensaje2 = null

			getE('viejito-mensaje').className = 'mensaje-off'
		},data.delay)
	}else{
		//console.log("mostrando")
	}
}

var animacion_cargador2 = null
function setCargador2(data){
	getE('cargador-v2').className = 'cargador-v2-on'
	animacion_cargador2 = setTimeout(function(){
		clearTimeout(animacion_cargador2)
		animacion_cargador2 = null

		data.callBack()
	},500)	
}
function unsetCargador2(){
	getE('cargador-v2').className = 'cargador-v2-off'
}