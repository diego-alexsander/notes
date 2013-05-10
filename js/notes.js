$(function() {
	var itens = "";
	//fix para funcionar a edicao, add novamente o atributo draggable
	$('.item-notas').attr('draggable', 'true');
	//btn add notas
	$('.btn-add-notas').animate({'top':'-18px', 'opacity':'1'}, 1000);

	$('body').on("click", "#add-notas", function (event) {
		$('#notas').append('<li class="item-notas" draggable="true"><p class="cont-nota" contenteditable="true"></p></li>');

		//atualizo a qdt de itens na lista de notas
		itens = document.querySelectorAll('#notas li');

		[].forEach.call(itens, function(col) {
		  col.addEventListener('dragstart', handleDragStart, false);
		  col.addEventListener('dragenter', handleDragEnter, false)
		  col.addEventListener('dragover', handleDragOver, false);
		  col.addEventListener('dragleave', handleDragLeave, false);
		  col.addEventListener('drop', handleDrop, false);
		  col.addEventListener('dragend', handleDragEnd, false);
		});

	 });

	 $("body").on("click",".cont-nota", function(e){
		//fix para funcionar a edicao, removo o atributo draggable temporariamente
		$(this).parent().removeAttr('draggable');
	 }).focusout(function(){
		//fix para funcionar a edicao, add novamente o atributo draggable
		$('.item-notas').attr('draggable', 'true');
	 }).keypress(function() {
		//salvo as notas no localstorage
	    localStorage.setItem('cont', $("#notas").html());
	 });


	//se tiver algo no localstorage carregga na lista de notas
	if (localStorage.getItem('cont')) {
	    $("#notas").html(localStorage.getItem('cont'));
	}

	// apaga todos os dados do localstorage
    $("body").on("click","#limpar",function() {
    	$(".item-notas").fadeOut("slow", function (e) {
			$("#notas").empty();
			tit = 1;
    	});
	    localStorage.clear();
	    var local = window.location;
	    window.location = local;
	});

	// inicio drag-and-drop
	var dragSrcEl = null;

	function handleDragStart(e) {
	  // Target (this) element is the source node.
	  this.style.opacity = '0.4';

	  dragSrcEl = this;

	  e.dataTransfer.effectAllowed = 'move';
	  e.dataTransfer.setData('text/html', this.innerHTML);
	}

	function handleDragOver(e) {
	  if (e.preventDefault) {
	    e.preventDefault(); // Necessary. Allows us to drop.
	  }

	  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	  return false;
	}

	function handleDragEnter(e) {
	  // this / e.target is the current hover target.
	  this.classList.add('over');
	}

	function handleDragLeave(e) {
	  this.classList.remove('over');  // this / e.target is previous target element.
	}

	function handleDrop(e) {
	  // this/e.target is current target element.

	  if (e.stopPropagation) {
	    e.stopPropagation(); // Stops some browsers from redirecting.
	  }

	  // Don't do anything if dropping the same column we're dragging.
	  if (dragSrcEl != this) {
	    // Set the source column's HTML to the HTML of the columnwe dropped on.
	    dragSrcEl.innerHTML = this.innerHTML;
	    this.innerHTML = e.dataTransfer.getData('text/html');
		// //fix para funcionar a edicao, add novamente o atributo draggable
		$(this).removeAttr('draggable');
	  }

	  return false;
	}
	function handleDragEnd(e) {
	  this.style.opacity = '1';

	  // this/e.target is the source node.
	  [].forEach.call(itens, function (col) {
	    col.classList.remove('over');
	  });
	}
	$('#tutorial').on("click", function (e) {
		$('.tut-01').fadeIn(300).delay(2000).fadeOut(100, function (e) {
			$('.tut-02').fadeIn(300).delay(2000).fadeOut(100, function (e) {
				$('.tut-03').fadeIn(300).delay(2000).fadeOut(100)
			});
		});
	});
});