function enviarFormulario() {
  var form = document.getElementById('meuFormulario');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/login');
  xhr.onload = function () {

    if (xhr.status === 200) {
      // Código 200 indica uma resposta bem-sucedida
      var response = JSON.parse(xhr.responseText);

      // Armazene a resposta no armazenamento local do navegador
      localStorage.setItem('token', response.token);
      console.log(localStorage.getItem('token'));
      localStorage.setItem('user', response.user);
      localStorage.setItem('cpf', formData.get('cpf'));

      window.location.href = "/index.html";
    } else if (xhr.status === 401) {
      // Código 401 indica uma resposta de autorização inválida
      alert ("CPF não cadastrado no sistema.");
    } else if (xhr.status === 403){
      // Outros códigos de status podem ser tratados aqui
      alert ("credenciais incorretas.");
    }
  };
  xhr.setRequestHeader('chave', '$WW&elJkD@t0DYyyl6m995Zb46zn!JtqF9kFvM6LTX3NYQ9$vp');
  xhr.send(formData);
}

function cadastrarADM() {
  var form = document.getElementById('meuFormulario');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/cadastro');
  xhr.onload = function () {

    if (xhr.status === 201) {
      alert ("Cadastro realizado, faça login para prosseguir.");
      window.location.href = '/login.html';
    } else if (xhr.status === 401) {
      // Código 401 indica uma resposta de autorização inválida
      alert ("Chave de autorização incorreta.");
    } else if (xhr.status === 409){
      // Outros códigos de status podem ser tratados aqui
      alert ("Administrador já cadastrado na base de dados, faça login");
    } else {
      alert ("Erro desconhecido.")
    }

    closeButton.addEventListener('click', function () {
      popup.style.display = 'none';
    });
  };
  xhr.setRequestHeader('chave', '$WW&elJkD@t0DYyyl6m995Zb46zn!JtqF9kFvM6LTX3NYQ9$vp');
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
  console.log("rodou");
}

function enviarFormBeneficiario() {
  var form = document.getElementById('formBeneficiario');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/recebedados');
  var storedToken = localStorage.getItem('token');
  xhr.setRequestHeader('Authorization', storedToken);
  xhr.onload = function () {
      // A requisição foi bem-sucedida
      if (xhr.status === 201) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/cadastro.html';
      } 
      if (xhr.status === 401){
        alert('Faça login para cadastrar um beneficiario.');
        window.location.href = '/login.html';
      }
      if (xhr.status === 409){
      // A requisição retornou um erro
      alert('Beneficiario já esta cadastrado na base de dados');
      }
  };
  xhr.send(formData);
}

document.getElementById('cpf').addEventListener('input', formatarCPF);
function formatarCPF() {
  var cpf = document.getElementById('cpf').value.replace(/[a-zA-Z]/g, '');

  switch (cpf.length) {
    case 0:
      break;
    case 3:
      cpf = cpf.slice(0, 3) + '.'; // Adiciona o ponto após os primeiros 3 dígitos
      break;
    case 7:
      cpf = cpf.slice(0, 7) + '.'; // Adiciona o ponto após os primeiros 6 dígitos
      break;
    case 11:
      cpf = cpf.slice(0, 11) + '-'; // Adiciona o traço após os primeiros 9 dígitos
      break;
    case 14:
      break;
  }

  document.getElementById('cpf').value = cpf;
  console.log("okay");
}

function validarCPF() {
    // Obtenha o valor digitado pelo usuário no campo de CPF
    const cpf = document.getElementById('cpf').value;

    // Remova caracteres especiais (pontuação e espaços) do CPF
    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    if (cpfLimpo.length == 0) {
      return;
    }
    // Verifique se o CPF tem 11 dígitos
    if (cpfLimpo.length !== 11) {
      alert('CPF invalido, o CPF deve ter 11 digitos.')
      document.getElementById('cpf').value = '';
      return;
    }
    // Verifique se todos os dígitos são iguais (caso inválido)
    if (/^(\d)\1+$/.test(cpfLimpo)) {
      alert('CPF invalido, todos os digitos são iguais.')
      document.getElementById('cpf').value = '';
      return;
    }

    // Verifique os dígitos verificadores
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
      alert('CPF invalido, este CPF não é real.')
      document.getElementById('cpf').value = '';
      return;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
      alert('CPF invalido, este CPF não é real.')
      document.getElementById('cpf').value = '';
      return;
    }
  }

document.getElementById('rg').addEventListener('input', formatarRG);
function formatarRG() {
  var rg = document.getElementById('rg').value.replace(/[a-zA-Z]/g, '');

  switch (rg.length) {
    case 0:
      break;
    case 2:
      rg = rg.slice(0, 2) + '.'; // Adiciona o ponto após os primeiros 3 dígitos
      break;
    case 6:
      rg = rg.slice(0, 6) + '-'; // Adiciona o ponto após os primeiros 6 dígitos
      break;
  }

  document.getElementById('rg').value = rg;
}

function validarRG() {
  // Obtenha o valor digitado pelo usuário no campo de RG
  const rg = document.getElementById('rg').value;

  // Remova caracteres especiais (pontuação e espaços) do RG
  const rgLimpo = rg.replace(/[^\d]/g, '');

  if (rgLimpo.length === 0) {
    return;
  }

  // Verifique se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1+$/.test(rgLimpo)) {
    alert('RG inválido, todos os dígitos são iguais.');
    document.getElementById('rg').value = '';
    return;
  }

  if (rgLimpo.length < 8) {
    alert('RG inválido, o RG deve ter pelo menos 8 dígitos.');
    document.getElementById('rg').value = '';
    return;
  }
}