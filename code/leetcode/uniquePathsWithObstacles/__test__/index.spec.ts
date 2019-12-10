import uniquePathsWithObstaclesByDP from "./../dp"

it("test uniquePathsWithObstaclesByDP", () => {
  // console.log(
  //   uniquePathsWithObstaclesByDP([
  //     [0, 0, 0],
  //     [0, 1, 0],
  //     [0, 0, 0],
  //   ])
  // )

  console.log(
    uniquePathsWithObstaclesByDP([
      [0, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ])
  )
})
