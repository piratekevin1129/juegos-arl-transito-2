var mision3 = {
    init:{x:844,y:323},
    conos:[
        {x:187,y:239},
        {x:218,y:239},
        {x:249,y:239},
        {x:283,y:239},
        {x:133,y:307},
        {x:133,y:342},
        {x:775,y:247},
        {x:806,y:247},
        {x:771,y:414},
        {x:802,y:414},
        {x:1224,y:414},
        {x:1255,y:414}
    ],
    title: 'Prueba 3: Zona de "Zebra"',
    test:String('<p>En la siguiente prueba deberás ir a donde indica la flecha y en la zebra que se encuentra allí debes esperar que los peatones crucen totalmente la calle.</p><br /><h6>Objetivos:</h6><p class="modal-content-list">Conduce con cuidado y evita conducir sobre las aceras.</p><p class="modal-content-list">Procura no equivocarte, o perderás una oportunidad.</p>'),
    carros:[],
    viejito_data:{
        x:1148,
        inity:279,
        y:0,
        frame:1.3
    },
    failed:false,
    approved:false,
    cruzando:false,
    animacion_viejito:null,
    startViejito:function(){
        if(!mision3.cruzando){
            console.log("animar viejito")
            //setMensaje({content:'<p>Es mejor esperar</p>',delay:1000})
            mision3.cruzando = true
            spdPlayAnimation({frame:1,stop:0,loop:true},0)
            mision3.viejito_data.y = mision3.viejito_data.inity
            mision3.animacion_viejito = setInterval(function(){
                mision3.viejito_data.y = mision3.viejito_data.y+mision3.viejito_data.frame
                getE('viejito').style.top = mision3.viejito_data.y+'px'
                if(mision3.viejito_data.y>400){
                    clearInterval(mision3.animacion_viejito)
                    mision3.animacion_viejito = null

                    mision3.approved = true
                    spdStopAnimation(0)
                }
            },40)
        }
    },
    fallarMision:function(atropeyar){
        var frase = '<p>En una zona de "Zebra" debes esperar a que los peatones crucen la calle para evitar accidentes</p>'
        //console.log("atropeyar")

        //parar por si acaso
        clearInterval(mision3.animacion_viejito)
        mision3.animacion_viejito = null

        if(atropeyar){
            avatar.classList.add('avatar-dead-3')
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
        //parar por si acaso
        clearInterval(mision3.animacion_viejito)
        mision3.animacion_viejito = null

        var frase = '<p>En las zonas de "Zebra" se debe esperar a que los peatones crucen la calle primero.</p>'
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
        cleanMission()
    },
    
}