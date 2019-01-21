
// function para verificar  se há texto 
function textoValido(texto){
	if (texto == null || texto == "" || texto.length < 1) {
		return false;
	} else {
		return true;
	}
}


function mostrarError(){
	var html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += 'Please insert a thing';
	html += '</div>';

	document.getElementById('error').innerHTML = html;

}

// function para limpar o error
function limparError()
{
	setTimeout(function(){document.getElementById('error').innerHTML = "";}, 2000);	
}


// function para criar o lembrete
function criarLembrete(){
	var conteudoTextArea = document.getElementById("texto").value;
	if(!textoValido(conteudoTextArea)){
		mostrarError();

	}

	limparError();

	// criar  as variaveis para tempo
	var referencia = new Date();
	var id = referencia.getTime();
	var data = referencia.toLocaleDateString();
	var texto = conteudoTextArea;

	//JSON
	var recordatorio = {"id": id, "data": data,"texto": texto};

	//função para comprovar se existe lembrete
	comprovarRecordatorio(recordatorio);
}

//funcao para validar recordatorio
function recordatorioValido(recordatoriosExistentes){
	if(recordatoriosExistentes == null || recordatoriosExistentes == ""  || typeof recordatoriosExistentes == "undefined" || recordatoriosExistentes == "undefined"){
		return false;
	}else {
		return true;
	}

}


//função para comprovar se existe lembrete
function comprovarRecordatorio(recordatorio){
	var recordatoriosExistentes = localStorage.getItem("recordatorios");
	if(!recordatorioValido(recordatoriosExistentes)){
		var recordatorios = [];
		recordatorios.push(recordatorio);


		//Save recordatorio
		saveRecordatorios(recordatorios);

	}else {
		var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
		//save recordatorio
		recordatoriosRecuperados.push(recordatorio);
		saveRecordatorios(recordatoriosRecuperados);
	}

	mostrarRecordatorios();
}



//funcao  save lembrete ou recordatorio
function saveRecordatorios(recordatorios){
	var recordatorioJSON = JSON.stringify(recordatorios);
	localStorage.setItem("recordatorios",recordatorioJSON);

}


//funcao  para exibir os itens
function mostrarRecordatorios() {
	var  html = "";

	var recordatoriosExistentes = localStorage.getItem("recordatorios");
	if(!recordatorioValido(recordatoriosExistentes)){

		html = "Não existe nenhum  lembrete!";

		document.getElementById("recordatorios").innerHTML = html;
	} else{
		var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
		for (var i = 0;  i < recordatoriosRecuperados.length; i++) {

			html += formatarRecordatorio(recordatoriosRecuperados[i]);
		}
		document.getElementById("recordatorios").innerHTML = html;
	}

	var classname = document.getElementsByClassName("fa-window-close");

	Array.from(classname).forEach(function(element) {
      element.addEventListener('click', excluirElemento	);
    });

}

// função para exibir os lembretes 
function formatarRecordatorio(recordatorio){
	var html = "";
	html += '<div class="recordatorio" id="'+ recordatorio.id +'">';	
	html += '<div class="row">';
	html += '<div class="col-6 text-left">';	
	html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
	html += '</div>';
	html += '<div class="col-6 text-right">';	
	html += '<small><i class="fa fa-window-close" data-id="'+recordatorio.id+'" aria-hidden="true"></i></small>';	
	html += '</div>';
	html += '</div>';
	html += '<br>';
	html += '<div class="row">';
	html += '<div class="col-12">';
	html += recordatorio.texto;
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<br>';

	return html;

}

function excluirElemento(){	
	var excluirBtn = this;
	
	var recordatoriosExistentes = JSON.parse(localStorage.getItem("recordatorios"));
	var filtrado = recordatoriosExistentes.filter(function(x){if(x.id != excluirBtn.dataset.id){return x;}});
	
	///localStorage.removeItem("recordatorios");
	localStorage.clear();
	
	if(filtrado.length > 0){
		localStorage.setItem("recordatorios", JSON.stringify(filtrado));
	}
	mostrarRecordatorios();

}

// verificar se está tudo ok
document.addEventListener('DOMContentLoaded', function(){
	
	//mostrarError();

	document.getElementById("buttonSave").onclick = criarLembrete;	

	mostrarRecordatorios();

	

});





	



