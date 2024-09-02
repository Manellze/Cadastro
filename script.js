function gerarDados() {
    const nomeCompleto = document.getElementById('nomeCompleto').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const centrodecusto = document.getElementById('centrodecusto').value.trim();  
    const setor = document.getElementById('setor').value.trim();
    
    // Palavras que devem ser ignoradas
    const palavrasIgnoradas = ['dos', 'do', 'de', 'da'];

    // Filtra as partes do nome, ignorando as palavras especificadas
    const nomePartes = nomeCompleto.split(' ').filter(palavra => !palavrasIgnoradas.includes(palavra.toLowerCase()));

    let iniciais = '';
    let logon = '';

    if (nomePartes.length === 2) {
        logon = (nomePartes[0] + nomePartes[1]).toLowerCase();
    } else if (nomePartes.length === 3) {
        iniciais = nomePartes[1][0]; 
        logon = nomePartes[0].toLowerCase() + iniciais.toLowerCase() + nomePartes[nomePartes.length - 1].toLowerCase();
    } else if (nomePartes.length >= 4) {
        iniciais = nomePartes[1][0] + nomePartes[2][0];
        logon = nomePartes[0].toLowerCase() + iniciais.toLowerCase() + nomePartes[nomePartes.length - 1].toLowerCase();
    }

    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const senha = `@C${dia}${mes}${ano}`;
    const email = logon + '@acengenhariase.com.br';

    return {
        nomeCompleto: nomeCompleto,
        iniciais: iniciais.toUpperCase(),
        centrodecusto: centrodecusto,
        setor: setor,
        cargo: cargo,
        logon: logon,
        senha: senha,
        email: email,
        data: dataAtual
    };
}

function salvarDados() {
    const dados = gerarDados();

    document.getElementById('nomeCompletoDisplay').textContent = dados.nomeCompleto;
    document.getElementById('iniciais').textContent = dados.iniciais;
    document.getElementById('centrodecustoDisplay').textContent = dados.centrodecusto;
    document.getElementById('setorDisplay').textContent = dados.setor;
    document.getElementById('logon').textContent = dados.logon;
    document.getElementById('senha').textContent = dados.senha;
    document.getElementById('email').textContent = dados.email;
    document.getElementById('dataAtual').textContent = `${dados.data.getDate().toString().padStart(2, '0')}/${(dados.data.getMonth() + 1).toString().padStart(2, '0')}/${dados.data.getFullYear()}`;
}

function gerarPDF() {
    const dados = gerarDados();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Largura e altura da página
    const pageWidth = doc.internal.pageSize.getWidth();
    

    // Posição inicial ajustada para descer os elementos
    const startY = 40; // ajuste conforme necessário
    

    // Adicione a imagem da logo
const logoDataUrl = 'img/AC_40ANOS.png'; // Substitua pelo seu URL ou Base64 da logo
const logoWidth = 90; // Ajuste conforme o tamanho da sua logo
const logoHeight = 60; // Ajuste conforme o tamanho da sua logo
const logoX = -22; // Posição X da logo
const logoY = startY - 50; // Posição Y da logo

doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoWidth, logoHeight);

// Adicione o texto ao lado da logo





    // Configuração do título
    doc.setFontSize(16);
    doc.text('Dados de Cadastro', pageWidth / 2, startY + -18 , null, null, 'center');

    // Desenho de borda ao redor dos dados
    doc.setLineWidth(0.5);
    doc.rect(10, startY + 10, 190, 110);

    // Configuração dos campos e valores
    doc.setFontSize(12);

    // Nome Completo
    doc.text('Nome Completo:', 15, startY + 20); // Posição do rótulo
    doc.text(dados.nomeCompleto, pageWidth / 2 - 55 + 2, startY + 20); // Posição do valor alinhado à esquerda
    


    // Centro de Custo
doc.text('Centro de Custo:', 15, startY + 30);
doc.text(dados.centrodecusto, pageWidth / 2 - 55 + 2, startY + 30); // Alinhado à esquerda


// Cargo
doc.text('Cargo:', 15, startY + 40);
doc.text(dados.cargo, pageWidth / 2 - 55 + 2, startY + 40); // Alinhado à esquerda


// Setor
doc.text('Setor:', 15, startY + 50);
doc.text(dados.setor, pageWidth / 2 - 55 + 2, startY + 50); // Alinhado à esquerda


// Logon
doc.text('Logon:', 15, startY + 60);
doc.text(dados.logon, pageWidth / 2 - 55 + 2, startY + 60); // Alinhado à esquerda


// Senha
doc.text('Senha:', 15, startY + 70);
doc.text(dados.senha, pageWidth / 2 - 55 + 2, startY + 70); // Alinhado à esquerda


// Email
doc.text('Email:', 15, startY + 80);
doc.text(dados.email, pageWidth / 2 - 55 + 2, startY + 80); // Alinhado à esquerda


// Data de Criação
doc.text('Data de criação:', 15, startY + 90);
doc.text(`${dados.data.getDate().toString().padStart(2, '0')}/${(dados.data.getMonth() + 1).toString().padStart(2, '0')}/${dados.data.getFullYear()}`, pageWidth / 2 - 55 + 2, startY + 90); // Alinhado à esquerda



    // Acessos
    doc.text('Acessos:', 15, startY + 105);
    doc.text('(  )Gmail   (  )Asana (  )Sienge (  )Construtor de Vendas', pageWidth / 2, startY + 105, null, null, 'center');
    doc.text('', pageWidth / 2, startY + 110, null, null, 'center');

    // Passo a passo
    const steps = [
        '1. Faça login no notebook usando o logon e a senha provisória fornecidos. No primeiro acesso, você precisará criar uma senha pessoal.',
        '2. Faça o mesmo no Email, utilizando seu email e sua senha provisória.',
        '3. Informações sobre seus outros acessos serão enviadas por email.'
    ];

    doc.setFontSize(12);
    doc.text('Passo a Passo:', 10, startY + 140);
    steps.forEach((step, index) => {
        doc.text(`${step}`, 15, startY + 150 + index * 10);
    });

    const assinaturaWidth = 60;
    const gap = 10;
    const x1 = (pageWidth - 3 * assinaturaWidth - 2 * gap) / 2;
    const assinaturaY = startY + 210;
    const textOffset = 5; // Ajuste para garantir que o texto fique exatamente abaixo da linha
    const emailEmpresa = 'contato@acengenhariase.com.br'; // Email da empresa
    
    // Linha para assinatura do Setor Responsável
    doc.line(x1, assinaturaY + textOffset, x1 + assinaturaWidth, assinaturaY + textOffset);
    doc.text('Ass. do Setor Responsável', x1 + assinaturaWidth / 2, assinaturaY + textOffset + 10, null, null, 'center');
    
    // Linha para assinatura do Colaborador
    doc.line(x1 + assinaturaWidth + gap, assinaturaY + textOffset, x1 + 2 * assinaturaWidth + gap, assinaturaY + textOffset);
    doc.text('Ass. do Colaborador', x1 + assinaturaWidth + gap + assinaturaWidth / 2, assinaturaY + textOffset + 10, null, null, 'center');
    
    // Linha para assinatura do Gestor
    doc.line(x1 + 2 * (assinaturaWidth + gap), assinaturaY + textOffset, x1 + 3 * assinaturaWidth + 2 * gap, assinaturaY + textOffset);
    doc.text('Ass. do Gestor', x1 + 2 * assinaturaWidth + 2 * gap + assinaturaWidth / 2, assinaturaY + textOffset + 10, null, null, 'center');

    const emailY = assinaturaY + 40; // Ajuste a posição vertical conforme necessário
doc.setFontSize(12);
doc.text(emailEmpresa, pageWidth / 2, emailY, null, null, 'center');

    // Salvar o PDF com o nome do logon
    doc.save(`${dados.logon}.pdf`);
}

