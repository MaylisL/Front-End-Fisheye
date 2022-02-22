function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-hidden', false);
    document.querySelector("main").setAttribute('aria-hidden', true);
    document.querySelector("header").setAttribute('aria-hidden', true);
    modal.addEventListener('keyup', keyUpEscape);
	modal.style.display = "block";
    modal.focus();
    document.querySelector(".contact_form").addEventListener('keydown', keyDownEnter);
}

function keyDownEnter(event) {
    if(event.key === 'Enter' && !event.target.matches('.submit_button')) {
        event.preventDefault()
    }
}

function keyUpEscape(event) {
    event.preventDefault()
    if(event.key==='Escape') {
        closeModal()
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute('aria-hidden', true);
    document.querySelector("main").setAttribute('aria-hidden', false);
    document.querySelector("header").setAttribute('aria-hidden', false);
    modal.removeEventListener('keyup', keyUpEscape);
    modal.style.display = "none";
    document.querySelector(".contact_button").focus();
}

document.querySelector(".submit_button").addEventListener('click', submitModal);

function submitModal(e) {
    e.preventDefault();
    const nameValue = document.querySelector("#name").value;
    const lastNameValue = document.querySelector("#lastname").value;
    const emailValue = document.querySelector("#email").value;
    const messageValue = document.querySelector("#message").value;

    console.log( JSON.stringify(
        {
            name: nameValue,
            lastname: lastNameValue,
            email: emailValue,
            message: messageValue,
        },null, 2
    ))
    closeModal()
}
