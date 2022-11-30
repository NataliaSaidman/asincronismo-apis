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

getJobs(jobId = "").then(data => {
    if(jobId === ""){
        generateCards(data)
    } else {
        generateOneCard(data)
    }
    })

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
        location: $("#location").value,
        speciality: $("#speciality").value,
        experience: $("#experience").value,
        review: $("#review").value
    }
}

//DOM
const generateCards = (jobs) => {
    if (jobs) {
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
        }, 2000)
    }
    for (const btn of $$(".detailsBtn")) {
        btn.addEventListener("click", () => {
            hideElement($(".mainContainer"))
            const jobId = btn.getAttribute("data-id")
            // $("#submit-edit").setAttribute("data-id", jobId)
            getJobs(jobId)
        })
    }
}

const generateOneCard = (job) => {
    if (job) {
        setTimeout(() => {
            hideElement($(".spinner"))
            const { name, image, review, location, experience, speciality, id, description } = job
                $(".cardsJobs").innerHTML = `
                <div class="cardJob lg:w-1/4 md:w-2/4 w-4/4 p-2 rounded border-2 border-stone-400 ml-2 mt-2">
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
            
        }, 2000)
} }
// Events

$(".addJob").addEventListener("click", () => {
    hideElement(($(".mainContainer")))
    showElement($("#newJob"))
})

$(".formNewJob").addEventListener("submit", (e) => {
    e.preventDefault()
    addJob()
})