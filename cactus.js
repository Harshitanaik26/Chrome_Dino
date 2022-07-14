import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomPropety.js"

const SPEED = .05
const CACTUS_INTERVAL_MINIMUM = 500
const CACTUS_INTERVAL_MAXIMUM = 2000
const worldElem = document.querySelector('[data-world]')


let nextCactusTime
export function setupCactus()
{
    nextCactusTime = CACTUS_INTERVAL_MINIMUM
    document.querySelectorAll('[data-cactus]').forEach(cactus=>{
        cactus.remove()
    })
}

export function updateCactus(delta,speedScale)
{

    document.querySelectorAll('[data-cactus]').forEach(cactus=>{
        incrementCustomProperty(cactus,"--left",delta*speedScale*SPEED*-1)
        if(getCustomProperty(cactus,"--left")<=-100){
            cactus.remove()
        }
    })

    if(nextCactusTime <= 0)
    {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MINIMUM,CACTUS_INTERVAL_MAXIMUM)/speedScale
    }
    nextCactusTime -= delta
}

export function getCactusRects()
{
    return [...document.querySelectorAll('[data-cactus]')].map(cactus=>{
        return cactus.getBoundingClientRect()
    })
}

function createCactus()
{
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true 
    cactus.src = "images/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldElem.append(cactus)
}

function randomNumberBetween(min,max)
{
    return Math.floor(Math.random() * (max-min+1)+min)
}