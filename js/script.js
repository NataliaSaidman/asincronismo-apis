// Functions of selectors
const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// Global Helper Functions
const hideElement = (selector) => selector.classList.add("d-none")
const showElement = (selector) => selector.classList.remove("d-none")

//Functions GET, POST, PUT, DELETE

const getJobs = async () => {
    const response = await fetch("https://637e11219c2635df8f97fc19.mockapi.io/jobs")
    const jobs = await response.json()
    return jobs
}

getJobs().then(data => generateCards(data))

const generateCards = (jobs) => {
    for(const {name, image, review, location, experience, speciality,id} of jobs){
        $(".cardsJobs").innerHTML += `
        <div class="cardJob lg:w-1/5 md:w-2/4 w-4/4 p-2 rounded border-2 border-stone-400 ml-2 mt-2">
            <h1 class="text-xl">${name}</h1>
            <img src="${image}" class="mt-2 w-full" alt="alimentos veganos">
            <p class="mt-2 w-60">${review}</p>
            <div class="flex mt-2 justify-between max-[300px]:flex-col">
                <span class="bg-[#FF9F9F] text-black px-2 py-1 rounded w-1/3 max-[300px]:w-2/3">${location}</span>
                <span
                class="bg-[#FF9F9F] text-black px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${speciality}</span>
                <span
                class="bg-[#FF9F9F] text-black px-2 py-1 rounded  w-1/3 ml-1 max-[300px]:w-2/3 max-[300px]:ml-0 max-[300px]:mt-2">${experience}</span>
            </div>
            <button
            class="detailsBtn mt-2 px-4 py-2 text-white bg-[#DC3535] mr-2 rounded transition duration-100 cursor-pointer focus:outline-none focus:ring focus:ring-violet-300" data-id="${id}">Ver
            detalles</button>
        </div>
        `
    }
}