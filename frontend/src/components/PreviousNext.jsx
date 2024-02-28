/* eslint-disable */

function PreviousNext({
  currentPage,
  setCurrentPage,
  numberOfPages,
  isNextAvailable,
  isPreviousAvailable,
  startFetching,
  setStartFetching,
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
          setStartFetching(startFetching + 1);
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
            setCurrentPage(currentPage - 1);
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setStartFetching(startFetching + 1);
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
            setCurrentPage(currentPage + 1);
            setStartFetching(startFetching + 1);
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
          setStartFetching(startFetching + 1);
        }}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default PreviousNext;
