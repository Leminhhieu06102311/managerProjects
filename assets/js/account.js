
import { Feature } from "./feature.js"
import { db } from "./database.js";
const feature = new Feature()
const tableAccount = $(".table__body").get(0);
// get account
db.collection("/account")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc, key) => {
      tableAccount.innerHTML += `
        <tr>
        <td>
            <div>
                <img src="assets/img/project_one.png" alt="">
                <p>${doc.data().nameProject}</p>
            </div>
        </td>
        <td>${doc.data().username}</td>
        <td>
            <input type="password" value="${
              doc.data().password
            }" disabled class="input-password">
            <div class="button-password">
                <svg viewBox="64 64 896 896" focusable="false" data-icon="eye-invisible" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path></svg>

            </div>
        </td>
        <td>
        ${doc.data().phone}
        </td>
        <td>
        <button class="show-atm" data-index="${
          doc.data().id
        }">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21,8a1,1,0,0,0,1-1V3a1,1,0,0,0-.08-.38,1,1,0,0,0-.54-.54A1,1,0,0,0,21,2H17a1,1,0,0,0,0,2h1.59L12,10.59,5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41L10.59,12,4,18.59V17a1,1,0,0,0-2,0v4a1,1,0,0,0,.08.38,1,1,0,0,0,.54.54A1,1,0,0,0,3,22H7a1,1,0,0,0,0-2H5.41L12,13.41,18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17a1,1,0,0,0-2,0v1.59L13.41,12,20,5.41V7A1,1,0,0,0,21,8Z"></path></svg>
        View ATM </button>
            <button class="delete-account" data-delete="${
              doc.data().id
            }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path></svg>
            Remove </button>
            <button class="update-account" data-update="${
              doc.data().id
            }">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path></svg>
            Edit </button>
        </td>
    </tr>
        `;
    });
  })
  .then(() => {
    // Feature On Of Password
    const buttonHide = $(".button-password").get();
    const inputPassword = $(".input-password").get();
    feature.onOfPassword(buttonHide, inputPassword);
    // ---------------------------------------------------------------------------------------
    // Add account in file account.html
    // button add account
    const addAccount = $(".button__create-account").get(0);
    // element modal create project
    const modalCreateProject = $(".modal-create-project").get(0);
    // element close modal create project
    const closeCreateAccount = $(".close-create-project").get(0);
    // element submit modal create project
    const submitCreateAccount = $(".button-add-account").get(0);
    // catch even when user click add account
    addAccount.addEventListener("click", () => {
      feature.openModal(modalCreateProject)
      // feature select project basic
      const selectAtm = $(".select-modal-atm").get(0);
      const selectProjectParent = $(".select-project").get();
      const listProjectItems = $(".select-modal-item--project").get();
      feature.selectItem(
        selectProjectParent,
        listProjectItems,
        "basic",
        false,
        selectAtm
      );
      // feature select atm advanced
      listProjectItems.map((item) => {
        item.addEventListener("click", () => {
          setTimeout(() => {
            const selectAtmParent = $(".select-atm").get();
            const listAtmItems = $(".select-modal-item-atm").get();
            feature.selectItem(selectAtmParent,listAtmItems,false,'advanced');
          }, 1000);
        });
      });
      // catch event when user click close create account

      closeCreateAccount.addEventListener('click', () => {
        feature.closeModal(modalCreateProject)
      })
    });
    // catch event when user click create account
    submitCreateAccount.addEventListener("click", () => {
      firebase
        .firestore()
        .collection("account")
        .add({
          nameProject: $(".select-project").get(0).firstElementChild.innerText,
          username: $(".username-create").get(0).value,
          password: $(".password-create").get(0).value,
          phone: $(".phone-create").get(0).value,
          show: {
            name: $(".select-atm").get(0).firstElementChild.dataset.name,
            namebank: $(".select-atm").get(0).firstElementChild.dataset.namebank,
            stk: $(".select-atm").get(0).firstElementChild.dataset.stk,
          },
          id: feature.revisedRandId(),
        })
      
      firebase
        .firestore()
        .collection("atms")
        .where("name", "==", $(".select-atm").get(0).firstElementChild.dataset.name)
        .where(
          "nameBank",
          "==",
          $(".select-atm").get(0).firstElementChild.dataset.namebank
        )
        .where(
          "stk",
          "==",
          Number($(".select-atm").get(0).firstElementChild.dataset.stk)
        )
        .get()
        .then(function (querySnapshot) {
          const nameProject = $(".select-project").get(0).firstElementChild.innerText.replace(
            /\s/g,
            ""
          );
          querySnapshot.forEach(function (doc) {
            let projects = doc.data().projects 
            projects[nameProject] = true
            doc.ref.update({
              projects
            })
          });
        });

      modalCreateProject.classList.add("hidden-modal");
      // setTimeout(() => {
      //   location.reload() 
      // },2000)
    });
    // update account
    const btnUpdateAccounts = $('.update-account').get()
    const btnCloseUpdateAccount = $('.close-update-account').get(0)
    const modalUpdateAccount = $('.modal-update-account').get(0)
    const submitUpdateAccount = $('.button-update-account').get(0)
    btnUpdateAccounts.map((item) => {
      item.addEventListener('click', () => {
        feature.openModal(modalUpdateAccount)

        submitUpdateAccount.addEventListener('click', () => {
          firebase
            .firestore()
            .collection("account")
            .where('id', "==", item.dataset.update)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({
                  username: $(".username-update").get(0).value,
                  password: $(".password-update").get(0).value,
                  phone: $(".phone-update").get(0).value,
                  id: feature.revisedRandId(),
                })
              })
            })

          modalUpdateAccount.classList.add("hidden-modal");
          // setTimeout(() => {
          //   location.reload() 
          // },2000)
        })

        btnCloseUpdateAccount.addEventListener('click', () => {
          feature.closeModal(modalUpdateAccount)
        })
      })
    })
    // delete account
    const btnDeletes = $('.delete-account').get()
    feature.deleteItem(btnDeletes,'account')
    // show atm 
    const modal = document.querySelector(".modal-view-atm");
    const buttonShowAtms = document.querySelectorAll(".show-atm");
    buttonShowAtms.forEach((item) => {
      item.addEventListener("click", () => {
        modal.classList.remove("hidden-modal");
        db.collection(`/account`)
          .where("id", "==", item.dataset.index)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc, key) => {
              [doc.data().show].map((item) => {
                modal.firstElementChild.innerHTML = `
                          <div class="close close__detail--atm">
                          <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                          </div>
                          <div>
                              <div class="heading">
                                  <label for="">Name : </label>
                              </div>
                              <input type="text" placeholder="Please Enter Username..." value="${item.name}" disabled>
                          </div>
                          <div>
                              <div class="heading">
                                  <label for="">STK : </label>
                              </div>
                              <input type="text" placeholder="Please Enter Password..." value="${item.stk}" disabled>
                          </div>
                          <div>
                              <div class="heading">
                                  <label for="">Name Card : </label>
                              </div>
                              <input type="text" placeholder="Please Enter Phone Number..." value="${item.namebank}" disabled>
                          </div>
                          <div>
                              <div class="heading">
                                  <label for="">Total Infomation : </label>
                              </div>
                              <div class="select">
                                  <p>${item.name} | ${item.stk} | ${item.namebank}</p>
                              </div>
                          </div>
                          <button class="button button-cancel">
                              <span>Cancel</span>
                          </button>
                          `;
              });
            });
            // close modal show atm
            const closeAtm = document.querySelector(".close__detail--atm");
            const cannelAtm = document.querySelector(".button-cancel");
            closeAtm.addEventListener("click", () => {
              modal.classList.add("hidden-modal");
            });
            cannelAtm.addEventListener("click", () => {
              modal.classList.add("hidden-modal");
            });
          });
      });
  });
  })