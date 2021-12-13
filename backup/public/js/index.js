// Fonction pour valider l'edition d'un USER
function ValidEdit() {
    return console.log('Validation EDIT')
}
// Fonction pour valider le ban d'un USER
function ValidBan() {
    return console.log('Validation BAN')
}
// Fonction pour valider le commentaire d'un USER
function ValidCom() {
    return console.log('Validation COM')
}
// Fonction pour delete le commentaire d'un USER
function DeleteCom() {
    return console.log('Delete COM')
}
// Fonction pour répondre a un MSG
function ReplyMsg() {
    return console.log('Répondre à un MSG')
}


fetch('../../assets/data/db.json')
        .then(function (response) {
            response.json().then(function (data) {
                appendData(data)
            });
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });
    function appendData(data) {
    //     $.each(data.user, function (index, obj) {
            
    //         $('.uslist').append(
    //             `<div id="USR" class="row border-bottom">
    //     <div class="col-md-2 my-3">
    //         <div class="roundedImage"><img src="${obj.img}" heigth="100%" width="100%"></div>
    //     </div>
    //     <div class="col-md-10 d-flex flex-row justify-content-center align-items-center mb-2">
    //         <div id="user${obj.id}" class="col-8">${obj.prenom} ${obj.nom}</div>
    //         <div class="col-4 d-flex flex-row justify-content-center align-items-center">
    //             <div class="mx-3" data-bs-toggle="modal" data-bs-target="#edituser${obj.id}" data-bs-whatever="@fat">
    //                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
    //                     class="bi bi-pencil-square" viewBox="0 0 16 16">
    //                     <path
    //                         d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    //                     <path fill-rule="evenodd"
    //                         d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
    //                 </svg>
    //             </div>

    //             <div class="mx-3" data-bs-toggle="modal" data-bs-target="#modalban${obj.id}">
    //                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
    //                     class="bi bi-hammer" viewBox="0 0 16 16">
    //                     <path
    //                         d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
    //                 </svg>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // <!-- MOdal edit -->
    // <div class="modal fade" id="edituser${obj.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <h5 class="modal-title" id="exampleModalLabel">Edition du profil de ${obj.prenom}</h5>
    //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //             </div>
    //             <div class="modal-body">
    //                 <form>
    //                     <div class="mb-3">
    //                         <label for="recipient-name${obj.id}" class="col-form-label">Prénom:</label>
    //                         <input type="text" class="form-control" id="recipient-name${obj.id}" value="${obj.prenom}">
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="recipient-lastname${obj.id}" class="col-form-label">Nom:</label>
    //                         <input type="text" class="form-control" id="recipient-lastname${obj.id}" value="${obj.nom}">
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="email${obj.id}" class="form-label">Email</label>
    //                         <div class="col-12">
    //                             <input type="email" class="form-control" id="email${obj.id}" value="${obj.email}">
    //                         </div>
    //                     </div>
    //                     <div class="mb-3">
    //                         <input type="file" class="form-control" id="inputGroupFile${obj.id}">
    //                     </div>
    //                 </form>
    //             </div>
    //             <div class="modal-footer d-flex justify-content-center">
    //                 <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
    //                 <button type="button" class="btn btn-success" data-bs-dismiss="modal"
    //                     onClick="ValidEdit()">Confirmer</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    // <!-- Modal ban -->
    // <div class="modal fade" id="modalban${obj.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div class="modal-dialog">
    //         <div class="modal-content">
    //             <div class="modal-header">
    //                 <p class="modal-title" id="exampleModalLabel">Voulez vous bannir <b>${obj.prenom+' '+obj.nom}</b> ?</p>
    //                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //             </div>

    //             <div class="modal-footer d-flex justify-content-center">
    //                 <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
    //                 <button type="button" class="btn btn-success" data-bs-dismiss="modal"
    //                     onClick="ValidBan()">Confirmer</button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // `);
    //     })

            for (i = 0; i < data.user.length; i++) {
                if (data.user[i].commentaire_attente  == false){
                    continue;
                }
                else {
                    for(let coml of data.user[i].commentaire_attente){
                        let rdm = new Date(Date.now());
                    cl = document.getElementsByClassName('.comlist')
                cl.innnerHTML =`
                <div class="row border-bottom">
    <div class="col-2 my-3">
        <div class="roundedImage"><img src="${data.user[i].img}" heigth="100%" width="100%"></div>
    </div>
    <div class="col-md-10 d-flex justify-content-center align-items-center mb-2">
        <div class="col-8" id="user${data.user[i].id}">${data.user[i].prenom} ${data.user[i].nom}</div>
        <div class="col-4 d-flex flex-row justify-content-center align-items-center">
            <div class="mx-3" data-bs-toggle="modal" data-bs-target="#modalblog${data.user[i].id+rdm.getMilliseconds()}">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                    class="bi bi-info-square" viewBox="0 0 16 16">
                    <path
                        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
            </div>
        </div>
    </div>
</div>

<!-- Modal blog -->
    <div class="modal fade" id="modalblog${data.user[i].id+rdm.getMilliseconds()}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalToggleLabel">Voulez vous autorisez le commentaire suivant ?
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="disabledTextInput" class="form-label">Commentaire:</label>
                        <textarea class="form-control" id="message-text${data.user[i].id}"
                            placeholder="${coml}"
                            disabled readonly></textarea>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                        data-bs-target="#modaldel">Non</button>
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                        onClick="ValidCom()">Oui</button>
                </div>
            </div>
        </div>
    </div>

                `;
            }//end for
            }// end else
            }

        

    };