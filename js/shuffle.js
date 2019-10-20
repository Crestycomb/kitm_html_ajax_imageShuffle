"use strict;";

// constants
const endPoint = "http://web-training.lt/img_api/";
const imgPath = "img/";

// select html elements
const showButton = document.querySelector("#showButton");
const shuffleButton = document.querySelector("#shuffleButton");
const gallery = document.querySelector(".gallery");

// listeners
// show gallery listener and calling the function
showButton.addEventListener('click', function()
{
    showButton.style.display = "none";
    galleryAppear();

});

// listener plus shuffle function
shuffleButton.addEventListener('click', function()
{
    const images = document.querySelectorAll(".gallery img");
    for (let item of images) {
        item.style.order =String(Math.floor(Math.random() * images.length));
    }
});

// doubleClick listener for images of DOM

// not really working... need another method
// document.addEventListener('dblclick', function()
// {
//         //target.src = "../img/default.gif";
// }
// );

// show gallery function
function galleryAppear()
{
    let pictureInfo = [];
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function()
    {
        if (myRequest.readyState === 4)
        {
            if (myRequest.status === 200)
            {
                let htmlForGallery = "";
                pictureInfo = JSON.parse(myRequest.responseText);

                for (let img of pictureInfo) {
                    htmlForGallery += `<img src="${endPoint + imgPath + img}" alt="image">`;
                }

                gallery.innerHTML = htmlForGallery;
            }
        }
    };
    myRequest.open('GET', endPoint);
    myRequest.send();
}



