import React, { useEffect, useState } from "react";
import Axios from "axios";
import './index.css'
export default function Pokedex() {

    let generations = {
        gen0: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898",
        gen1: "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151",
        gen2: "https://pokeapi.co/api/v2/pokemon/?offset=151&limit=100",
        gen3: "https://pokeapi.co/api/v2/pokemon/?offset=251&limit=134",
        gen4: "https://pokeapi.co/api/v2/pokemon/?offset=386&limit=107",
        gen5: "https://pokeapi.co/api/v2/pokemon/?offset=493&limit=156",
        gen6: "https://pokeapi.co/api/v2/pokemon/?offset=649&limit=72",
        gen7: "https://pokeapi.co/api/v2/pokemon/?offset=721&limit=88",
        gen8: "https://pokeapi.co/api/v2/pokemon/?offset=809&limit=89",
    };

    let colorType = {
        grass: "#27CB50",
        poison: "#5E2D89",
        fighting: "#EF6239",
        flying: "#94B2C7",
        water: "#0E51E2",
        fire: "#AA1B1F",
        dragon: "#448A95",
        dark: "#040707",
        ice: "#D8F0FA",
        psychic: "#F71D92",
        ghost: "#5E2D89",
        bug: "#3C9950",
        electric: "#FAFA72",
        fairy: "#E91368",
        ground: "#A8702D",
        rock: "#8B3E22",
        steel: "#43BD94",
        normal: "#75525C",
    }

    const [ids, setIds] = useState([]);
    const [ability, setAbility] = useState([]);
    const [abilityUrl, setAbilityUrl] = useState([]);
    const [abilityDescription, setAbilityDescription] = useState([]);
    const [idPokemon, setIdPokemon] = useState(1)
    const [status, setStatus] = useState({
        hp: "",
        atk: "",
        spatk: "",
        def: "",
        spdef: "",
        spe: "",
        img: "",
        nome: "",
        heightt: "",
        weight: "",
        types: [],
        description: "",
    });

    useEffect(() => {
        // Gera a lista de pokemons existentes na geração escolhida
        async function getPokemonList() {
            const res = await Axios.get(`${generations.gen1}`);
            const urls = res.data["results"].map((e) => e.url);
            setIds(urls.map((e) => e.split("/")[e.split("/").length - 2]));
            getPokemonChoosen(); 
        };
        // Pega os dados do pokémon escolhido pelo State
        async function getPokemonChoosen() {
            
            const search = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            const searchSpecies = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idPokemon}`)

            setAbility(search.data.abilities)
            setAbilityUrl(search.data.abilities.map(e => e.ability.url))
            setStatus({
                hp: search.data.stats[0].base_stat,
                atk: search.data.stats[1].base_stat,
                spatk: search.data.stats[3].base_stat,
                def: search.data.stats[2].base_stat,
                spdef: search.data.stats[4].base_stat,
                spe: search.data.stats[5].base_stat,
                img: search.data.sprites.front_default,
                nome: search.data.name[0].toLocaleUpperCase() + search.data.name.substring(1),
                heightt: search.data.height,
                weight: search.data.weight,
                types: search.data.types.map((e) => e.type.name),
                description: searchSpecies.data.flavor_text_entries[0].flavor_text,
            })
            getAbilityDescription();
        }
        async function getAbilityDescription() {
            let arr = []
            if (abilityUrl.length == 3) {
                let ability = await Axios.get(`${abilityUrl[0]}`)
                let ability2 = await Axios.get(`${abilityUrl[1]}`)
                let ability3 = await Axios.get(`${abilityUrl[2]}`)
                let desc = ability.data.flavor_text_entries[0].flavor_text
                let desc2 = ability2.data.flavor_text_entries[0].flavor_text
                let desc3 = ability3.data.flavor_text_entries[0].flavor_text
                arr.push(desc)
                arr.push(desc2)
                arr.push(desc3)
            } else if (abilityUrl.length == 2) {
                let ability = await Axios.get(`${abilityUrl[0]}`)
                let ability2 = await Axios.get(`${abilityUrl[1]}`)
                let desc = ability.data.flavor_text_entries[0].flavor_text
                let desc2 = ability2.data.flavor_text_entries[0].flavor_text
                arr.push(desc)
                arr.push(desc2)
            } else if (abilityUrl.length == 1) {
                let ability = await Axios.get(`${abilityUrl[0]}`)
                let desc = ability.data.flavor_text_entries[0].flavor_text
                arr.push(desc)
            }
            setAbilityDescription(arr)
        }
        getPokemonList();
    }, [idPokemon,abilityUrl]);

    // Retorna o ID do pokemon escolhido na lista
    function getIdChoosen(id) {
        const IdChoosen = id.target.getAttribute("id");
        setIdPokemon(parseInt(IdChoosen))
    }

    return (
        <>
            <div className="pokedex">
                <div className="container-esquerdo">
                    <h1> Pokémon List </h1>{" "}
                    <div className="lista-Pokemon">
                        {ids.map((e) => (
                            <div className="item">
                                <img
                                    id={e}
                                    onClick={getIdChoosen}
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e}.png`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container-direito">
                    <div className="juncao">
                        <div className="display">
                            <h1>{status.nome}</h1>

                            <div className="imagem">
                                <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${("000" + idPokemon).slice(-3)}.png`} />
                            </div>

                            <div className="status2">
                                <h2 className="item2">№: #{idPokemon}</h2>
                                <h2 className="item2">Altura:{status.heightt}</h2>
                                <h2 className="item2">Type: {status.types.map(e =>
                                    (<p className="types" style={{ backgroundColor: `${colorType.[e]}` }}>{e.toLocaleUpperCase()}</p>))}</h2>
                                <h2 className="item2">Peso:{status.weight}</h2>
                            </div>

                        </div>
                        <div className="status">
                            <h1>Status</h1>
                            <div className="status-item hp">
                                <p>{status.hp}</p>
                                <p>Hp</p>
                            </div>
                            <div className="status-item atk">
                                <p>{status.atk}</p>
                                <p>Atk</p>
                            </div>
                            <div className="status-item spatk">
                                <p>{status.spatk}</p>
                                <p>SpAtk</p>
                            </div>
                            <div className="status-item def">
                                <p>{status.def}</p>
                                <p>Def</p>
                            </div>
                            <div className="status-item spdef">
                                <p>{status.spdef}</p>
                                <p>SpDef</p>
                            </div>
                            <div className="status-item spe">
                                <p>{status.spe}</p>
                                <p>Spe</p>
                            </div>
                        </div>
                    </div>
                    <div className="description-container">

                        <div className="description">
                            <h1 className="tittle">Description</h1>
                            <p>{status.description}</p>
                        </div>

                        <div className="abilities">
                            <h1 className="tittle">Abilities</h1>
                            {ability.map((e, number) =>
                            (
                                <>
                                    <div className="ability">
                                        <div className="tittle-ab"><h1>{e.ability.name[0].toLocaleUpperCase() + e.ability.name.substring(1).replace("-", " ")}</h1> <h1>{e.is_hidden ? "Hidden Ability" : "Ability"}</h1></div>
                                        <p>{abilityDescription[number]}</p>
                                    </div>
                                </>
                            ))}

                        </div>
                    </div>
                    <div className="evo-chain">
                            <h1 className="tittle">Evolution Chain</h1>
                    </div>
                </div>
            </div>
        </>
    )
}