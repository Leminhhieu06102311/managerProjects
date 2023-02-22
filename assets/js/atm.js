import { Feature } from "./feature.js";
import { db } from "./database.js";
const featureAtm = new Feature();
//  get atms atm.html
const tableBodyAtms = $(".table__body-atm").get(0);
if (tableBodyAtms) {
  db.collection("/atms")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc, key) => {
        tableBodyAtms.innerHTML += `
        <tr>
        <td>
            <div>
                <p>${doc.data().name}</p>
            </div>
        </td>
        <td>${doc.data().nameBank}</td>
        <td>
        ${doc.data().stk}
        </td>
        
        <td>
        <span>${doc.data().kind} </span>
        
        </td>
        <td>
           ${doc.data().kind === 'Register' ? `<button class="show-atm" data-index="${doc.data().id}" style="cursor: pointer">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21,8a1,1,0,0,0,1-1V3a1,1,0,0,0-.08-.38,1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59L12,10.59,5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41L10.59,12,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41L12,13.41,18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17a1,1,0,0,0-2,0v1.59L13.41,12,20,5.41V7A1,1,0,0,0,21,8Z"></path></svg>
           View TK MK </button>` : `<button class="show-atm" data-index="${doc.data().id}" disabled style="cursor: not-allowed">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21,8a1,1,0,0,0,1-1V3a1,1,0,0,0-.08-.38,1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59L12,10.59,5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41L10.59,12,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41L12,13.41,18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17a1,1,0,0,0-2,0v1.59L13.41,12,20,5.41V7A1,1,0,0,0,21,8Z"></path></svg>
           No TK MK</button>`}
            <button class="delete-atm" style="cursor: pointer" data-delete="${doc.data().id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path></svg>
            Remove </button>
            <button class="update-atm" data-update="${doc.data().id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path></svg>
            Edit </button>
        </td>
    </tr>
        `;
      });
    })
    .then(() => {
      // ---------------------------------------------------------------------
      // add atm
      // element button add atm
      const addAtm = $(".button__create-atm").get(0);
      const modalCreateAtm = $(".modal-create-atm").get(0);
      // element close modal create project
      const closeCreateAtm = $(".close-create-atm").get(0);
      // element submit modal create project
      const submitCreateAtm = $(".button-add-atm").get(0);
      // catch even when user click add account
      addAtm.addEventListener("click", () => {
        // open modal create atm
        featureAtm.openModal(modalCreateAtm);

        const selectProjectParent = $(".select-kind").get();
        const listProjectItems = $(".select-modal-item-kind").get();
        featureAtm.selectItem(
          selectProjectParent,
          listProjectItems,
          "basic",
          false
        );
        // catch event when user click create account
          
        submitCreateAtm.addEventListener("click", () => {
          db.collection('projects')
          .get()
          .then((querySnapshot) => {
            let projects = {}
            querySnapshot.forEach(doc => {
              projects[doc.data().name] = false
            })

            db
            .collection("atms")
            .add({
                name:
                  $(".username-create").get(0).value,
                nameBank: $(".nameBank-create").get(0).value,
                stk: $(".stk-create").get(0).value,
                kind: $(".select-kind").get(0).firstElementChild.innerText,
                show: {
                    username: $(".username-create-kind").get(0).value || false,
                    password: $(".password-create-kind").get(0).value || false,
                    passwordLevel2: $(".password-level-2-create-kind").get(0).value ||  false,
                },
                id: featureAtm.revisedRandId(),
                projects
            });
          })
            modalCreateAtm.classList.add("hidden-modal");
            setTimeout(() => {
              location.reload();
            }, 1000);
    
        
        })
          // catch event when user click close create account
          closeCreateAtm.addEventListener("click", () => {
            featureAtm.closeModal(modalCreateAtm);
        });
        })
        // DELETE ATM
        const btnDeletesAtm = $('.delete-atm').get()
        featureAtm.deleteItem(btnDeletesAtm,'atms')

        // UPDATE ATM
        // update account
        const btnUpdateAtms = $('.update-atm').get()
        const btnCloseUpdateAtm = $('.close-update-atm').get(0)
        const modalUpdateAtm = $('.modal-update-atm').get(0)
        const submitUpdateAtm = $('.button-update-atm').get(0)
        btnUpdateAtms.map((item) => {
          item.addEventListener('click', () => {
            featureAtm.openModal(modalUpdateAtm)

            submitUpdateAtm.addEventListener('click', () => {
              firebase
                .firestore()
                .collection("atms")
                .where('id', "==", item.dataset.update)
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    doc.ref.update({
                      name: $(".username-update-atm").get(0).value,
                      nameBank: $(".name-bank-update-atm").get(0).value,
                      stk: $(".stk-update-atm").get(0).value,
                      id: featureAtm.revisedRandId(),
                    })
                  })
                })

                modalUpdateAtm.classList.add("hidden-modal");
              setTimeout(() => {
                location.reload() 
              },2000)
            })

            btnCloseUpdateAtm.addEventListener('click', () => {
                featureAtm.closeModal(modalUpdateAtm)
            })
          })
        })

        })

}
