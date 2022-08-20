import axios from "axios";
import Swal from "sweetalert2";
import _ from "lodash";
import { frases } from "./pkFrases";

const form = document.getElementById("form") as HTMLFormElement;

const divStats = document.getElementById("cardPokemons") as HTMLDivElement;

async function obterDadosPokemon(nomePokemon: string) {
  try { // Feliz
    const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`, {responseType: "json"});

    const pokemon = resposta.data;
    
    const pId = document.createElement("p");
    pId.innerText = pokemon.id;

    const pNome = document.createElement("p");
    pNome.innerText = _.upperFirst(pokemon.name);

    const pFoto = document.createElement("img");
    pFoto.src = pokemon.sprites.front_default;

    while(divStats.firstChild) 
      divStats.firstChild.remove();

    Swal.fire({
      background: "#19191a",
      footer: frases[Math.floor(Math.random() * 8)],
      confirmButtonText: _.upperFirst(pokemon.name),
      imageUrl: pokemon.sprites.front_default
    });

    divStats.appendChild(pId);
    divStats.appendChild(pNome);
    divStats.appendChild(pFoto);

  } catch (error) { // Trist
    Swal.fire({
      title: "Falha 404 x_x",
      text: "Algo deu errado! :(",
      icon: "error"
    });
  }
}

form.addEventListener("submit", (evt: SubmitEvent) => {
  evt.preventDefault();

  const nomePokemon = document.getElementById("txtNomePokemon") as HTMLInputElement;

  if(nomePokemon.value === "") {
    Swal.fire({
      text: "É preciso informar um nome!",
      icon: "warning"
    });
    return;
  }

  obterDadosPokemon(nomePokemon.value.toLowerCase());
});