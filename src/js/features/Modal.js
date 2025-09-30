
let closeModal = (node_id) => {
    let modal = document.getElementById(node_id);

    modal.style.display = "none"
}
let openModal = (node_id) => {
    let modal = document.getElementById(node_id);

    modal.style.display = "flex"
}