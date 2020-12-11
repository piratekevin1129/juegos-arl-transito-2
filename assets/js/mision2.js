var mision2 = {
    init:{x:180,y:437},
    conos:[
		{x:187,y:239},
        {x:218,y:239},
        {x:249,y:239},
        {x:283,y:239},
        {x:133,y:307},
        {x:133,y:342}
	],
    title: 'Prueba 2: Zona de "PARE"',
    test:String('<p>En la siguiente prueba deberás ir a donde indica la flecha y esperar 3 segundos en la zona del pare antes de cruzar la calle.</p><br /><h6>Objetivos:</h6><p class="modal-content-list">Conduce con cuidado y evita conducir sobre las aceras.</p><p class="modal-content-list">Procura no equivocarte o perderás una oportunidad.</p>'),
    carros:[
        {
			id:1,
            name:'',
            size:{w:27,h:49},
			animation_data:[
                {x:777,y:-46},
                {x:777,y:-35.1},
                {x:777,y:-24.2},
                {x:777,y:-13.3},
                {x:777,y:-2.3},
                {x:777,y:8.6},
                {x:777,y:19.5},
                {x:777,y:30.4},
                {x:777,y:41.4},
                {x:777,y:52.3},
                {x:777,y:63.2},
                {x:777,y:74.1},
                {x:777,y:85.1},
                {x:777,y:96},
                {x:777,y:106.9},
                {x:777,y:117.8},
                {x:777,y:128.8},
                {x:777,y:139.7},
                {x:777,y:150.6},
                {x:777,y:161.5},
                {x:777,y:172.5},
                {x:777,y:183.4},
                {x:777,y:194.3},
                {x:777,y:205.2},
                {x:777,y:216.2},
                {x:777,y:227.1},
                {x:777,y:238},
                {x:777,y:248.9},
                {x:777,y:259.8},
                {x:777,y:270.8},
                {x:777,y:281.7},
                {x:777,y:292.6},
                {x:777,y:303.5},
                {x:777,y:314.5},
                {x:777,y:325.4},
                {x:777,y:336.3},
                {x:777,y:347.2},
                {x:777,y:358.2},
                {x:777,y:369.1},
                {x:777,y:380},
                {x:777,y:390.9},
                {x:777,y:401.9},
                {x:777,y:412.8},
                {x:777,y:423.7},
                {x:777,y:434.6},
                {x:777,y:445.6},
                {x:777,y:456.5},
                {x:777,y:467.4},
                {x:777,y:478.3},
                {x:777,y:489.3},
                {x:777,y:500.2},
                {x:777,y:511.1},
                {x:777,y:522},
                {x:777,y:532.9},
                {x:777,y:543.9},
                {x:777,y:554.8},
                {x:777,y:565.7},
                {x:777,y:576.6},
                {x:777,y:587.6},
                {x:777,y:598.5},
                {x:777,y:609.4},
                {x:777,y:620.3},
                {x:777,y:631.3},
                {x:777,y:642.2},
                {x:777,y:653.1},
                {x:777,y:664},
                {x:777,y:675},
                {x:777,y:685.9},
                {x:777,y:696.8},
                {x:777,y:707.7},
                {x:777,y:718.7},
                {x:777,y:729.6},
                {x:777,y:740.5},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4},
                {x:777,y:751.4}
            ],
			frame:0,
			animacion:null,
			startAnimation: function(ind){
				mision2.carros[ind].animacion = setInterval(function(){animacionCarro2(ind)},30)
			},
			stopAnimation:function(ind){
				clearInterval(mision2.carros[ind].animacion)
				mision2.carros[ind].animacion = null
			}
        },
        {
			id:2,
            name:'',
            size:{w:27,h:49},
			animation_data:[
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-44},
                {x:817,y:-33},
                {x:817,y:-21.9},
                {x:817,y:-10.8},
                {x:817,y:0.3},
                {x:817,y:11.4},
                {x:817,y:22.4},
                {x:817,y:33.5},
                {x:817,y:44.6},
                {x:817,y:55.7},
                {x:817,y:66.7},
                {x:817,y:77.8},
                {x:817,y:88.9},
                {x:817,y:100},
                {x:817,y:111},
                {x:817,y:122.1},
                {x:817,y:133.2},
                {x:817,y:144.3},
                {x:817,y:155.3},
                {x:817,y:166.4},
                {x:817,y:177.5},
                {x:817,y:188.6},
                {x:817,y:199.6},
                {x:817,y:210.7},
                {x:817,y:221.8},
                {x:817,y:232.9},
                {x:817,y:243.9},
                {x:817,y:255},
                {x:817,y:266.1},
                {x:817,y:277.2},
                {x:817,y:288.2},
                {x:817,y:299.3},
                {x:817,y:310.4},
                {x:817,y:321.5},
                {x:817,y:332.6},
                {x:817,y:343.6},
                {x:817,y:354.7},
                {x:817,y:365.8},
                {x:817,y:376.8},
                {x:817,y:387.9},
                {x:817,y:399},
                {x:817,y:410.1},
                {x:817,y:421.2},
                {x:817,y:432.2},
                {x:817,y:443.3},
                {x:817,y:454.4},
                {x:817,y:465.5},
                {x:817,y:476.5},
                {x:817,y:487.6},
                {x:817,y:498.7},
                {x:817,y:509.8},
                {x:817,y:520.8},
                {x:817,y:531.9},
                {x:817,y:543},
                {x:817,y:554.1},
                {x:817,y:565.1},
                {x:817,y:576.2},
                {x:817,y:587.3},
                {x:817,y:598.4},
                {x:817,y:609.4},
                {x:817,y:620.5},
                {x:817,y:631.6},
                {x:817,y:642.7},
                {x:817,y:653.7},
                {x:817,y:664.8},
                {x:817,y:675.9},
                {x:817,y:687},
                {x:817,y:698},
                {x:817,y:709.1},
                {x:817,y:720.2},
                {x:817,y:731.3},
                {x:817,y:742.4},
                {x:817,y:753.4}
            ],
			frame:0,
			animacion:null,
			startAnimation: function(ind){
				mision2.carros[ind].animacion = setInterval(function(){animacionCarro2(ind)},30)
			},
			stopAnimation:function(ind){
				clearInterval(mision2.carros[ind].animacion)
				mision2.carros[ind].animacion = null
			}
        }
    ],
    pare:false,
    approved:false,
    animacion_pare:null,
    animacion_pare_esperar:null,
    setAnimacionPare:function(){
        if(!mision2.pare&&!mision2.approved){
            console.log("set animacion pare")
            mision2.pare = true
            //hacemos la animacion
            var segundos = 3
            getE('contador-pare').innerHTML = segundos
            getE('contador-pare').className = 'contador-pare-on'
            mision2.animacion_pare = setTimeout(function(){
                clearTimeout(mision2.animacion_pare)
                mision2.animacion_pare = null
                getE('contador-pare').className = 'contador-pare-off'
                segundos--

                mision2.animacion_pare_esperar = setTimeout(function(){
                    clearTimeout(mision2.animacion_pare_esperar)
                    mision2.animacion_pare_esperar = null

                    getE('contador-pare').innerHTML = segundos
                    getE('contador-pare').className = 'contador-pare-on'
                   
                    mision2.animacion_pare = setTimeout(function(){
                        clearTimeout(mision2.animacion_pare)
                        mision2.animacion_pare = null
                        getE('contador-pare').className = 'contador-pare-off'
                        segundos--
        
                        mision2.animacion_pare_esperar = setTimeout(function(){
                            clearTimeout(mision2.animacion_pare_esperar)
                            mision2.animacion_pare_esperar = null
        
                            getE('contador-pare').innerHTML = segundos
                            getE('contador-pare').className = 'contador-pare-on'

                            mision2.animacion_pare = setTimeout(function(){
                                clearTimeout(mision2.animacion_pare)
                                mision2.animacion_pare = null
                                getE('contador-pare').className = 'contador-pare-off'
                                segundos--
                
                                mision2.animacion_pare_esperar = setTimeout(function(){
                                    clearTimeout(mision2.animacion_pare_esperar)
                                    mision2.animacion_pare_esperar = null
                
                                    getE('contador-pare').innerHTML = ''
                                    getE('contador-pare').className = 'contador-pare-off'
                                    mision2.approved = true
                                },100)
                            },1000)
                            
                        },100)
                    },1000)

                },100)
            },1000)
        }
    },
    unsetAnimacionPare:function(){
        if(mision2.pare&&!mision2.approved){
            mision2.pare = false
            //esta animando, paremosla
            clearTimeout(mision2.animacion_pare)
            mision2.animacion_pare = null
            clearTimeout(mision2.animacion_pare_esperar)
            mision2.animacion_pare_esperar = null

            getE('contador-pare').innerHTML = ''
            getE('contador-pare').className = 'contador-pare-off'
        }
    },
    fallarMision:function(crash){
        unsetPitos()
        var frase = '<p>Debes esperar 3 segundos para cruzar la calle en una zona de <span>PARE</span> para evitar accidentes</p>'
        //console.log("atropeyar")

        //parar animaciones
		for(var i = 0;i<mision2.carros.length;i++){
			mision2.carros[i].stopAnimation(i)
        }

        if(crash){
            avatar.classList.add('avatar-dead-2')
            atropeyar_mp3.play()

            getE('explosion-clip').className = 'spd_sprite explosion-clip-on'
            getE('explosion-clip').style.left = (avatar_data.left-(180/2))+'px'
            getE('explosion-clip').style.top = (avatar_data.top-(180/2))+'px'
            
            spdPlayAnimation({frame:1,stop:0,loop:false,callBack:function(){
                getE('explosion-clip').className = 'spd_sprite explosion-clip-off'
                setModal({
                    close:false,
                    title:'¡Muy mal Juan!',
                    content:frase,
                    button:true,
                    value:'repetir',
                    action:'repetirMission'
                })
            }},1)
        }else{
            setModal({
                close:false,
                title:'¡Muy mal Juan!',
                content:frase,
                button:true,
                value:'repetir',
                action:'repetirMission'
            })
        }
    },
    aprobarMision:function(){
        unsetPitos()
		//parar animaciones
		for(var i = 0;i<mision2.carros.length;i++){
			mision2.carros[i].stopAnimation(i)
        }

		var frase = '<p>En las zonas de <span>PARE</span> hay que esperar 3 segundos antes de avanzar y asi evitar accidentes.</p>'
		setModal({
			close:false,
			title:'¡Muy bien Juan!',
			content:frase,
			button:true,
			value:'continuar',
			action:'nextMission'
		})
	},
	cleanMision:function(){
        mision2.pare = false,
        mision2.approved = false,
		cleanMission()
	}
}

function animacionCarro2(ind){
    //console.log("aqui")
    var x = mision2.carros[ind].animation_data[mision2.carros[ind].frame].x-(mision2.carros[ind].size.w/2)
	var y = mision2.carros[ind].animation_data[mision2.carros[ind].frame].y-(mision2.carros[ind].size.h/2)
	getE(mision2.carros[ind].name).style.left = x+'px'
	getE(mision2.carros[ind].name).style.top = y+'px'
	mision2.carros[ind].frame++
	if(mision2.carros[ind].frame==mision2.carros[ind].animation_data.length){
		mision2.carros[ind].frame = 0
	}
}



















