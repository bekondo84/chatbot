export function displayAllImages() {
    let images = [... document.getElementsByTagName('img')];
    for (var i = 0;  i < images.length; i++) {
        images[i].style.display = 'block';
    }
}

export function displayImage(id: string) {
    let idElt = document.getElementById(id);
    //console.log('------------displayImage -- '+idElt+' ---- '+id);
    if (idElt != null) {
        let images = [...idElt.getElementsByTagName('img')];
        //console.log('------------displayImage -- '+images)
        for (var i = 0;  i < images.length; i++) {
            //console.log('-------Process image ----- : '+images[i].innerHTML)
            images[i].style.display = 'block';
         }
    }
}