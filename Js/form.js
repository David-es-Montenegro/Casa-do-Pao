function enviarFormulario() {
    var form = document.getElementById('meuFormulario');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://casadopao.pythonanywhere.com/login');
    xhr.onload = function () {
      var popup = document.getElementById('popup');
      var closeButton = document.querySelector('.close-button');
      var responseMessage = document.getElementById('responseMessage');
      
      responseMessage.textContent = xhr.responseText;
      popup.style.display = 'block';
      
      closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
      });
    };
    xhr.setRequestHeader('chave', 'teste');
    xhr.send(formData);
  }
  