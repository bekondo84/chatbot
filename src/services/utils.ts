export function displayAllImages() {
    let images = [... document.getElementsByTagName('img')];
      console.log('------------IMG -- '+images)
      for (var i = 0;  i < images.length; i++) {
         console.log('-------Process image ----- : '+images[i].innerHTML)
         images[i].style.display = 'block';
      }
}