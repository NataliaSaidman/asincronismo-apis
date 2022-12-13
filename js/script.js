// Functions of selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Global Helper Functions
const hideElement = (selector) => selector.classList.add("hidden");
const showElement = (selector) => selector.classList.remove("hidden");

const base_url = "https://637e11219c2635df8f97fc19.mockapi.io/jobs/";

//Functions GET, POST, PUT, DELETE

const getJobs = async (jobId = "") => {
  const response = await fetch(`${base_url}${jobId}`);
  const jobs = await response.json();
  return jobs;
};

getJobs()
  .then((data) => generateCards(data))
  .catch(() => {
    showElement($("#errorMessage"));
    hideElement($(".spinner"));
    hideElement($(".sectionCardsJobs"));
  });

const addJob = () => {
  fetch(`${base_url}`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveJob()),
  })
    .catch(() => alert(`No se pudo enviar la información`))
    .finally(() => (window.location.href = "index.html"));
};

const editJob = (jobId) => {
  fetch(`${base_url}${jobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveEditJob()),
  })
    .catch(() => alert(`Ocurrió un error`))
    .finally(() => (window.location.href = "index.html"));
};

const deleteJob = (jobId) => {
  fetch(`${base_url}${jobId}`, {
    method: "DELETE",
  })
    .catch(() => alert(`Ocurrió un error`))
    .finally(() => (window.location.href = "index.html"));
};

const saveJob = () => {
  return {
    name: $("#jobTitle").value,
    image: $("#jobImg").value,
    description: $("#description").value,
    location: $("#locationAdd").value,
    speciality: $("#specialityAdd").value,
    experience: $("#experienceAdd").value,
    review: $("#review").value,
  };
};

const saveEditJob = () => {
  return {
    name: $("#jobEditTitle").value,
    image: $("#jobEditImg").value,
    description: $("#editDescription").value,
    location: $("#editLocationForm").value,
    speciality: $("#editSpecialityForm").value,
    experience: $("#editExperienceForm").value,
    review: $("#editReview").value,
  };
};

const dataEditJob = (job) => {
  showElement($("#editJobForm"));
  $("#jobEditTitle").value = job.name;
  $("#jobEditImg").value = job.image;
  $("#editDescription").value = job.description;
  $("#editLocationForm").value = job.location;
  $("#editSpecialityForm").value = job.speciality;
  $("#editExperienceForm").value = job.experience;
  $("#editReview").value = job.review;
};

//Filters

const filterJobsBy = (array, prop, value) => {
  return array.filter((job) => job[prop] === value);
};

const filterJobs = (data) => {
  let arrayJobs = data;
  if ($("#location").value !== "locacion") {
    arrayJobs = filterJobsBy(arrayJobs, "location", $("#location").value);
  }
  if ($("#speciality").value !== "especialidad") {
    arrayJobs = filterJobsBy(arrayJobs, "speciality", $("#speciality").value);
  }
  if ($("#experience").value !== "experiencia") {
    arrayJobs = filterJobsBy(arrayJobs, "experience", $("#experience").value);
  }
  return arrayJobs;
};

// Function alert Form

const alertForm = (inputs, selects) => {
  let validateForm = true;
  for (const input of inputs) {
    if (input.value === "") {
      validateForm = false;
      return alert(`Por favor, no deje casilleros sin completar`);
    }
  }
  for (const select of selects) {
    if (
      select.value === "locacion" ||
      select.value === "especialidad" ||
      select.value === "experiencia"
    ) {
      validateForm = false;
      return alert(`Por favor, no deje etiquetas sin completar`);
    }
  }
  return validateForm;
};

//DOM
const generateCards = (jobs) => {
  $(".cardsJobs").innerHTML = "";
  showElement($(".spinner"));
  jobs.length === 0
    ? setTimeout(() => {
        hideElement($(".spinner"));
        $(
          ".cardsJobs"
        ).innerHTML = `<div class="flex rounded-lg border-2 border-stone-400 p-2 items-center">
              <div class="flex flex-col">
                <p class="md:text-4xl text-xl font-bold text-[#5F8D4E]">No encontramos lo qué estas buscando</p>
                <span class="md:text-xl text-base mt-2">Probá seleccionando otras opciones</span>
              </div>
              <img src="./assets/not-found.png" class="md:w-[200px] w-[120px] min-[280px]:w-[100px]" alt="not-found"/>
            </div>
          `;
      }, 2000)
    : setTimeout(() => {
        hideElement($(".spinner"));
        for (const {
          name,
          image,
          review,
          location,
          experience,
          speciality,
          id,
        } of jobs) {
          $(".cardsJobs").innerHTML += ` 
                <div class="cardJob bg-white 2xl:w-1/5 xl:w-1/4 md:w-1/3 min-[768px]:w-2/5 min-[540px]:w-4/5 w-full p-2 rounded-lg border-2 border-stone-400 sm:ml-2 ml-0 mt-2">
                    <h1 class="text-xl text-center">${name}</h1>
                    <div class="flex justify-center w-full">
                        <img src="${image}" class="mt-2 w-[100px]" alt="alimentacion foto">
                    </div>
                    <p class="mt-2 w-full">${review}</p>
                    <div class="flex mt-2 justify-start w-full max-[300px]:flex-col">
                        <span class="bg-[#E5D9B6] text-center text-black font-bold text-xs px-2 py-1 rounded w-1/3 max-[300px]:w-2/3">${location}</span>
                        <span
                        class="bg-[#E5D9B6] text-center text-black text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${speciality}</span>
                        <span
                        class="bg-[#E5D9B6] text-center text-black text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${
                          experience === "1"
                            ? "Recibida"
                            : `+ de ${experience} años`
                        }</span>
                    </div>
                    <button
                    class="detailsBtn mt-2 px-4 py-2 text-white bg-[#5F8D4E] mr-2 rounded transition duration-100 cursor-pointer hover:bg-[#285430] focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Ver
                    detalles</button>
                </div>`;
        }
        for (const btn of $$(".detailsBtn")) {
          btn.addEventListener("click", () => {
            const jobId = btn.getAttribute("data-id");
            getJobs(jobId)
              .then((data) => generateOneCard(data))
              .catch(() => alert(`No se encontraron resultados`));
          });
        }
      }, 2000);
};

const generateOneCard = (job) => {
  $(".cardsJobs").innerHTML = "";
  showElement($(".spinner"));
  hideElement($(".search"));
  setTimeout(() => {
    showElement($(".containerEditJob"));
    hideElement($(".mainContainer"));
    const { name, image, location, experience, speciality, id, description } =
      job;
    $(".oneJob").innerHTML = `
                <div class="cardJob bg-white xl:w-4/5 md:w-3/4 w-full p-2 rounded-lg border-2 border-[#5F8D4E] md:ml-2 ml-0 mt-2 h-max mb-2">
                    <h1 class="text-2xl text-center">${name}</h1>
                    <div class="flex justify-center w-full">
                        <img src="${image}" class="mt-2 w-[200px]" alt="alimentacion foto">
                    </div>
                    <p class="mt-2 w-full">${description}</p>
                    <div class="flex mt-4 justify-strat w-full max-[300px]:flex-col">
                        <span class="bg-[#E5D9B6] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded w-1/3 max-[300px]:w-2/3">${location}</span>
                        <span
                        class="bg-[#E5D9B6] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${speciality}</span>
                        <span
                        class="bg-[#E5D9B6] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${
                          experience === "1"
                            ? "Recibida"
                            : `+ de ${experience} años`
                        }</span>
                    </div>
                    <div class="flex justify-between mt-2">
                      <div>
                        <button
                        class="editBtn mt-2 px-4 py-2 text-white bg-[#5F8D4E] mr-2 rounded transition duration-100 cursor-pointer hover:bg-[#285430] hover:text-[#F49D1A] focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Editar</button>
                        <button
                        class="deleteBtn mt-2 px-4 py-2 text-white bg-[#5F8D4E] mr-2 rounded transition duration-100 cursor-pointer hover:bg-[#285430] hover:text-[#F49D1A] focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Eliminar</button>
                    </div>
                      <button class="backHomeBtn mt-2 px-4 py-2 text-white bg-[#5F8D4E] mr-2 rounded transition duration-100 cursor-pointer hover:bg-[#285430] focus:outline-none focus:ring focus:ring-violet-300"><i class="text-white text-2xl text-end hover:text-[#F49D1A] fa-solid fa-arrow-left"></i></button>
                    </div>
                </div>
            `;
    for (const btn of $$(".editBtn")) {
      btn.addEventListener("click", () => {
        showElement($("#editJobForm"));
        $(".oneJob").classList.remove("min-h-screen");
        const jobId = btn.getAttribute("data-id");
        $(".editJobSubmitBtn").setAttribute("data-id", jobId);
        getJobs(jobId)
          .then((data) => dataEditJob(data))
          .catch(() => alert(`No se encontraron resultados`));
      });
    }
    for (const btn of $$(".deleteBtn")) {
      btn.addEventListener("click", () => {
        hideElement($("footer"));
        hideElement($(".mainContainer"));
        hideElement($(".containerEditJob"));
        showElement($("#alert"));
        const jobId = btn.getAttribute("data-id");
        $(".alertDeleteBtn").setAttribute("data-id", jobId);
      });
    }
    for (const btn of $$(".backHomeBtn")) {
      btn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }
  }, 2000);
};

// Events

for (const addJob of $$(".addJob")) {
  addJob.addEventListener("click", () => {
    hideElement($(".mainContainer"));
    hideElement($(".navbarMenu"));
    hideElement($(".xmark"));
    hideElement($(".containerEditJob"));
    showElement($("#newJob"));
    showElement($(".navbarBurguer"));
  });
}

$(".formNewJob").addEventListener("submit", (e) => {
  e.preventDefault();
  if (alertForm($$(".inputsNewJob"), $$(".selectNewJob"))) {
    addJob();
  }
});

$(".formEditJob").addEventListener("submit", (e) => {
  e.preventDefault();
  if (alertForm($$(".inputsJobEdit"), $$(".selectEdit"))) {
    const jobId = $(".editJobSubmitBtn").getAttribute("data-id");
    editJob(jobId);
  }
});

$(".alertDeleteBtn").addEventListener("click", () => {
  const jobId = $(".alertDeleteBtn").getAttribute("data-id");
  deleteJob(jobId);
  showElement($("footer"));
});

$(".alertCancelBtn").addEventListener("click", () => {
  hideElement($("#alert"));
  window.location.href = "index.html";
});

$(".searchBtn").addEventListener("click", (e) => {
  e.preventDefault(e);
  getJobs()
    .then((data) => generateCards(filterJobs(data)))
    .catch(() => alert(`No se encontraron resultados`));
});

$(".clearBtn").addEventListener("click", (e) => {
  $(".formSearch").reset();
  $(".cardsJobs").innerHTML = "";
  window.location.href = "index.html";
});

$(".cancelEditJobBtn").addEventListener("click", (e) => {
  e.preventDefault(e);
  hideElement($("#editJobForm"));
  $(".oneJob").classList.add("min-h-screen");
});

$(".navbarBurguer").addEventListener("click", () => {
  $(".navbarMenu").classList.remove("hidden");
  hideElement($(".navbarBurguer"));
  showElement($(".xmark"));
});

$(".xmark").addEventListener("click", () => {
  $(".navbarMenu").classList.add("hidden");
  showElement($(".navbarBurguer"));
  hideElement($(".xmark"));
});
