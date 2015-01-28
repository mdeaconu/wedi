$(function() {
  $('#btnExport').click(function() { 
    try {
      var xmltext = document.getElementById("xml_rdf");
      var pom = document.createElement('a');

      var filename = "";
      var pom = document.createElement('a');
      var bb = new Blob([xmltext.textContent], {type: 'text/plain;charset=UTF-8'});

      pom.setAttribute('href', window.URL.createObjectURL(bb));
      pom.setAttribute('download', filename);

      pom.dataset.downloadurl = ['text/plain', pom.download, pom.href].join(':');
      pom.draggable = true; 
      pom.classList.add('dragout');

      pom.click();

    } catch (e) {
      alert("Sorry error in xml, please correct and try again: " + e.message);
    } finally {
      bb.close();
    }
  });
});
