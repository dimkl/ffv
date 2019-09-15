/*
Extract extensions with filetypes and information from  
 https://www.garykessler.net/library/file_sigs.html
 by executing the following code in the console

 TODO: check https://www.filesignatures.net/index.php?page=all&currentpage=2&order=EXT
 TODO: check http://www.nationalarchives.gov.uk/documents/information-management/pronom-file-signature-research.pdf
 TODO: check https://github.com/Workable/application-form/blob/master/src/app/services/validation-service.ts#L179
*/

let sig;
const database = {};

const rows = Array.prototype.slice
  .call(document.querySelectorAll('table > tbody > tr'))
  .reduce((data, el) => {
    const signatureEl = el.querySelector('font[face="courier"]');

    if (signatureEl) {
      sig = signatureEl.innerText;
      data[sig] = [];

      return data;
    }

    const infoEl = el.querySelector('td:last-child');
    const extEl = el.querySelector('td[align="right"]');
    if (extEl) {
      data[sig].push({
        ext: extEl.innerText,
        info: infoEl.innerText
      });
    }

    return data;
  }, database);
