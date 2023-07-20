/* eslint-disable */
function Card({ pokemon }) {
  return (
    <div className="globalContainer card">
      <div className="firstRow">
        <div className="firstColumn">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`${pokemon.name}`}
          />
          <hr />
        </div>
        <div className="lastColumn">
          <h3>{pokemon.name}</h3>
          <p>Type: {pokemon.types[0].type.name}</p>
          {pokemon.types[1] ? <p>Type: {pokemon.types[1].type.name}</p> : null}
        </div>
      </div>
      <div className="lastRow">
        <button type="button" className="button">
          Catch this pokemon !
        </button>
      </div>
    </div>
  );
}

export default Card;
