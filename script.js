var arr = [[1, 2, 2, 5], [1, 100, 101, 102], [3, 3, 1, 5], [5, 5, 5, 5]];
//var arr = [[2, 2, 2, 2], [2, 2, 2, 2]];

function findMinimum(cost, indexMatrix, indexUnavailable) {
  if (cost.length === 1) {
    if (indexUnavailable !== indexMatrix[0][0]) {
      return cost[0][indexMatrix[0][0]];
    } else {
      return cost[0][indexMatrix[0][1]];
    }
  } else {
    if (indexUnavailable !== indexMatrix[0][0]) {
      return (
        cost[0][indexMatrix[0][0]] +
        findMinimum(cost.slice(1), indexMatrix.slice(1), indexMatrix[0][0])
      );
    } else {
      return (
        cost[0][indexMatrix[0][1]] +
        findMinimum(cost.slice(1), indexMatrix.slice(1), indexMatrix[0][1])
      );
    }
  }
}

function solution(cost) {
  if (cost.length === 1) {
    return Math.min(...cost[0]);
  } else {
    var indexMatrix = [];
    for (var i = 0; i < cost.length; i++) {
      firstMin = Number.POSITIVE_INFINITY;
      firstMinIndex = -1;

      secondMin = Number.POSITIVE_INFINITY;
      secondMinIndex = -1;

      for (var j = 0; j < cost[i].length; j++) {
        if (cost[i][j] <= firstMin) {
          secondMin = firstMin;
          secondMinIndex = firstMinIndex;

          firstMin = cost[i][j];
          firstMinIndex = j;
        } else {
          if (cost[i][j] <= secondMin) {
            secondMin = cost[i][j];
            secondMinIndex = j;
          }
        }
      }

      indexMatrix[i] = [firstMinIndex, secondMinIndex];
    }

    return Math.min(
      cost[0][indexMatrix[0][0]] +
        findMinimum(cost.slice(1), indexMatrix.slice(1), indexMatrix[0][0]),
      cost[0][indexMatrix[0][1]] +
        findMinimum(cost.slice(1), indexMatrix.slice(1), indexMatrix[0][1])
    );
  }
}

console.log(solution(arr));
