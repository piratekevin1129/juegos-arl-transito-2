var i = 0
var j = 0
var k = 0

function getRand(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function unorderArrayElementos(long,_test,counter){
	var desorden = []
	while(desorden.length<long){
		var a = getRand(0,(long-1))
		var a_exists = desorden.includes(a)
		while(a_exists){
			a = getRand(0,(long-1))
			a_exists = desorden.includes(a)
		}
		desorden.push(a)
	}

	if(counter==null||counter==undefined){
		counter = false
	}

	if(_test==null||_test==undefined){
		_test = new Array()
		for(k = 0;k<long;k++){
			if(counter){
				_test.push((k+1))	
			}else{
				_test.push(k)
			}
		}
	}

	var nuevo = []
	for(var ii = 0;ii<long;ii++){
		nuevo.push(_test[desorden[ii]])
	}
	return nuevo
}

var game = getE('game')
var game_scene = getE('game-scene')
game_scene.style.visibility = 'hidden'
var game_rect = game.getBoundingClientRect()
var game_width = game_rect.width
var game_height = game_rect.height
var vidas_txt = getE('vidas-txt')
var total_vidas = 10
vidas_txt.innerHTML = total_vidas
//console.log(game_width,game_height)

function setInstrucciones(start){
	var html = ''
	
    if(ismobile){
    	
    }else{
    	
    }

    if(start){
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'jugar',
			orientation:'left',
			action:'empezarJuego'
	    })
    }else{
    	setModal({
	    	close:false,
			title:'Instrucciones',
			content:html,
			button:true,
			value:'aceptar',
			orientation:'left',
			action:'seguirJuego'
	    })
    }
}

var actual_page_inst = 1
var total_pages_inst = 4
//boton prev instrucciones oculto por defecto
getE('instrucciones-prev-btn').style.visibility = 'hidden'


function nextInstrucciones(){
	boton_mp3.play()
	actual_page_inst++
	getE('instrucciones-wrap').className = 'instrucciones-wrap-left-'+actual_page_inst
	if(actual_page_inst==total_pages_inst){
		getE('instrucciones-next-btn').style.visibility = 'hidden'
	}
	if(actual_page_inst>1){
		getE('instrucciones-prev-btn').style.visibility = 'visible'
	}

}
function prevInstrucciones(){
	boton_mp3.play()
	actual_page_inst--
	getE('instrucciones-wrap').className = 'instrucciones-wrap-left-'+actual_page_inst
	if(actual_page_inst==1){
		getE('instrucciones-prev-btn').style.visibility = 'hidden'
	}
	if(actual_page_inst<total_pages_inst){
		getE('instrucciones-next-btn').style.visibility = 'visible'
	}
}

var animacion_swipe = null
function empezarJuego(){
	underground_mp3.play()
	boton_mp3.play()
	getE('cargador-txt').innerHTML = 'Cargando...'
	getE('cargador').className = 'cargador-on'
	unsetModal(function(){
		game_scene.style.visibility = 'visible'
		getE('home-scene').style.display = 'none'

		getE('cargador').className = 'cargador-off'

		if(isresponsive){
			/*getE('cursor-swipe').classList.add('cursor-swipe-animation-1')
			getE('fondo-casilleros').classList.add('cursor-swipe-animation-2')
			getE('casilleros').classList.add('cursor-swipe-animation-2')
			getE('personaje').classList.add('cursor-swipe-animation-3')
			
			animacion_swipe = setTimeout(function(){
				getE('cursor-swipe').classList.remove('cursor-swipe-animation-1')
				getE('fondo-casilleros').classList.remove('cursor-swipe-animation-2')
				getE('casilleros').classList.remove('cursor-swipe-animation-2')
				getE('personaje').classList.remove('cursor-swipe-animation-3')
				getE('cursor-swipe').style.display = 'none'

				clearTimeout(animacion_swipe)
				animacion_swipe = null

				iniciarReloj()
			},6000)*/

		}else{
			
		}

		if(ismobile){
			getE('keys-pad-cont').className = "keys-pad-on keys-pad-show"
		}
		
		setMission(false)
	})
}

function setGame(){
	//cargar imagen del escenario
	loadImage({url:'assets/images/fondo_conductor_1.png',callBack:function(data){
		fondo_data = {width:data.width,height:data.height,src:data.src,src2:''}
		if(ismobile){
			//fondo_data.height = (fondo_data.height+120)
		}
		console.log(fondo_data.height)
		loadImage({url:'assets/images/fondo_conductor_2.png',callBack:function(data){
			fondo_data.src2 = data.src
			setFloor(1,true)

			////////AQUI EMPIEZA TODOO///////
			
			animation_start = setTimeout(function(){
				clearTimeout(animation_start)
				animation_start = null

				getE('cargador').className = 'cargador-off'	
				setInstrucciones(true)
				//empezarJuego()
			},1000)
		}})
	}})
}

var actual_floor = 0
var container = getE('container')
var piso_container = getE('piso-container')
var piso_container_2 = getE('piso-container-2')
var misiones = getE('misiones')
var piso_container_rect = piso_container.getBoundingClientRect()
var piso_container_rect_2 = piso_container_2.getBoundingClientRect()
var misiones_rect = misiones.getBoundingClientRect()
var piso = getE('piso')
var piso_2 = getE('piso-2')
var paredes = getE('paredes')
var mission = null

var fondo_data = null
var piso_data = {
	left:0,
	top:0,
	width:0,
	height:0,
	paredes:[],
	elementos:[]
}

function updateStatus(){
	//put avatar
	avatar.style.top = avatar_data.top+'px'
	avatar.style.left = avatar_data.left+'px'
	avatar.className = 'avatar-'+avatar_data.direccion
	auto.style.transform = 'rotate('+avatar_data.rotacion+'deg)'
	auto.style.webkitTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto.style.oTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.transform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.webkitTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.oTransform = 'rotate('+avatar_data.rotacion+'deg)'
	
	piso.style.top = piso_data.top+'px'
	piso.style.left = piso_data.left+'px'
	mission.style.top = piso_data.top+'px'
	mission.style.left = piso_data.left+'px'
	paredes.style.top = piso_data.top+'px'
	paredes.style.left = piso_data.left+'px'
	piso_2.style.top = piso_data.top+'px'
	piso_2.style.left = piso_data.left+'px'
}
function updateRotationCar(plus,value,dir){
	//console.log(plus,value,dir,avatar_data.rotacion)
	if(plus=='+'){
		avatar_data.rotacion = avatar_data.rotacion+value
	}else{
		avatar_data.rotacion = avatar_data.rotacion-value
	}
	avatar_data.direccion = dir
	//console.log(avatar_data.rotacion)

	auto.style.transform = 'rotate('+avatar_data.rotacion+'deg)'
	auto.style.webkitTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto.style.oTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.transform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.webkitTransform = 'rotate('+avatar_data.rotacion+'deg)'
	auto2.style.oTransform = 'rotate('+avatar_data.rotacion+'deg)'
}

function setFloor(floor,start){
	actual_floor = floor
	var walls = []
	if(floor==1){
		piso_data.width = fondo_data.width
		piso_data.height = fondo_data.height

		piso_container.style.width = fondo_data.width+'px'
		piso_container.style.height = fondo_data.height+'px'
		piso.style.backgroundImage = 'url('+fondo_data.src+')'
		
		walls = paredes_conductor

		piso_container_2.style.width = fondo_data.width+'px'
		piso_container_2.style.height = fondo_data.height+'px'
		piso_2.style.backgroundImage = 'url('+fondo_data.src2+')'
	}else if(floor==2){
		//nunca llegará aqui
	}

	//poner paredes
	piso_data.paredes = []
	for(i = 0;i<walls.length;i++){
		var pared = document.createElement('div')
		pared.className = 'icono-pared'
		pared.style.width = walls[i].w+'px'
		pared.style.height = walls[i].h+'px'
		pared.style.left = walls[i].x+'px'
		pared.style.top = walls[i].y+'px'
		paredes.appendChild(pared)
		piso_data.paredes.push(pared)
	}
}

function clearFloor(){
	piso.innerHTML = ''
	piso_2.innerHTML = ''
	
	paredes.innerHTML = ''
	piso_data = {
		left:0,
		top:0,
		width:0,
		height:0,
		paredes:[],
		elementos:[]
	}
	
	piso_data.left = 0
	piso_data.top = 0
	piso.style.left = '0px'
	piso.style.top = '0px'
	piso_2.style.left = '0px'
	piso_2.style.top = '0px'
	mission.style.left = '0px'
	mission.style.top = '0px'
	paredes.style.left = '0px'
	paredes.style.top = '0px'
	avatar_data.left = 0
	avatar_data.top = 0
	avatar.style.left = '0px'
	avatar.style.top = '0px'
}

///////////////MISIONES///////////////
var m = 1
var animacion_mision = null

function setMission(repeat){
	var html = ''
	var steps = 0

	if(mission!=null){
		mission.style.display = 'none'
	}
	mission = getE('mission'+m)
	mission.style.display = 'block'
	updateStatus()//esto es para poner las coordenadas actuales a la nueva mision div
	
	if(m==1){
		//cuadrar posiciones del escenario y del personaje

		avatar_data.direccion = 'left'
		avatar_data.rotacion = 90
		avatar_data.left = xMiddle()
		piso_data.left = avatar_data.left-mision1.init.x
		piso_data.top = toBottom()
		avatar_data.top = yPercent(mision1.init.y)
		movex = 2
		movey = getMoveY('bottom')

		updateStatus()

		//poner elementos
		if(!repeat){
			//calles
			for(i = 0;i<mision1.conos.length;i++){
				var cono = document.createElement('div')
				cono.className = 'icono-cono'
				
				cono.setAttribute('type','cono-m1')
				cono.style.left = mision1.conos[i].x+'px'
				cono.style.top = mision1.conos[i].y+'px'
				piso_2.appendChild(cono)
				piso_data.elementos.push(cono)
			}

			//carros
			for(i = 0;i<mision1.carros.length;i++){
				var car = document.createElement('div')
				car.className = 'carro-mision-1'
				car.setAttribute('id',('carro'+mision1.carros[i].id+'-m1'))
				car.setAttribute('type','carro-m1')
				car.style.left = mision1.carros[i].animation_data[0].x+'px'
				car.style.top = mision1.carros[i].animation_data[0].y+'px'
				piso.appendChild(car)
				piso_data.elementos.push(car)
				mision1.carros[i].name = 'carro'+mision1.carros[i].id+'-m1'
			}

			//ppunto final
			var punto1 = document.createElement('div')
			punto1.className = 'icono-punto'
			punto1.setAttribute('id','punto-bueno-mision-1')
			punto1.setAttribute('type','punto-bueno')
			piso.appendChild(punto1)
			piso_data.elementos.push(punto1)
			//ppunto final
			var punto2 = document.createElement('div')
			punto2.className = 'icono-punto'
			punto2.setAttribute('id','punto-malo-mision-1')
			punto2.setAttribute('type','punto-malo')
			piso.appendChild(punto2)
			piso_data.elementos.push(punto2)

			var luz1 = document.createElement('div')
			luz1.className = 'icono-luz'
			luz1.setAttribute('id','luz-buena-mision-1')
			luz1.setAttribute('type','luz')
			piso.appendChild(luz1)
			//////
			var luz2 = document.createElement('div')
			luz2.className = 'icono-luz'
			luz2.setAttribute('id','luz-mala-mision-1')
			luz2.setAttribute('type','luz')
			piso.appendChild(luz2)

			//flecha
			var flecha1 = document.createElement('div')
			flecha1.className = 'flecha'
			flecha1.setAttribute('id','flecha-buena-mision-1')
			flecha1.setAttribute('type','flecha')
			piso.appendChild(flecha1)
			///////
			var flecha2 = document.createElement('div')
			flecha2.className = 'flecha'
			flecha2.setAttribute('id','flecha-mala-mision-1')
			flecha2.setAttribute('type','flecha')
			piso.appendChild(flecha2)
		}else{
			//reubicar
			for(i = 0;i<mision1.carros.length;i++){
				var car = getE(mision1.carros[i].name)
				car.style.left = mision1.carros[i].animation_data[0].x+'px'
				car.style.top = mision1.carros[i].animation_data[0].y+'px'
				car.className = 'carro-mision-1'//resetear clases
				mision1.carros[i].frame = 0
			}
		}
		
		html = mision1.test
		
		animacion_mision = setTimeout(function(){
			clearTimeout(animacion_mision)
			animacion_mision = null

			setModal({
				close:false,
				title:mision1.title,
				content:html,
				button:true,
				value:'comenzar',
				action:'startMission'
			})
		},50)
	}

	else if(m==2){
		mision2.pare = false
		mision2.approved = false

		if(!repeat){
			//poner elementos	

			//conos
			for(i = 0;i<mision2.conos.length;i++){
				var cono = document.createElement('div')
				cono.className = 'icono-cono'
				
				cono.setAttribute('type','cono-m2')
				cono.style.left = mision2.conos[i].x+'px'
				cono.style.top = mision2.conos[i].y+'px'
				piso_2.appendChild(cono)
				piso_data.elementos.push(cono)
			}
	
			//carros
			for(i = 0;i<mision2.carros.length;i++){
				var car = document.createElement('div')
				car.className = 'carro-mision-2'
				car.setAttribute('id',('carro'+mision2.carros[i].id+'-m2'))
				car.setAttribute('type','carro-m2')
				car.style.left = (mision2.carros[i].animation_data[0].x-(mision2.carros[i].size.w/2))+'px'
				car.style.top = (mision2.carros[i].animation_data[0].y-(mision2.carros[i].size.h/2))+'px'

				piso.appendChild(car)
				piso_data.elementos.push(car)
				mision2.carros[i].name = 'carro'+mision2.carros[i].id+'-m2'
			}
	
			//ppunto final
			var punto = document.createElement('div')
			punto.className = 'icono-punto'
			punto.setAttribute('id','punto-mision-2')
			punto.setAttribute('type','punto')
			piso.appendChild(punto)
			piso_data.elementos.push(punto)
	
			var luz = document.createElement('div')
			luz.className = 'icono-luz'
			luz.setAttribute('id','luz-mision-2')
			luz.setAttribute('type','luz')
			piso.appendChild(luz)
			//piso_data.elementos.push(luz)
	
			//flecha
			var flecha = document.createElement('div')
			flecha.className = 'flecha'
			flecha.setAttribute('id','flecha-mision-2')
			flecha.setAttribute('type','flecha')
			piso.appendChild(flecha)
			//piso_data.elementos.push(flecha)
	
			//pare
			var pare = document.createElement('div')
			pare.className = 'pare'
			pare.setAttribute('id','pare-mision-2')
			pare.setAttribute('type','pare')
			piso.appendChild(pare)
			piso_data.elementos.push(pare)
	
			//mover escenario
		}else{
			avatar_data.direccion = 'up'
			avatar_data.rotacion = 180
			piso_data.left = 0
			avatar_data.left = xPercent(mision2.init.x)
			avatar_data.top = yMiddle()
			piso_data.top = avatar_data.top-mision2.init.y
			movex = getMoveX('left')
			movey = 2
			updateStatus()
	
			//reubicar
			for(i = 0;i<mision2.carros.length;i++){
				var car = getE(mision2.carros[i].name)
				car.style.left = mision2.carros[i].animation_data[0].x+'px'
				car.style.top = mision2.carros[i].animation_data[0].y+'px'
				car.className = 'carro-mision-2'//resetear clases
				mision2.carros[i].frame = 0
			}
		}
		
		html = mision2.test
	
		animacion_mision = setTimeout(function(){
			clearTimeout(animacion_mision)
			animacion_mision = null

			setModal({
				close:false,
				title:mision2.title,
				content:html,
				button:true,
				value:'comenzar',
				action:'startMission'
			})
		},50)
	}

	else if(m==3){
		mision3.approved = false
		mision3.cruzando = false
		mision3.failed = false

		getE('viejito').style.left = mision3.viejito_data.x+'px'
		getE('viejito').style.top = mision3.viejito_data.inity+'px'
		getE('viejito').className = ''
		
		if(!repeat){
			putMetro()
			//temporal
			/*avatar_data.direccion = 'right'
			avatar_data.rotacion = 270
			avatar_data.left = xMiddle()
			avatar_data.top = yMiddle()
			piso_data.left = avatar_data.left-mision3.init.x
			piso_data.top = avatar_data.top-mision3.init.y
			movex = 2
			movey = 2			
			updateStatus()*/

			//poner elementos	
			piso_data.elementos.push(getE('viejito'))

			//conos
			for(i = 0;i<mision3.conos.length;i++){
				var cono = document.createElement('div')
				cono.className = 'icono-cono'
				
				cono.setAttribute('type','cono-m2')
				cono.style.left = mision3.conos[i].x+'px'
				cono.style.top = mision3.conos[i].y+'px'
				piso_2.appendChild(cono)
				piso_data.elementos.push(cono)
			}

			//carros
			for(i = 0;i<mision3.carros.length;i++){
				var car = document.createElement('div')
				car.className = 'carro-mision-3'
				car.setAttribute('id',('carro'+mision3.carros[i].id+'-m3'))
				car.setAttribute('type','carro-m3')
				car.style.left = (mision3.carros[i].animation_data[0].x-(mision3.carros[i].size.w/2))+'px'
				car.style.top = (mision3.carros[i].animation_data[0].y-(mision3.carros[i].size.h/2))+'px'

				piso.appendChild(car)
				piso_data.elementos.push(car)
				mision3.carros[i].name = 'carro'+mision3.carros[i].id+'-m3'
			}

			//ppunto final
			var punto = document.createElement('div')
			punto.className = 'icono-punto'
			punto.setAttribute('id','punto-mision-3')
			punto.setAttribute('type','punto')
			piso.appendChild(punto)
			piso_data.elementos.push(punto)
	
			var luz = document.createElement('div')
			luz.className = 'icono-luz'
			luz.setAttribute('id','luz-mision-3')
			luz.setAttribute('type','luz')
			piso.appendChild(luz)
			//piso_data.elementos.push(luz)
	
			//flecha
			var flecha = document.createElement('div')
			flecha.className = 'flecha'
			flecha.setAttribute('id','flecha-mision-3')
			flecha.setAttribute('type','flecha')
			piso.appendChild(flecha)
			//piso_data.elementos.push(flecha)
	
			//zebra
			var zebra = document.createElement('div')
			zebra.className = 'zebra'
			zebra.setAttribute('id','zebra-mision-3')
			zebra.setAttribute('type','zebra')
			piso.appendChild(zebra)
			piso_data.elementos.push(zebra)

			//zona que detecta si dejó pasar al man
			var zona = document.createElement('div')
			zona.className = 'zona'
			zona.setAttribute('id','zona-mision-3')
			zona.setAttribute('type','zona')
			piso.appendChild(zona)
			piso_data.elementos.push(zona)
		}else{
			avatar_data.direccion = 'right'
			avatar_data.rotacion = 270
			avatar_data.left = xMiddle()
			avatar_data.top = yMiddle()
			piso_data.left = avatar_data.left-mision3.init.x
			piso_data.top = avatar_data.top-mision3.init.y
			movex = 2
			movey = 2			
			updateStatus()

			//reubicar
			for(i = 0;i<mision3.carros.length;i++){
				var car = getE(mision3.carros[i].name)
				car.style.left = mision3.carros[i].animation_data[0].x+'px'
				car.style.top = mision3.carros[i].animation_data[0].y+'px'
				car.className = 'carro-mision-3'//resetear clases
				mision3.carros[i].frame = 0
			}
		}
	
		html = mision3.test
		
		animacion_mision = setTimeout(function(){
			clearTimeout(animacion_mision)
			animacion_mision = null
	
			setModal({
				close:false,
				title:mision3.title,
				content:html,
				button:true,
				value:'comenzar',
				action:'startMission'
			})
		},50)
	}

	else if(m==4){
		top_speed = 5

		if(!repeat){
			putMetro()
			//temporal, descomentar para empezar en esta mision
			/*avatar_data.direccion = 'up'
			avatar_data.rotacion = 180
			
			avatar_data.top = yMiddle()
			piso_data.top = avatar_data.top-mision4.init.y

			piso_data.left = toRight()
			avatar_data.left = xPercent(mision4.init.x)
			movex = getMoveX('right')
			movey = 2			
			updateStatus()*/
	
			//poner elementos
			//conos
			for(i = 0;i<mision4.conos.length;i++){
				var cono = document.createElement('div')
				cono.className = 'icono-cono'
				
				cono.setAttribute('type','cono-m2')
				cono.style.left = mision4.conos[i].x+'px'
				cono.style.top = mision4.conos[i].y+'px'
				piso_2.appendChild(cono)
				piso_data.elementos.push(cono)
			}
	
			//carros
			for(i = 0;i<mision4.carros.length;i++){
				var car = document.createElement('div')
				car.className = 'carro-mision-4'
				car.setAttribute('id',('carro'+mision4.carros[i].id+'-m4'))
				car.setAttribute('type','carro-m4')
				car.style.left = (mision4.carros[i].animation_data[0].x-(mision4.carros[i].size.w/2))+'px'
				car.style.top = (mision4.carros[i].animation_data[0].y-(mision4.carros[i].size.h/2))+'px'
				car.style.transform = 'rotate('+mision4.carros[i].animation_data[0].r+'deg)'
				piso_2.appendChild(car)
				piso_data.elementos.push(car)
				mision4.carros[i].name = 'carro'+mision4.carros[i].id+'-m4'
			}
	
			//ppunto final
			var punto = document.createElement('div')
			punto.className = 'icono-punto'
			punto.setAttribute('id','punto-mision-4')
			punto.setAttribute('type','punto')
			piso.appendChild(punto)
			piso_data.elementos.push(punto)
	
			var luz = document.createElement('div')
			luz.className = 'icono-luz'
			luz.setAttribute('id','luz-mision-4')
			luz.setAttribute('type','luz')
			piso.appendChild(luz)
			//piso_data.elementos.push(luz)
	
			//flecha
			var flecha = document.createElement('div')
			flecha.className = 'flecha'
			flecha.setAttribute('id','flecha-mision-4')
			flecha.setAttribute('type','flecha')
			piso.appendChild(flecha)
			//piso_data.elementos.push(flecha)
		}else{		
			avatar_data.direccion = 'up'
			avatar_data.rotacion = 180
			
			avatar_data.top = yMiddle()
			piso_data.top = avatar_data.top-mision4.init.y

			piso_data.left = toRight()
			avatar_data.left = xPercent(mision4.init.x)
			movex = getMoveX('right')
			movey = 2			
			updateStatus()
	
			//reubicar
			for(i = 0;i<mision4.carros.length;i++){
				var car = getE(mision4.carros[i].name)
				car.style.left = (mision4.carros[i].animation_data[0].x-(mision4.carros[i].size.w/2))+'px'
				car.style.top = (mision4.carros[i].animation_data[0].y-(mision4.carros[i].size.h/2))+'px'
				car.style.transform = 'rotate('+mision4.carros[i].animation_data[0].r+'deg)'
				car.className = 'carro-mision-4'//resetear clases
				mision4.carros[i].frame = 0
			}
			
		}
		
		html = mision4.test
	
		animacion_mision = setTimeout(function(){
			clearTimeout(animacion_mision)
			animacion_mision = null

			setModal({
				close:false,
				title:mision4.title,
				content:html,
				button:true,
				value:'comenzar',
				action:'startMission'
			})
		},50)
	}
}
function startMission(){
	boton_mp3.play()
	if(m==1){
		unsetModal(function(){
			//emmpeezar animaciones
			for(i = 0;i<mision1.carros.length;i++){
				mision1.carros[i].startAnimation(i)
			}
			
			setMensaje({
				content:'<p>Debo parquearme en un buen lugar.</p>',
				delay:1500
			})
			addEvents()
		})
	}else if(m==2){
		unsetModal(function(){
			//emmpeezar animaciones
			for(i = 0;i<mision2.carros.length;i++){
				mision2.carros[i].startAnimation(i)
			}
			
			setMensaje({
				content:'<p>Debo ir a la señal del PARE.</p>',
				delay:2000
			})
			addEvents()
			setPitos()
		})
	}else if(m==3){
		unsetModal(function(){
			//emmpeezar animaciones
			
			setMensaje({
				content:'<p>Debo tener en cuenta la zona zebra.</p>',
				delay:2000
			})
			
			addEvents()
			setMetro()
		})
	}else if(m==4){
		unsetModal(function(){
			//emmpeezar animaciones
			for(i = 0;i<mision4.carros.length;i++){
				mision4.carros[i].startAnimation(i)
			}
			
			setMensaje({
				content:'<p>Debo conducir con mucho cuidado.</p>',
				delay:3000
			})
			addEvents()
			setPitos()
			setMetro()
		})
	}else if(m==5){
		unsetModal(function(){
			//pregunta
			var html = '<div class="modal-content-preguntas">'
			html+='<section onclick="responderPregunta(1)" class="modal-pregunta-option"><span>a)</span> Cruzar tranquilamente ya que los conductores deben estar atentos a la situación.</section>'
			html+='<section onclick="responderPregunta(2)" class="modal-pregunta-option"><span>b)</span> Reducir el volumen de la música y mirar hacia ambos lados antes de cruzar.</section>'
			html+='<section onclick="responderPregunta(3)" class="modal-pregunta-option"><span>c)</span> Cruzar rápidamente esquivando los carros.</section>'
			html+='</div>'
			setModal({
				close:false,
				title:'Si estás escuchando música en tu celular y necesitas cruzar la calle. ¿Qué deberías hacer?',
				content:html,
				orientation:'full',
				button:false
			})
		})
	}
}
function repetirMission(lose_life){
	var final_game = false
	if(lose_life==null&&lose_life==undefined){
		total_vidas--
		if(total_vidas<0){
			final_game = true
		}else{
			vidas_txt.innerHTML = total_vidas
		}
	}else{
		//no quita vidas
		console.log("no quita vidas")
	}

	if(!final_game){
		if(m==1){
			unsetModal(function(){
				setCargador2({callBack:function(){
					setMission(true)
					unsetCargador2()
				}})
			})
		}else if(m==2){
			unsetModal(function(){
				setCargador2({callBack:function(){
					//poner todo a cuando terminó la primera
					setMission(true)
					unsetCargador2()
				}})
			})
		}else if(m==3){
			unsetModal(function(){
				setCargador2({callBack:function(){
					//poner todo a cuando terminó la primera
					setMission(true)
					unsetCargador2()
				}})
			})
		}else if(m==4){
			unsetModal(function(){
				setCargador2({callBack:function(){
					//poner todo a cuando terminó la primera
					setMission(true)
					unsetCargador2()
				}})
			})
		}else if(m==5){
			unsetModal(function(){
				setCargador2({callBack:function(){
					//poner todo a cuando terminó la primera
					setMission(true)
					unsetCargador2()
				}})
			})
		}
	}else{
		unsetModal(function(){
			setModal({
				close:false,
				title:'¡Lo sentimos!',
				content:'<p>Se han agotado todas las oportunidades, vuelve a comenzar</p>',
				button:true,
				value:'aceptar',
				action:'irInicio'
			})
		})
	}
}
function continueMission(){
	if(m==1){
		//no comprobar nada, mostrar modal
		mision1.aprobarMision()
	}else if(m==2){
		//si comprobar
		if(mision2.approved){
			mision2.aprobarMision()
		}else{
			mision2.fallarMision(false)
		}		
	}else if(m==3){
		//si comprobar
		if(mision3.failed){
			//casi lo atropeya
			mision3.fallarMision(false)
		}else{
			mision3.aprobarMision()
		}
	}else if(m==4){
		//no comprobar nada, mostrar modal
		mision4.aprobarMision()
	}else if(m==5){
		//no comprobar nada, mostrar modal
		mision5.aprobarMision()
	}
}
function nextMission(){
	unsetModal(function(){
		if(m==1){
			mision1.cleanMision()
		}else if(m==2){
			mision2.cleanMision()
		}else if(m==3){
			mision3.cleanMision()
		}else if(m==4){
			mision4.cleanMision()
		}else if(m==5){
			mision5.cleanMision()
		}
		m++
		if(m>4){
			getE('cargador').className = 'cargador-on'

			animation_start = setTimeout(function(){
				clearInterval(animation_start)
				animation_start = null

				ganarJuego()
			},1000)
		}else{
			setMission(false)
		}
	})
}
function cleanMission(walls){
	piso.innerHTML = ''
	piso_2.innerHTML = ''
	//no limpiar este↓
	//mission.innerHTML = ''
	top_speed = 3//dejar en default
	
	piso_data.elementos = []
}

animation_pitos = null
function setPitos(){
	if(m==2){
		pitos = [pito1_mp3,pito_largo_mp3]
	}else if(m==4){
		pitos = [pito1_mp3,pito2_mp3,pito3_mp3,pito_largo_mp3,pito_camion_mp3]
	}else if(m==5){
		pitos = [pito1_mp3,pito2_mp3,pito3_mp3,pito_largo_mp3,pito_camion_mp3]
	}

	if(pitos.length>0){
		setPito()
	}
}
function unsetPitos(){
	clearTimeout(animation_pitos)
	animation_pitos = null
}

var pitos = []
function setPito(){
	var tiempo_pito = 0
	if(ismobile){
		tiempo_pito = 4
	}else{
		tiempo_pito = parseInt(getRand(1,4))*1000
	}
	
	animation_pitos = setTimeout(function(){
		clearTimeout(animation_pitos)
		animation_pitos = null

		pi = getRand(0,(pitos.length-1))
		pitos[pi].currentTime = 0
		pitos[pi].volume = 0.5
		pitos[pi].play()

		setPito()
	},tiempo_pito)
}

////metro////
function putMetro(){
	var metro = document.createElement('div')
	metro.setAttribute('id','metro')
	metro.className = 'metro-off'
	metro.setAttribute('type','metro')
	piso.appendChild(metro)
	piso_data.elementos.push(metro)
}
function setMetro(){
	getE('metro').className = 'metro-on'
}

///////////EVENTOS DEL TECLADO///////////
var avatar = getE('avatar')
var auto = getE('avatar-clip')
var auto2 = getE('avatar-atropeyado')
var avatar_data = {
	left:0,
	top:0,
	width:50,
	height:50,
	area:8,//para las paredes
	rotacion:0,
	direccion:'left',
	subarea:8,//para objetos en movimiento y conos
	llaves:[],
	premios:[]
}
updateRotationCar('+',90,'left')
var avatar_speed = 0
var avatar_aceleration = 0.2
var top_speed = 3
var animacion_avatar = null
var animacion_avatar_2 = null//animacion para animar el avatar detras de escena
var animacion_colisiones = null

var direccion_x = null
var direccion_y = null
var direccion_right = false
var direccion_left = false
var direccion_up = false
var direccion_down = false

function addEvents(){
	if(ismobile){
		getE('keys-pad-cont').className = 'keys-pad-on keys-pad-show'
		getE('key-pad-left').addEventListener('touchstart',downKeyPad,false)
		getE('key-pad-right').addEventListener('touchstart',downKeyPad,false)
		getE('key-pad-up').addEventListener('touchstart',downKeyPad,false)
		getE('key-pad-down').addEventListener('touchstart',downKeyPad,false)

		getE('key-pad-left').addEventListener('touchend',upKeyPad,false)
		getE('key-pad-right').addEventListener('touchend',upKeyPad,false)
		getE('key-pad-up').addEventListener('touchend',upKeyPad,false)
		getE('key-pad-down').addEventListener('touchend',upKeyPad,false)
		key_pad_pressed = null
		key_pad_pressed_code = 0
	}else{
		window.addEventListener('keydown',downTecla, false)
		window.addEventListener('keyup',upTecla, false)
		//document.addEventListener("visibilitychange", onchange);
		//window.addEventListener('mouseout',focusOut, false)
	}
	animacion_colisiones = setInterval(preDetectCollision,20)
	avatar_moving = true
	animacion_avatar = setInterval(moveAvatar,20)
}
function removeEvents(){
	clearInterval(animacion_colisiones)
	animacion_colisiones = null
	
	if(ismobile){
		getE('keys-pad-cont').className = 'keys-pad-on keys-pad-hide'
		getE('key-pad-left').removeEventListener('touchstart',downKeyPad,false)
		getE('key-pad-right').removeEventListener('touchstart',downKeyPad,false)
		getE('key-pad-up').removeEventListener('touchstart',downKeyPad,false)
		getE('key-pad-down').removeEventListener('touchstart',downKeyPad,false)

		getE('key-pad-left').removeEventListener('touchend',upKeyPad,false)
		getE('key-pad-right').removeEventListener('touchend',upKeyPad,false)
		getE('key-pad-up').removeEventListener('touchend',upKeyPad,false)
		getE('key-pad-down').removeEventListener('touchend',upKeyPad,false)

		getE('key-pad-left').className = ''
		getE('key-pad-right').className = ''
		getE('key-pad-up').className = ''
		getE('key-pad-down').className = ''

		key_pad_pressed = null
		key_pad_pressed_code = 0
	}else{
		window.removeEventListener('keydown',downTecla, false)
		window.removeEventListener('keyup',upTecla, false)
	}	

	direccion_right = false
	direccion_left = false
	direccion_up = false
	direccion_down = false

	avatar_speed = 0
	clearInterval(animacion_avatar)
	avatar_moving = false
	avatar_caminando = false
	spdStopAnimation(0)
}

function focusOut(){
	getE('focus-msg').className = 'focus-on'
}
function focusOn(){
	getE('focus-msg').className = 'focus-off'
}

var key_pressed = null

function downTecla(e){
	//console.log(e.keyCode)
	//console.log("llamando")
	var put_events = false
	var new_key = null

	var direccion_actual = ''
	var direccion_pressed = ''
	direccion_actual = avatar_data.direccion
		
	if(e.keyCode==37){
		//izquierda
		direccion_left = true
		direccion_right = false
		direccion_up = false
		direccion_down = false
		new_key = 'left'

		put_events = true
		avatar.className = 'avatar-left'
		direccion_pressed = new_key
	}else if(e.keyCode==39){
		//derecha
		direccion_left = false
		direccion_right = true
		direccion_up = false
		direccion_down = false
		new_key = 'right'

		put_events = true
		avatar.className = 'avatar-right'
		direccion_pressed = new_key
	}else if(e.keyCode==38){
		//arriba
		direccion_left = false
		direccion_right = false
		direccion_up = true
		direccion_down = false
		new_key = 'up'
		
		put_events = true
		avatar.className = 'avatar-up'
		direccion_pressed = new_key
	}else if(e.keyCode==40){
		//abajo
		direccion_left = false
		direccion_right = false
		direccion_up = false
		direccion_down = true
		new_key = 'down'

		put_events = true
		avatar.className = 'avatar-down'
		direccion_pressed = new_key
	}

	//si ya hay una tecla presionada, resetear velocidad
	if(new_key!=key_pressed){
		//nueva tecla
		//console.log("nueva tecla")
		avatar_speed = 0
	}
	key_pressed = new_key

	if(put_events){
		if(!avatar_caminando){
			avatar_caminando = true
			//console.log("pone")
			//spdPlayAnimation({frame:1,stop:0,loop:true},0)
			//window.removeEventListener('keydown',downTecla, false)

			//console.log(direccion_pressed,direccion_actual)
			if(direccion_actual=='left'){
				if(direccion_pressed=='right'){updateRotationCar('+',180,direccion_pressed)}
				else if(direccion_pressed=='down'){updateRotationCar('-',90,direccion_pressed)}
				else if(direccion_pressed=='up'){updateRotationCar('+',90,direccion_pressed)}
				else{arrancar_mp3.currentTime = 0;arrancar_mp3.play()}
			}
			else if(direccion_actual=='right'){
				if(direccion_pressed=='left'){updateRotationCar('-',180,direccion_pressed)}
				else if(direccion_pressed=='down'){updateRotationCar('+',90,direccion_pressed)}
				else if(direccion_pressed=='up'){updateRotationCar('-',90,direccion_pressed)}
				else{arrancar_mp3.currentTime = 0;arrancar_mp3.play()}
			}
			else if(direccion_actual=='up'){
				if(direccion_pressed=='right'){updateRotationCar('+',90,direccion_pressed)}
				else if(direccion_pressed=='left'){updateRotationCar('-',90,direccion_pressed)}
				else if(direccion_pressed=='down'){updateRotationCar('+',180,direccion_pressed)}
				else{arrancar_mp3.currentTime = 0;arrancar_mp3.play()}
			}
			else if(direccion_actual=='down'){
				if(direccion_pressed=='right'){updateRotationCar('-',90,direccion_pressed)}
				else if(direccion_pressed=='left'){updateRotationCar('+',90,direccion_pressed)}
				else if(direccion_pressed=='up'){updateRotationCar('-',180,direccion_pressed)}
				else{arrancar_mp3.currentTime = 0;arrancar_mp3.play()}
			}
		}
	}
}

function upTecla(e){
	if(e.keyCode==37){
		//izquierda
		direccion_left = false
		
	}if(e.keyCode==39){
		//derecha
		direccion_right = false
		
	}
	if(e.keyCode==38){
		//arriba
		direccion_up = false

	}
	if(e.keyCode==40){
		//abajo
		direccion_down = false
		
	}
	if(!direccion_left&&!direccion_right&&!direccion_up&&!direccion_down){
		//window.addEventListener('keydown',downTecla, false)
		avatar_speed = 0
		avatar_caminando = false
		//spdStopAnimation(0)
	}
}

var movex = 1
var movey = 1
var avatar_moving = false
var avatar_caminando = false

function moveAvatar(back){
	if(
		direccion_left==true||
		direccion_right==true||
		direccion_up==true||
		direccion_down==true
	){
		if(back==undefined||back==null){
			back = false
		}
		//console.log("back: "+back)
		
		var new_left = 0
		var check_collision = null

		if(direccion_left&&!direccion_right){
			if(movex==1){
				new_left = avatar_data.left-avatar_speed
				if(new_left<0){
					new_left = 0
				}
				if(
					new_left<(game_width/2)&&
					piso_data.left==(0-(piso_data.width-game_width))
				){
					movex = 2
				}
			}
			if(movex==2){
				new_left = piso_data.left+avatar_speed
				if(new_left>0){
					piso.style.left = '0px'
					paredes.style.left = '0px'
					piso_2.style.left = '0px'
					mission.style.left = '0px'
					piso_data.left = 0
					movex = 1
					new_left = (game_width/2)
				}
			}

			if(movex==1){
				if(back){
					avatar.style.left = new_left+'px'
					avatar_data.left = new_left
				}else{
					check_collision = checkCollision(new_left,null,true,back)
					if(!check_collision.collision){
						avatar.style.left = new_left+'px'
						avatar_data.left = new_left
					}
				}
			}else if(movex==2){
				if(back){
					piso.style.left = new_left+'px'
					paredes.style.left = new_left+'px'
					piso_2.style.left = new_left+'px'
					mission.style.left = new_left+'px'
					piso_data.left = new_left
				}else{
					check_collision = checkCollision(new_left,null,false,back)
					if(!check_collision.collision){
						piso.style.left = new_left+'px'
						paredes.style.left = new_left+'px'
						piso_2.style.left = new_left+'px'
						mission.style.left = new_left+'px'
						piso_data.left = new_left
					}
				}
			}	
		}
		else if(!direccion_left&&direccion_right){
			if(movex==1){
				new_left = avatar_data.left+avatar_speed
				if(
					new_left>(game_width/2)&&
					piso_data.left==0
				){
					avatar.style.left = (game_width/2)+'px'
					avatar_data.left = (game_width/2)
					movex = 2
				}
				if(new_left>(game_width-avatar_data.width)){
					new_left = (game_width-avatar_data.width)
				}
			}
			if(movex==2){
				new_left = piso_data.left-avatar_speed
				if(new_left<(0-(piso_data.width-game_width))){
					piso.style.left = (0-(piso_data.width-game_width))+'px'
					paredes.style.left = (0-(piso_data.width-game_width))+'px'
					piso_2.style.left = (0-(piso_data.width-game_width))+'px'
					mission.style.left = (0-(piso_data.width-game_width))+'px'
					piso_data.left = (0-(piso_data.width-game_width))
					movex = 1
					new_left = (game_width/2)
				}
			}

			if(movex==1){
				if(back){
					avatar.style.left = new_left+'px'
					avatar_data.left = new_left	
				}else{
					check_collision = checkCollision(new_left,null,true,back)
					if(!check_collision.collision){
						avatar.style.left = new_left+'px'
						avatar_data.left = new_left	
					}
				}	
			}else if(movex==2){
				if(back){
					piso.style.left = new_left+'px'
					paredes.style.left = new_left+'px'
					piso_2.style.left = new_left+'px'
					mission.style.left = new_left+'px'
					piso_data.left = new_left
				}else{
					check_collision = checkCollision(new_left,null,false,back)
					if(!check_collision.collision){
						piso.style.left = new_left+'px'
						paredes.style.left = new_left+'px'
						piso_2.style.left = new_left+'px'
						mission.style.left = new_left+'px'
						piso_data.left = new_left
					}
				}
			}	
		}

		var new_top = 0
		
		if(direccion_up&&!direccion_down){
			if(movey==1){
				new_top = avatar_data.top-avatar_speed
				if(new_top<0){
					new_top = 0
				}
				if(
					new_top<(game_height/2)&&
					piso_data.top==(0-(piso_data.height-game_height))
				){
					movey = 2
				}
			}

			if(movey==2){
				new_top = piso_data.top+avatar_speed
				if(new_top>0){
					piso.style.top = '0px'
					paredes.style.top = '0px'
					piso_2.style.top = '0px'
					mission.style.top = '0px'
					piso_data.top = 0
					movey = 1
					new_top = (game_height/2)
				}
			}
			
			if(movey==1){
				if(back){
					avatar.style.top = new_top+'px'
					avatar_data.top = new_top
				}else{
					check_collision = checkCollision(null,new_top,true,back)
					if(!check_collision.collision){
						avatar.style.top = new_top+'px'
						avatar_data.top = new_top
					}
				}
					
			}else if(movey==2){
				check_collision = checkCollision(null,new_top,false,back)
				if(!check_collision.collision){
					piso.style.top = new_top+'px'
					paredes.style.top = new_top+'px'
					piso_2.style.top = new_top+'px'
					mission.style.top = new_top+'px'
					piso_data.top = new_top
				}
			}
		}
		else if(!direccion_up&&direccion_down){
			if(movey==1){
				new_top = avatar_data.top+avatar_speed
				if(
					new_top>(game_height/2)&&
					piso_data.top==0
				){
					avatar.style.top = (game_height/2)+'px'
					avatar_data.top = (game_height/2)
					movey = 2
				}
				if(new_top>(game_height-avatar_data.height)){
					new_top = (game_height-avatar_data.height)
				}
			}
			if(movey==2){
				new_top = piso_data.top-avatar_speed
				if(new_top<(0-(piso_data.height-game_height))){
					piso.style.top = (0-(piso_data.height-game_height))+'px'
					paredes.style.top = (0-(piso_data.height-game_height))+'px'
					piso_2.style.top = (0-(piso_data.height-game_height))+'px'
					mission.style.top = (0-(piso_data.height-game_height))+'px'
					piso_data.top = (0-(piso_data.height-game_height))
					movey = 1
					new_top = (game_height/2)
				}
			}

			if(movey==1){
				if(back){
					avatar.style.top = new_top+'px'
					avatar_data.top = new_top
				}else{
					check_collision = checkCollision(null,new_top,true,back)
					if(!check_collision.collision){
						avatar.style.top = new_top+'px'
						avatar_data.top = new_top
					}
				}
					
			}else if(movey==2){
				if(back){
					piso.style.top = new_top+'px'
					paredes.style.top = new_top+'px'
					piso_2.style.top = new_top+'px'
					mission.style.top = new_top+'px'
					piso_data.top = new_top
				}else{
					check_collision = checkCollision(null,new_top,false,back)
					if(!check_collision.collision){
						piso.style.top = new_top+'px'
						paredes.style.top = new_top+'px'
						piso_2.style.top = new_top+'px'
						mission.style.top = new_top+'px'
						piso_data.top = new_top
					}
				}
			}
		}
		
		avatar_speed+=avatar_aceleration
		if(avatar_speed>top_speed){
			avatar_speed = top_speed
		}
	}
}

function moveAvatar2(){
	
}

var partial_x = undefined
var partial_y = undefined
var partial_a = undefined
var partial_b = undefined

function preDetectCollision(){
	var colli = false
	var colli_obj = null
	var detect_collision1 = detectCollision(false,false)
	colli_obj = detect_collision1
	if(!detect_collision1.stop){
		var detect_collision2 = detectCollision(true,false)
		colli_obj = detect_collision2
		if(!detect_collision2.stop){

		}else{
			colli = true
		}
	}else{
		colli = true
	}
	
	if(colli){
		removeEvents()
		if(colli_obj.type=='punto-bueno'){
			//seguir con la misión
			continueMission()
		}else if(colli_obj.type=='punto-malo'){
			//seguir con la misión
			mision1.fallarMision()
		}else if(colli_obj.type=='punto'){
			//seguir con la misión
			continueMission()
		}

		else if(colli_obj.type=='carro-m2'){
			//atropeyar
			colli_obj.params[0].classList.add('carro-m2-chocado')
			mision2.fallarMision(true)
		}
		else if(colli_obj.type=='viejito'){
			//atropeyar
			colli_obj.params[0].classList.add('viejito-dead-3')
			mision3.fallarMision(true)
		}
		else if(colli_obj.type=='carro-m4'){
			//atropeyar
			colli_obj.params[0].classList.add('carro-m4-chocado')
			mision4.fallarMision()
		}else if(colli_obj.type=='carro-m5'){
			//atropeyar
			colli_obj.params[0].classList.add('carro-m5-chocado')
			mision5.fallarMision()
		}
	}else{
		//si no hay colision miremos que no vaya a ser que esté tocando el pare en la mision 2
		if(m==2){
			if(colli_obj.type=='pare'){
				mision2.setAnimacionPare()
			}else{
				mision2.unsetAnimacionPare()
			}
		}else if(m==3){
			if(colli_obj.type=='zebra'){
				mision3.startViejito()
			}else if(colli_obj.type=='zona'){
				if(!mision3.failed&&!mision3.approved){
					mision3.failed = true
					frenar_mp3.currentTime = 0
					frenar_mp3.play()
					setMensaje2({content:'<p>¡¡Tenga más cuidado!!</p>',delay:1000})
				}
			}
		}
	}	
}

//para objetos en movimiento
function detectCollision(a,b){
	var x = null
	var y = null
	
	var collision = false
	//comprobar colision

	var a_rect = null
	var dif_piso_x = 0
	var dif_piso_y = 0
	var rect_parent = paredes.getBoundingClientRect()
	//esto esta bien

	if(a){
		if(x==null){
			x = avatar_data.left
		}
		if(y==null){
			y = avatar_data.top
		}
		dif_piso_x = 0-piso_data.left
		dif_piso_y = 0-piso_data.top
		a_rect = {
			x:(x+(avatar_data.width/2))+dif_piso_x,
			y:(y+(avatar_data.height/2))+dif_piso_y
		}
	}else{
		if(x==null){
			x = piso_data.left
		}
		if(y==null){
			y = piso_data.top
		}
		dif_piso_x = 0-x
		dif_piso_y = 0-y
		a_rect = {
			x:(avatar_data.left+(avatar_data.width/2))+dif_piso_x,
			y:(avatar_data.top+(avatar_data.height/2))+dif_piso_y
		}
	}
	
	var type = ''
	var element = null
	var rect_element = null
	var stop = null
	
	var params = []

	if(!b){//si esta detras de camaras, no detectar colisiones con objetos
		
		for(var c = 0;c<piso_data.elementos.length;c++){
			var rect = piso_data.elementos[c].getBoundingClientRect()
			var pre_type = piso_data.elementos[c].getAttribute('type')
			
			var rect_elemento = rect_elemento = {
				w:piso_data.elementos[c].offsetWidth,
				h:piso_data.elementos[c].offsetHeight,
				x:(rect.left-rect_parent.left),
				y:(rect.top-rect_parent.top)
			}
			
			if(pre_type=='carro-m4'||pre_type=='carro-m5'){
				//rect mas pequeño
				var data_size = mision4.getArea(piso_data.elementos[c].id)
				//console.log(data_size)
				var ww = parseInt((piso_data.elementos[c].offsetWidth*data_size.areax)/100)
				var hh = parseInt((piso_data.elementos[c].offsetHeight*data_size.areay)/100)
				var restax = (100-data_size.areax)/2
				var restay = (100-data_size.areay)/2
				var xx = parseInt((piso_data.elementos[c].offsetWidth*restax)/100)
				var yy = parseInt((piso_data.elementos[c].offsetHeight*restay)/100)
				rect_elemento = {
					w:ww,
					h:hh,
					x:(rect.left-rect_parent.left)+xx,
					y:(rect.top-rect_parent.top)+yy
				}
			}
			
			if(
				(a_rect.x+avatar_data.subarea)>=rect_elemento.x&&
				(a_rect.x-avatar_data.subarea)<=(rect_elemento.x+rect_elemento.w)&&
				(a_rect.y+avatar_data.subarea)>=rect_elemento.y&&
				(a_rect.y-avatar_data.subarea)<=(rect_elemento.y+rect_elemento.h)
			){
				//colision
				type = piso_data.elementos[c].getAttribute('type')
				element = piso_data.elementos[c]
				collision = true
				rect_element = rect_elemento
			}
		}

		if(type=='carro-m2'){
			stop = true
			params[0] = element
		}else if(type=='carro-m4'){
			stop = true
			params[0] = element
		}else if(type=='carro-m5'){
			stop = true
			params[0] = element
		}else if(type=='punto-bueno'){
			stop = true
		}else if(type=='punto-malo'){
			stop = true
		}else if(type=='punto'){
			stop = true
		}else if(type=='pare'){
			//stop = true
		}else if(type=='zebra'){
			//stop = true
		}else if(type=='zona'){
			//stop = true
		}else if(type=='viejito'){
			stop = true
			params[0] = element
		}
	}

	return {collision:collision,stop:stop,params:params,type:type}
}

//para paredes y conos
function checkCollision(x,y,a,b){
	var collision = false
	//comprobar colision

	var a_rect = null
	var dif_piso_x = 0
	var dif_piso_y = 0
	var rect_parent = paredes.getBoundingClientRect()
	//esto esta bien

	if(a){
		if(x==null){
			x = avatar_data.left
		}
		if(y==null){
			y = avatar_data.top
		}
		dif_piso_x = 0-piso_data.left
		dif_piso_y = 0-piso_data.top
		a_rect = {
			x:(x+(avatar_data.width/2))+dif_piso_x,
			y:(y+(avatar_data.height/2))+dif_piso_y
		}
	}else{
		if(x==null){
			x = piso_data.left
		}
		if(y==null){
			y = piso_data.top
		}
		dif_piso_x = 0-x
		dif_piso_y = 0-y
		a_rect = {
			x:(avatar_data.left+(avatar_data.width/2))+dif_piso_x,
			y:(avatar_data.top+(avatar_data.height/2))+dif_piso_y
		}
	}
	
	if(!b){//si esta detras de camaras, no detectar colisiones con paredes
		for(var c = 0;c<piso_data.paredes.length;c++){
			var rect = piso_data.paredes[c].getBoundingClientRect()
			var rect_pared = {
				w:rect.width,
				h:rect.height,
				x:(rect.left-rect_parent.left),
				y:(rect.top-rect_parent.top)
			}

			var avatar_data_areax = avatar_data.area
			var avatar_data_areay = avatar_data.area
			/*if(avatar_data.direccion=='left'||avatar_data.direccion=='right'){
				avatar_data_areax = 25
				avatar_data_areay = 5
			}else{
				avatar_data_areax = 5
				avatar_data_areay = 25
			}*/
			//console.log(avatar_data_areax,avatar_data_areay)

			if(
				(a_rect.x+avatar_data_areax)>=rect_pared.x&&
				(a_rect.x-avatar_data_areax)<=(rect_pared.x+rect_pared.w)&&
				(a_rect.y+avatar_data_areay)>=rect_pared.y&&
				(a_rect.y-avatar_data_areay)<=(rect_pared.y+rect_pared.h)
			){
				//colision
				//type = 'pared'
				collision = true
				//console.log("colision con "+c)
			}
		}
	}
	
	var type = ''
	var element = null
	var rect_element = null
	var stop = null
	
	var params = []

	if(!b){//si esta detras de camaras, no detectar colisiones con conos
		
		for(var c = 0;c<piso_data.elementos.length;c++){
			var rect = piso_data.elementos[c].getBoundingClientRect()
			var pre_type = piso_data.elementos[c].getAttribute('type')
			if(
				pre_type=='cono-m1'||
				pre_type=='cono-m2'||
				pre_type=='cono-m3'||
				pre_type=='cono-m4'||
				pre_type=='cono-m5'
			){
				var rect_elemento = rect_elemento = {
					w:piso_data.elementos[c].offsetWidth,
					h:piso_data.elementos[c].offsetHeight,
					x:(rect.left-rect_parent.left),
					y:(rect.top-rect_parent.top)
				}
				
				if(
					(a_rect.x+avatar_data.subarea)>=rect_elemento.x&&
					(a_rect.x-avatar_data.subarea)<=(rect_elemento.x+rect_elemento.w)&&
					(a_rect.y+avatar_data.subarea)>=rect_elemento.y&&
					(a_rect.y-avatar_data.subarea)<=(rect_elemento.y+rect_elemento.h)
				){
					//colision
					type = piso_data.elementos[c].getAttribute('type')
					element = piso_data.elementos[c]
					collision = true
					rect_element = rect_elemento
				}
			}
		}

		if(type=='cono-m1'){
			//stop = null
			params = []
			type = ''
			setMensaje({content:'<p>No puedo pasar por aquí</p>',delay:1000})
		}else if(type=='cono-m2'){
			//stop = null
			params = []
			type = ''
			setMensaje({content:'<p>No puedo pasar por aquí</p>',delay:1500})
		}else if(type=='cono-m3'){
			//stop = null
			params = []
			type = ''
			setMensaje({content:'<p>No puedo pasar por aquí</p>',delay:1500})
		}else if(type=='cono-m4'){
			//stop = null
			params = []
			type = ''
			setMensaje({content:'<p>No puedo pasar por aquí</p>',delay:2000})
		}else if(type=='cono-m5'){
			//stop = null
			params = []
			type = ''
		}
	}

	return {collision:collision,stop:stop,params:params,type:type}
}


////////////////////////////////////////////////////////////////

function ganarJuego(){
	game_scene.style.visibility = 'hidden'
	getE('home-scene').style.display = 'block'

	getE('cargador').className = 'cargador-off'

	ganar_mp3.play()
	//final
	setModal({
		close:false,
		title:'¡Felicidades!',
		content:'<p>Has completado el juego con Juan el conductor. Ya eres un experto en normas de tránsito</p>',
		button:true,
		value:'aceptar',
		orientation:'left',
		action:'irInicio'
	})
}

//terminar juego por el tiempo o porque perdió
function endGame(){
	
}

function verAyuda(){
	setInstrucciones(false)
}
function getE(idname){
	return document.getElementById(idname)
}
function irInicio(){
	location.reload()
}