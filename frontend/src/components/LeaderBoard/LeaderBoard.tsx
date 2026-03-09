import { useGetTopScores } from "../../api/hooks/useGetTopScores"


export const LeaderBoard = () => {
  const { topScores } = useGetTopScores() 


console.log(topScores);


  return (
    <div className="card shadow-sm" style={{ maxWidth: "400px", margin: "auto" }}>
      <div className="card-header text-center fw-bold">
        Leaderboard
      </div>

      <ul className="list-group list-group-flush">
        {topScores.length !== 0 ? (
          <div>
            you are the first to play
          </div>
        ) : topScores.map((userScore, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">{index + 1}</span>
              <span>{userScore.name}</span>
            </div>

            <span className={`badge bg-${index < 2 ? "success" : "secondary" } rounded-pill`}>
              {userScore.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

