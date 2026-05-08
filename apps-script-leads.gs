// ══════════════════════════════════════════════════════════
//  Apps Script — Captura de Leads Operação Rio
//  Cole este código no Apps Script vinculado à sua planilha.
//  Publique como Web App: "Qualquer pessoa" pode acessar.
// ══════════════════════════════════════════════════════════

// Nome da aba onde os leads serão salvos
var SHEET_NAME = 'Leads Operação Rio';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Cria a aba se ainda não existir
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Data/Hora', 'Nome', 'E-mail', 'WhatsApp', 'Produto', 'Origem'
      ]);
      // Formata cabeçalho
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      data.name      || '',
      data.email     || '',
      data.whatsapp  || '',
      data.produto   || '',
      data.origem    || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Teste manual: rode esta função no editor para verificar que está gravando
function testeManual() {
  var dados = {
    postData: {
      contents: JSON.stringify({
        name:     'Teste Silva',
        email:    'teste@email.com',
        whatsapp: '21999999999',
        produto:  'Individual R$97',
        origem:   'LP-B'
      })
    }
  };
  var resultado = doPost(dados);
  Logger.log(resultado.getContent());
}
