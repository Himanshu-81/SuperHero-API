// https://superheroapi.com/api/access-token/character-id

const heroButton = document.getElementById('heroButton')
const heroImageDiv = document.getElementById('heroImage')
const searchButton = document.getElementById('searchHero')
const searchInput = document.getElementById('searchInput')

const SUPERHERO_TOKEN = '1575817329604250'
const BASE_URL =
  `https://superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const getSuperHero = (id, name) => {
  // name => base_url/search/heroname
  // json.results[0].image.url

  // id =>base_url/id
  // json.image.url


  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      console.log(json.powerstats)
      const superHero = json
      showHeroInfo(superHero)
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '🚄',
  durability: '🏋',
  power: '⚡',
  combat: '⚔️'
}

const showHeroInfo = (character) => {
  const name = `<h1>${character.name}</h2>`
  const img = `<img src="${character.image.url}" height = 200 width = 200/>`
  const stats = Object.keys(character.powerstats).map(stat => {
    return `<h4>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</h4>`
  }).join('')
  
  heroImageDiv.innerHTML = `${name}${img}${stats}`
}

const getSearchSuperHero = (name) => {
  console.log(searchInput.value)
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      const stats = showHeroInfo(hero)
    })
}

const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1
}

heroButton.onclick = () => getSuperHero(randomHero())

searchButton.onclick = () => getSearchSuperHero(searchInput.value)

