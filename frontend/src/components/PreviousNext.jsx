/* eslint-disable */

function PreviousNext({
  currentPage,
  setCurrentPage,
  numberOfPages,
  isNextAvailable,
  isPreviousAvailable,
  getPreviousPokemonsList,
  getNextPokemonsList,
}) {
  return (
    <div className="previousNext">
      <button
        type="button"
        className={`numberButton ${
          !isPreviousAvailable ? "numberDisabled" : ""
        }`}
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        &lt;&lt;
      </button>

      <button
        type="button"
        className={`numberButton ${
          !isPreviousAvailable ? "numberDisabled" : ""
        }`}
        onClick={() => {
          if (isPreviousAvailable) {
            getPreviousPokemonsList();
          }
        }}
      >
        &lt;
      </button>

      {currentPage - 3 > 0 ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage - 3);
          }}
        >
          {currentPage - 3}
        </button>
      ) : null}

      {currentPage - 2 > 0 ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage - 2);
          }}
        >
          {currentPage - 2}
        </button>
      ) : null}

      {currentPage - 1 > 0 ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          {currentPage - 1}
        </button>
      ) : null}

      <button type="button" className="numberButton numberDisabled">
        {currentPage}
      </button>

      {currentPage + 1 <= numberOfPages ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          {currentPage + 1}
        </button>
      ) : null}

      {currentPage + 2 <= numberOfPages ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage + 2);
          }}
        >
          {currentPage + 2}
        </button>
      ) : null}

      {currentPage + 3 <= numberOfPages ? (
        <button
          type="button"
          className="numberButton"
          onClick={() => {
            setCurrentPage(currentPage + 3);
          }}
        >
          {currentPage + 3}
        </button>
      ) : null}

      <button
        type="button"
        className={`numberButton ${!isNextAvailable ? "numberDisabled" : ""}`}
        onClick={() => {
          if (isNextAvailable) {
            getNextPokemonsList();
          }
        }}
      >
        &gt;
      </button>

      <button
        type="button"
        className={`numberButton ${!isNextAvailable ? "numberDisabled" : ""}`}
        onClick={() => {
          setCurrentPage(numberOfPages);
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default PreviousNext;
