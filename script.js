const openButton = document.getElementById("open-button") 

openButton.addEventListener("click", () => {
    console.log("open")
    window.location.href = 'about/about.html';
})