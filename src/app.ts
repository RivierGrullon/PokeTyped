const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 100;

interface IPokemon {
  id: number;
  name: string;
  image: string;
  type: string;
}

const fetchPokeData = (): void => {
  for (let i = 0; i <= pokemons; i++) {
    getPokemon(i);
  }
};

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokeType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");
  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokeType,
  };

  showPokemon(transformedPokemon);
};

const showPokemon = (pokemon: IPokemon): void => {
  let output: string = `
          <div class="card">
              <span class="card--id">#${pokemon.id}</span>
              <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
              <h1 class="card--name">${pokemon.name}</h1>
              <span class="card--details">${pokemon.type}</span>
          </div>
      `;
  container.innerHTML += output;
};

fetchPokeData();
