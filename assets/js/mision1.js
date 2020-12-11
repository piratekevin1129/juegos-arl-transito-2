var mision1 = {
	init:{x:430,y:624},
	//init:{x:1042,y:504},
	conos:[
		{x:170,y:356},
		{x:201,y:356},
		{x:232,y:356},
		{x:265,y:356},
		{x:296,y:356},
	],
	title:'Prueba 1: Parqueando el auto',
	test:String('<p>En esta prueba deberás ir al banco y estacionarte en la zona correcta.</p><br /><h6>Objetivos:</h6><p class="modal-content-list">Conduce con cuidado y evita conducir sobre las aceras.</p><p class="modal-content-list">Procura no equivocarte o perderás una oportunidad.<p>'),
	carros:[],
	animacion_espera:null,
	fallarMision:function(){
		var frase = '<p>No puedes estacionarte en este lugar.</p>'
		//console.log("atropeyar")
		
		//parar animaciones
		for(var i = 0;i<mision1.carros.length;i++){
			mision1.carros[i].stopAnimation(i)
		}

		mision1.animacion_espera = setTimeout(function(){
			clearTimeout(mision1.animacion_espera)
			mision1.animacion_espera = null
			setModal({
				close:false,
				title:'¡Muy mal Juan!',
				content:frase,
				button:true,
				value:'repetir',
				action:'repetirMission'
			})
		},500)	
		
	},
	aprobarMision:function(){
		var frase = '<p>Debes estacionarte en los lugares indicados.</p>'

		//parar animaciones
		for(var i = 0;i<mision1.carros.length;i++){
			mision1.carros[i].stopAnimation(i)
		}

		mision1.animacion_espera = setTimeout(function(){
			clearTimeout(mision1.animacion_espera)
			mision1.animacion_espera = null

			setModal({
				close:false,
				title:'¡Muy bien Juan!',
				content:frase,
				button:true,
				value:'continuar',
				action:'nextMission'
			})
		},500)
	},
	cleanMision:function(){
		cleanMission()
	}
}

function animacionCarro(ind){
	//console.log("aqui")
	getE(mision1.carros[ind].name).style.left = mision1.carros[ind].animation_data[mision1.carros[ind].frame].x+'px'
	getE(mision1.carros[ind].name).style.top = mision1.carros[ind].animation_data[mision1.carros[ind].frame].y+'px'
	mision1.carros[ind].frame++
	if(mision1.carros[ind].frame==mision1.carros[ind].animation_data.length){
		mision1.carros[ind].frame = 0
		mision1.startAnimationSemaforo()
	}
	//if(ind==0){
		//console.log("running "+ind)
	//}
	
}

function initMision1(){

}






















