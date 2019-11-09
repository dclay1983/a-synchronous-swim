
$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  var spacePress = event.key.match(/ /);
  if (arrowPress) {
    var direction = arrowPress[1];
    SwimTeam.move(direction.toLowerCase());
  } else if (spacePress) {
    if (window.remote) {
      clearTimeout(window.remote);
      window.remote = undefined;
    } else {
      ajaxGet('direction', true);
    }
  }
});

console.log('Client is running in the browser!');
