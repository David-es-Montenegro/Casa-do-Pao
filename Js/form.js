function enviarFormulario() {
  var form = document.getElementById('meuFormulario');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/login');
  xhr.onload = function () {
    var popup = document.getElementById('popup');
    var closeButton = document.querySelector('.close-button');
    var responseMessage = document.getElementById('responseMessage');

    if (xhr.status === 200) {
      // Código 200 indica uma resposta bem-sucedida
      var response = JSON.parse(xhr.responseText);

      // Armazene a resposta no armazenamento local do navegador
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user);
      
      // Recupera os valores armazenados no armazenamento local
      var storedToken = localStorage.getItem('token');
      var storedUser = localStorage.getItem('user');

      window.location.href = "/index.html";
    } else if (xhr.status === 401) {
      // Código 401 indica uma resposta de autorização inválida
      responseMessage.textContent = "Erro de autorização. Por favor, faça login novamente.";
      popup.style.display = 'block';
    } else {
      // Outros códigos de status podem ser tratados aqui
      responseMessage.textContent = "Erro desconhecido.";
      popup.style.display = 'block';
    }

    closeButton.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  };
  xhr.setRequestHeader('chave', 'teste');
  xhr.send(formData);
}


  

  function fazerLogout() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://casadopao.pythonanywhere.com/logout');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('authorization', localStorage.getItem('token'));
    localStorage.removeItem('token');

    xhr.onload = function () {
        if (xhr.status === 200) {
            // Logout realizado com sucesso
            window.location.href = '/login.html'; // Redirecionar para a página de login
        } else {
            console.error('Erro ao realizar o logout. Status: ' + xhr.status);
        }
    };

    xhr.send();
}

function enviarFormBeneficiario() {
  var form = document.getElementById('formBeneficiario');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/recebedados');
  var storedToken = localStorage.getItem('token');
  xhr.setRequestHeader('Authorization', storedToken);
  xhr.onload = function () {
    if (xhr.status === 201) {
      // A requisição foi bem-sucedida
      if (xhr.responseText === 'Sucesso') {
        console.log('Dados enviados com sucesso');
      } else {
        alert('Erro ao enviar os dados');
      }
    } else {
      // A requisição retornou um erro
      alert('Beneficiario já cadastrado');
    }
  };
  xhr.send(formData);
}

// function previewImage(event) {
//   var input = event.target;
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
//     reader.onload = function(e) {
//       var preview = document.getElementById('preview');
//       preview.src = e.target.result;
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// }