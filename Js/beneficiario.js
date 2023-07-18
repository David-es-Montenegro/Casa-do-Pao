var certificado = '';
window.addEventListener('DOMContentLoaded', function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://casadopao.pythonanywhere.com/beneficiario", true);
    var storedToken = localStorage.getItem('token');
    xhr.setRequestHeader("Authorization", storedToken);

    var nomeBeneficiario = localStorage.getItem('nomeBeneficiario');
    var dataNascimentoBeneficiario = localStorage.getItem('dataNascimentoBeneficiario')
    var formData = new FormData();
    formData.append('nome', nomeBeneficiario);
    formData.append('dataNascimento', dataNascimentoBeneficiario);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            document.querySelector('input[name="nome"]').value = response.nome;
            document.querySelector('input[name="genero"]').value = response.genero;
            document.querySelector('input[name="telefone"]').value = response.telefone;
            document.querySelector('input[name="data_nascimento"]').value = formatDate(response.data_nascimento);
            document.querySelector('input[name="alfabetizado"]').value = response.alfabetizado === 1 ? 'Sim' : 'Não';
            document.querySelector('input[name="nivel_escolaridade"]').value = response.nivel_escolaridade;
            document.querySelector('input[name="possui_certificado"]').value = response.possui_certificado === 1 ? 'Sim' : 'Não';
            document.querySelector('input[name="cpf"]').value = response.cpf;
            document.querySelector('input[name="rg"]').value = response.rg;
            document.querySelector('input[name="cep"]').value = response.cep;
            document.querySelector('input[name="bairro"]').value = response.bairro;
            document.querySelector('input[name="municipio"]').value = response.municipio;
            document.querySelector('input[name="rua"]').value = response.rua;
            document.querySelector('input[name="localdormida"]').value = response.localdormida;
            document.querySelector('input[name="eixo_formacao"]').value = response.eixo_formacao;
            document.querySelector('input[name="segmento"]').value = response.segmento;
            document.querySelector('input[name="observacao"]').value = response.observacao;

            if (response.possui_certificado === 1) {
                $('#botao-certificado').show();
                certificado = response.foto_certificado;
            }
            else {
                $('#botao-certificado').hide();
            }
            // Requisição para a imagem de perfil
            var fotoPerfilXhr = new XMLHttpRequest();
            fotoPerfilXhr.open("POST", response.foto_perfil, true);
            fotoPerfilXhr.setRequestHeader("Authorization", storedToken);
            fotoPerfilXhr.responseType = 'blob';

            fotoPerfilXhr.onreadystatechange = function () {
                if (fotoPerfilXhr.readyState === 4 && fotoPerfilXhr.status === 200) {
                    var blob = fotoPerfilXhr.response;
                    var url = URL.createObjectURL(blob);
                    document.querySelector('.user').src = url;
                }
            };

            fotoPerfilXhr.send();
        }
    };

    xhr.send(formData);
});

function abrirFoto() {
    var fotoCertificadoXhr = new XMLHttpRequest();
    fotoCertificadoXhr.open("POST", certificado, true);
    fotoCertificadoXhr.setRequestHeader("Authorization", localStorage.getItem('token'));
    fotoCertificadoXhr.responseType = 'blob';

    fotoCertificadoXhr.onreadystatechange = function () {
        if (fotoCertificadoXhr.readyState === 4 && fotoCertificadoXhr.status === 200) {
            var blob = fotoCertificadoXhr.response;
            var url = URL.createObjectURL(blob);

            // Abre uma nova janela com a imagem
            var newWindow = window.open('', '_blank', 'width=1200,height=1200,scrollbars=yes');

            // Escreve o HTML na nova janela com a imagem
            newWindow.document.write('<html><body><img src="' + url + '" alt="Imagem"></body></html>');

            // Garante que o conteúdo seja carregado corretamente antes de exibir
            newWindow.document.close();
        }
    };

    fotoCertificadoXhr.send();
}

function formatDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
}
