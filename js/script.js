// Functions of selectors
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Global Helper Functions
const hideElement = (selector) => selector.classList.add("hidden")
const showElement = (selector) => selector.classList.remove("hidden")

//Functions GET, POST, PUT, DELETE

const getJobs = async (jobId = "") => {
    const response = await fetch(`https://637e11219c2635df8f97fc19.mockapi.io/jobs/${jobId}`)
    const jobs = await response.json()
    return jobs
}

getJobs().then(data => generateCards(data))


const addJob = () => {
    fetch("https://637e11219c2635df8f97fc19.mockapi.io/jobs", {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveJob())
    }).finally(() => window.location.href = "index.html")
}

const editJob = (jobId) => {
    fetch(`https://637e11219c2635df8f97fc19.mockapi.io/jobs/${jobId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(saveEditJob())
    }).finally(() => window.location.href = "index.html")
}

const saveJob = () => {
    return {
        name: $("#jobTitle").value,
        image: $("#jobImg").value,
        description: $("#description").value,
        location: $("#locationForm").value,
        speciality: $("#specialityForm").value,
        experience: $("#experienceForm").value,
        review: $("#review").value
    }
}

const saveEditJob = (job) => {
    showElement($("#editJob"))
    $("#jobEditTitle").value = job.name
    $("#jobEditImg").value = job.image
    $("#editDescription").value = job.description
    $("#editLocationForm").value = job.location
    $("#editSpecialityForm").value = job.speciality
    $("#editExperienceForm").value = job.experience
    $("#editReview").value = job.review
}

//DOM
const generateCards = (jobs) => {
        setTimeout(() => {
            hideElement($(".spinner"))
            for (const { name, image, review, location, experience, speciality, id } of jobs) {
                $(".cardsJobs").innerHTML += `
                <div class="cardJob lg:w-1/4 md:w-2/4 w-4/4 p-2 rounded border-2 border-stone-400 ml-2 mt-2">
                    <h1 class="text-xl">${name}</h1>
                    <img src="${image}" class="mt-2 w-full" alt="alimentos veganos">
                    <p class="mt-2 w-full">${review}</p>
                    <div class="flex mt-2 justify-between w-full max-[300px]:flex-col">
                        <span class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded w-1/3 max-[300px]:w-2/3">${location}</span>
                        <span
                        class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${speciality}</span>
                        <span
                        class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${experience}</span>
                    </div>
                    <button
                    class="detailsBtn mt-2 px-4 py-2 text-white bg-[#DC3535] mr-2 rounded transition duration-100 cursor-pointer focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Ver
                    detalles</button>
                </div>
                `
            }
            for (const btn of $$(".detailsBtn")) {
                btn.addEventListener("click", () => {
                    // hideElement($(".mainContainer"))
                    const jobId = btn.getAttribute("data-id")
                    // $("#submit-edit").setAttribute("data-id", jobId)
                    getJobs(jobId).then(data => generateOneCard(data))
                })
            }

        }, 2000)
        
}

const generateOneCard = (job) => {
    $(".cardsJobs").innerHTML = ""
    showElement($(".spinner"))
    setTimeout(() => {
        hideElement($(".spinner"))
        const { name, image, review, location, experience, speciality, id, description } = job
        $(".oneJob").innerHTML = `
                <div class="cardJob w-3/5 p-2 rounded border-2 border-stone-400 ml-2 mt-2">
                    <h1 class="text-xl">${name}</h1>
                    <img src="${image}" class="mt-2 w-full" alt="alimentos veganos">
                    <p class="mt-2 w-full">${review}</p>
                    <p class="mt-2 w-full">${description}</p>
                    <div class="flex mt-2 justify-between w-full max-[300px]:flex-col">
                        <span class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded w-1/3 max-[300px]:w-2/3">${location}</span>
                        <span
                        class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${speciality}</span>
                        <span
                        class="bg-[#FF9F9F] text-center text-black xl:text-sm text-xs font-bold px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${experience}</span>
                    </div>
                    <button
                    class="editBtn mt-2 px-4 py-2 text-white bg-[#DC3535] mr-2 rounded transition duration-100 cursor-pointer focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Editar</button>
                    <button
                    class="deleteBtn mt-2 px-4 py-2 text-white bg-[#DC3535] mr-2 rounded transition duration-100 cursor-pointer focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Eliminar</button>
                </div>
            `
            for (const btn of $$(".editBtn")) {
                btn.addEventListener("click", () => {
                    // hideElement($(".mainContainer"))
                    showElement($("#editJob"))
                    const jobId = btn.getAttribute("data-id")
                    // $("#submit-edit").setAttribute("data-id", jobId)
                    getJobs(jobId).then(data => saveEditJob(data))
                })
            }
        
    }, 2000)
}

//Filters



// Events

$(".addJob").addEventListener("click", () => {
    hideElement(($(".mainContainer")))
    showElement($("#newJob"))
})

$(".formNewJob").addEventListener("submit", (e) => {
    e.preventDefault()
    addJob()
})

// getJobs().then(data => generateCards(filtros(data))

// const filtros = (data) => {
//     const filter = data
//     search(filter)
// }
