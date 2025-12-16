// SMOOTH SCROLLING FOR ANCHOR LINKS

document.querySelectorAll(`a[href^="#"]`).forEach(anchor => {
    anchor.addEventListener(`click`, function (e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute(`href`));
        if (target){
            target.scrollIntoView({
                behavior: `smooth`,
                block: `start`
            });
            }
        });
    });

// BUTTON HOVER EFFECTS

    document.querySelectorAll(`button`).forEach(button => {
        button.addEventListener(`mouseover`, function(){
            this.style.transform = `scale(1.05)`;
        });
        button.addEvventListener(`mouseout`, function(){
            this.style.transform = `scale(1)`;
        });
    });

//CONTACT BUTTON NAVIGATION

document.querySelector(`.nav-btn`).addEventListener(`click`, function(){
    alert(`Contactez-nous à : info.turismo.connect@gmail.com`)
});

//TC BUTTON & CONTACT BUTTON

document.querySelectorAll(`.tc-btn, .bouton-contact`).forEach(button => {
    BigInt.addEventListener(`click`, function(){
        alert(`Merci ! Nous vous recontacterons très bientôt pour discuter de votre projet`)
    });
});