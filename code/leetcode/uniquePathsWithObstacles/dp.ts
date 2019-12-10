/**
 * @description
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 * @example
 * 输入:
 * [
 *  [0,0,0,1],
 *  [0,0,0,0],
 *  [0,0,1,0]
 * ]
 * 输出: 2
 * @param {number[][]} obstacleGrid
 * @return {number}
 * f(i, j) = f(i - 1, j) + f(i, j - 1)
 */
const uniquePathsWithObstaclesByDP = function(
  obstacleGrid: Array<Array<number>>
) {
  if (obstacleGrid[0][0] === 1) return 0
  // 初始化 dp
  const rowLen = obstacleGrid.length
  const colLen = obstacleGrid[0].length

  if (rowLen === 1) return obstacleGrid[0].includes(1) ? 0 : 1
  if (colLen === 1) return obstacleGrid.find(item => item.includes(1)) ? 0 : 1

  const dp = new Array(rowLen).fill(new Array(colLen).fill(0))

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      const curr = obstacleGrid[i][j]
      if (i === 0 && j === 0) {
        dp[i][j] = 1
      } else {
        if (i === 0) {
          dp[i][j] = curr === 0 ? dp[i][j - 1] : 0
        } else if (j === 0) {
          dp[i][j] = curr === 0 ? dp[i - 1][j] : 0
        } else {
          dp[i][j] = curr === 0 ? dp[i][j - 1] + dp[i - 1][j] : 0
        }
      }
    }
  }

  return dp[rowLen - 1][colLen - 1]
}

export default uniquePathsWithObstaclesByDP
