(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  (ajaxGet = (req, repeat=false) => {
    ct = req === 'background.jpg' ? 'image/jpeg' : 'text/plain'
    $.ajax({
      type: 'GET',
      data: req,
      url: serverUrl,
      contentType: ct,
      success: (data) => {
        if(req === 'direction') {
          SwimTeam.move(data.toLowerCase());
          window.remote = setTimeout(ajaxGet, 10, 'direction', true);
        } else if (req === 'background.jpg') {

          $('.pool').css('background-image', 'url(http://127.0.0.1:3000/?background.jpg)');
        }
      }
    });
  });
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
