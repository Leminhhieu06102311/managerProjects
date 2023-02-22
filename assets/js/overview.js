import { db } from "./database.js";
import { Feature } from "./feature.js";


// init class feature
const featureJob = new Feature();
// element parent overview
const addJob = $(".button__create-job").get(0);
// element modal create project
const modalCreateJob = $(".modal-create-job").get(0);
// element close modal create project
const closeCreateJob = $(".close-create-job").get(0);
// element submit modal create project
const submitCreateJob = $(".button-add-job").get(0);
// catch even when user click add account
addJob.addEventListener("click", () => {
  // open modal
  featureJob.openModal(modalCreateJob);
  // -----------------------------------------------------
  // select basic
  const selectProjectParent = $(".select-project").get();
  const listProjectItems = $(".select-modal-item--project").get();
  featureJob.selectItem(selectProjectParent, listProjectItems, true, false);
  // listen event
  listProjectItems.map((item) => {
    item.addEventListener("click", () => {
      console.log("ok t bat dau nha");
      setTimeout(() => {
        console.log("t vao toi day roi");
        const selectAccountProjectParent = $(".select-account-job").get();
        const listAccountsProject = $(".select-modal-account-project").get();
        console.log(listAccountsProject);
        featureJob.selectItem(
          selectAccountProjectParent,
          listAccountsProject,
          true,
          false
        );
      }, 1000);
    });
  });

  submitCreateJob.addEventListener("click", () => {
    firebase
      .firestore()
      .collection("overview")
      .get()
      .then((querySnapshot) => {
        const message = $(".message").get(0);
        querySnapshot.forEach((doc) => {
          if (
            doc.data().capital > Number($(".capital-create-job").get(0).value)
          ) {
            doc.ref.update({
              capital:
                doc.data().capital -
                Number($(".capital-create-job").get(0).value),
            });
            // update overview capital
            $(".overview__capital h2").get(0).innerText = (
              doc.data().capital - Number($(".capital-create-job").get(0).value)
            ).toLocaleString("vi", { style: "currency", currency: "VND" });
            db.collection("account")
              .where(
                "id",
                "==",
                $(".select-account-job").get(0).firstElementChild.dataset.id
              )
              .get()
              .then(function (querySnapshot) {
                const tableBody = $(".table__body").get(0);
                
                querySnapshot.forEach(function (doc, key) {
                  tableBody.innerHTML += `
                      <tr>
                      <td data-id="${doc.data().id}">#${doc.data().id}</td>
                      <td>
                          <div>
                              <img src="assets/img/project_one.png" alt="">
                              <p>${doc.data().nameProject}</p>
                          </div>
                      </td>
                      <td>${doc.data().phone}</td>
                      <td>${doc.data().password}</td>
                      <td>${doc.data().username}</td>
                      <td style="color: var(--warning-color)">${Number(
                        $(".capital-create-job").get(0).value
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}</td>
                      <td>
                          <input
                              class="input-profit profit-${doc.data().id}"
                              type="number"
                              placeholder="Please Enter Profit..."
                          />
                      </td>
                      <td>
                          <button data-id="${
                            doc.data().id
                          }" class="button--success">Success</button>
                          <button data-id="${
                            doc.data().id
                          }" class="button--danger">Fail</button>
                      </td>
                      </tr>
                  `;
                  firebase
                    .firestore()
                    .collection("pending")
                    .add({
                      nameProject: doc.data().nameProject,
                      username: doc.data().username,
                      password: doc.data().password,
                      phone: doc.data().phone,
                      id: doc.data().id,
                      capital: Number($(".capital-create-job").get(0).value),
                      status: "pending",
                    });
                    db.collection('projects')
                    .get()
                    .then(querySnapshot => {
                      
                      let projects = {}
                      querySnapshot.forEach(doc => {
                        projects[doc.data().name] = false
                      })
                      return projects
                    })
                    .then((projects) => {
                      const nameProject = ($(".select-project").get(0).firstElementChild.dataset.name).replace(
                        /\s/g,
                        ""
                      );
                      projects[nameProject] = true
                      doc.ref.update({
                        projects
                      })
                    })
                });
              });

            message.innerText = "";
            featureJob.closeModal(modalCreateJob);
            setTimeout(() => {
              location.reload()
            }, 1000);
          } else {
            message.innerText = "Số vốn của bạn không đủ để tạo Job";
          }
        });
      })
      
  });

  // close modal
  closeCreateJob.addEventListener("click", () => {
    featureJob.closeModal(modalCreateJob);
  });
});

// catch even when user click success
setTimeout(() => {
  const buttonSuccess = $(".button--success").get();
const buttonFail = $(".button--danger").get();
console.log(buttonFail, buttonSuccess);
buttonSuccess.map((item) => {
  item.addEventListener("click", (e) => {
    const profit = $(`.profit-${item.dataset.id}`).get(0).value;
    if (profit) {
      firebase
        .firestore()
        .collection("pending")
        .where("id", "==", item.dataset.id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const capital = doc.data().capital;
            db.collection("history").add({
              id: doc.data().id,
              nameProject: doc.data().nameProject,
              password: doc.data().password,
              username: doc.data().username,
              phone: doc.data().phone,
              capital: doc.data().capital,
              profit: Number(profit),
              status: true,
            });
            db.collection("overview")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  doc.ref.update({
                    capital: doc.data().capital + Number(capital),
                    profit: doc.data().profit + Number(profit),
                    moneyToday: doc.data().moneyToday + Number(profit),
                  });
                });
              });
            doc.ref.delete();
          });
        });
      item.parentElement.parentElement.remove();
      swal({
        title: "Good Job!",
        text: "Chúc mừng bạn đã hoàn thành công việc!",
        icon: "success",
        button: "Done!",
      });
    } else {
      swal({
        title: "Vui lòng nhập profit!",
        text: "Cố gắng tiếp tục nhé!",
        icon: "error",
        button: "Done!",
      });
    }
  });
});
buttonFail.map((item) => {
  item.addEventListener("click", () => {
    const profit = $(`.profit-${item.dataset.id}`).get(0).value;
    firebase
      .firestore()
      .collection("pending")
      .where("id", "==", item.dataset.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const capital = doc.data().capital;
          db.collection("history").add({
            id: doc.data().id,
            nameProject: doc.data().nameProject,
            password: doc.data().password,
            username: doc.data().username,
            phone: doc.data().phone,
            capital: doc.data().capital,
            profit: Number(profit),
            status: false,
          });
          db.collection("overview")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                capital: doc.data().capital + Number(capital),
                profit: doc.data().profit + Number(profit),
                moneyToday: doc.data().moneyToday + Number(profit),
                Growth: doc.data().Growth + Number(capital)
              });
            });
          });
          doc.ref.delete();
        });
      });
    item.parentElement.parentElement.remove();
    swal({
      title: "Fail!",
      text: "Cố gắng tiếp tục nhé!",
      icon: "error",
      button: "Done!",
    });
  });
});
},2000)