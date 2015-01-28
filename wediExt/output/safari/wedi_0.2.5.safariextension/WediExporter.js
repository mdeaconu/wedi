var WediExporter = function(xmltext) {
  try {
    var URL = window.URL || window.webkitURL;
    var filename = "*.xml";
    var pom = document.createElement('a');
    var bb = new Blob([xmltext.data], {type: 'text/plain;charset=UTF-8'});
    pom.setAttribute('href', URL.createObjectURL(bb));
    pom.setAttribute('download', filename);

    pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
    pom.draggable = true; 
    pom.click();

  } catch (e) {
    alert("Sorry error in xml, please correct and try again: " + e.message);
  }
}
