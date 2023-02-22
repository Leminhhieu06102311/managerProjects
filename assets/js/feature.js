
export class Feature {
    constructor() {}
  
    onOfPassword(buttonHide, inputPassword) {
      buttonHide.map((item, key) => {
        item.addEventListener("click", () => {
          if (inputPassword[key].type === "password") {
            inputPassword[key].type = "text";
            item.innerHTML =
              '<svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>';
          } else {
            inputPassword[key].type = "password";
            item.innerHTML =
              '<svg viewBox="64 64 896 896" focusable="false" data-icon="eye-invisible" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path></svg>';
          }
        });
      });
    }
  
    selectItem(parentEl, childEls, basic, advanced, parentElAdv) {
      parentEl.forEach((item) => {
        let data 
        item.firstElementChild.addEventListener("click", () => {
          item.lastElementChild.classList.add("active");
          item.lastElementChild.classList.remove("hidden");
          childEls.forEach((item) => {
            item.addEventListener("click", (event) => {
              console.log(event.target)
              item.parentElement.classList.add("hidden");
              item.parentElement.classList.remove("active");
              // get innertext name project 
              const nameProjectSelect = event.target.dataset.name.replace(
                /\s/g,
                ""
              );
              if (basic) {
                item.parentElement.parentElement.firstElementChild.innerHTML = `${item.dataset.name}   `;
                item.parentElement.parentElement.firstElementChild.dataset.name =
                  item.dataset.name;
                // get atm when select project
                console.log(nameProjectSelect)
                firebase
                  .firestore()
                  .collection("/atms")
                  .where(`projects.${nameProjectSelect}`, "==", false)
                  .get()
                  .then((snapshot) => {
                    snapshot.forEach((item) => {
                      if(parentElAdv) {
                        parentElAdv.innerHTML += `
                        <li
                          class="select-modal-item select-modal-item-atm"
                          data-stk="${item.data().stk}"
                          data-nameBank = "${item.data().nameBank}"
                          data-name = "${item.data().name}"
                        >
                        ${item.data().stk} | ${item.data().nameBank} | ${
                        item.data().name
                      } </li>
                          `;
                       }
                    });
                  })
                  .catch((err) => {
                    console.log('ATM NOT FOUND', err)
                  })
                  
              } else if (advanced) {
                item.parentElement.parentElement.firstElementChild.innerHTML = `${
                  item.dataset.stk ? item.dataset.stk + " | " : ""
                } ${item.dataset.namebank ? item.dataset.namebank + " | " : ""} ${
                  item.dataset.name
                }    `;
                item.parentElement.parentElement.firstElementChild.dataset.stk =
                  item.dataset.stk;
                item.parentElement.parentElement.firstElementChild.dataset.namebank =
                  item.dataset.namebank;
                item.parentElement.parentElement.firstElementChild.dataset.name =
                  item.dataset.name;
                // ----------------------------------------------------------------------------------------
              }
              // element show when user click register
              const kindRegisterAtm = $('.kind-register-atm').get(0)
              if (kindRegisterAtm) {

                if (event.target.dataset.name === 'Register') {
                  kindRegisterAtm.style.display = 'block'
                } else {
                  kindRegisterAtm.style.display = "none"
                }
              }
              // render account when user choose project to do
              const selectAccountJob = $('.select-account-job').get(0)
              const parentSelectAccountJob = $('.select-modal-account-job').get(0)
              if (selectAccountJob) {
                item.parentElement.parentElement.firstElementChild.innerHTML = `<span style="color: red">${item.dataset.name}</span>`;
                item.parentElement.parentElement.firstElementChild.dataset.id =
                  item.dataset.id;
                console.log('chinh la tao',nameProjectSelect)
                firebase
                  .firestore()
                  .collection("account")
                  .where(`projects.${nameProjectSelect}`, "==", false)
                  .get()
                  .then((snapshot) => {
                    const date = new Date()
                    snapshot.forEach((item) => {
                      console.log(item.data())
                      parentSelectAccountJob.innerHTML = `
                      <li
                        class="select-modal-item select-modal-account-project"
                        data-id="${item.data().id}"
                        data-phone="${item.data().phone}"
                        data-password = "${item.data().password}"
                        data-name = "${item.data().username}"
                      >
                      ${item.data().phone} | ${item.data().username} | ${
                      item.data().password} | Day : ${date.getDate()}
                      /${date.getMonth()}/${date.getFullYear()}
                      </li>
                        `;
                    });
                  })
                  .catch(() => {
                    console.log(selectAccountJob.firstElementChild.innerHTML)
                  })
              }
            });
          });
        });

      });
    }
  
    deleteItem(btnDeletes,pathCollection) {
      btnDeletes.map((item) => {
        item.addEventListener('click', () => {
          const uid = item.dataset.delete
          firebase.firestore()
            .collection(pathCollection)
            .where('id', "==", uid)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                doc.ref.delete()
              });
            });
            setTimeout(() => {
              location.reload() 
            },1000)
        })
      })
    }
  
    closeModal( modal) {
      modal.classList.add("hidden-modal");
    }
    openModal(mainModal) {
      mainModal.classList.remove('hidden-modal')
    }
    revisedRandId() {
      return Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(2, 10);
    }
  
    
   
  }