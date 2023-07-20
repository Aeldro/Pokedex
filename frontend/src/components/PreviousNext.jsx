/* eslint-disable */

function PreviousNext({
  isNextAvailable,
  isPreviousAvailable,
  getPreviousPokemonsList,
  getNextPokemonsList,
}) {
  return (
    <div className="previousNext">
      <button
        type="button"
        className={`button ${!isPreviousAvailable ? "disabled" : ""}`}
        onClick={() => {
          if (isPreviousAvailable) {
            getPreviousPokemonsList();
          }
        }}
      >
        Previous
      </button>
      <button
        type="button"
        className={`button ${!isNextAvailable ? "disabled" : ""}`}
        onClick={() => {
          if (isNextAvailable) {
            getNextPokemonsList();
          }
        }}
      >
        Next
      </button>
    </div>
  );
}

export default PreviousNext;
