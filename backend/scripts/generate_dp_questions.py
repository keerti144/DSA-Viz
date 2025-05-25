import json

questions = [
    # Easy Debugging
    {
        "type": "debugging",
        "question": "Identify the bug in this Fibonacci code snippet:\n\n```python\ndef fib(n):\n  if n <= 1:\n    return n\n  return fib(n-1) + fib(n-2)\n\ncache = {}\nprint(fib(5))\n```",
        "code": "def fib(n):\n  if n <= 1:\n    return n\n  return fib(n-1) + fib(n-2)\n\ncache = {}\nprint(fib(5))",
        "answer": "The code lacks memoization to optimize repeated calls, so cache is unused.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["fibonacci", "memoization", "optimization"],
        "explanation": "Although cache dictionary is defined, it's never used; hence the function is exponential instead of linear time."
    },
    {
        "type": "debugging",
        "question": "What's wrong with this code for computing the nth Fibonacci number using DP?\n\n```python\ndp = [0]*n\ndp[0] = 0\ndp[1] = 1\nfor i in range(2, n):\n  dp[i] = dp[i-1] + dp[i-2]\nprint(dp[n])\n```",
        "code": "dp = [0]*n\ndp[0] = 0\ndp[1] = 1\nfor i in range(2, n):\n  dp[i] = dp[i-1] + dp[i-2]\nprint(dp[n])",
        "answer": "IndexError: dp[n] is out of range because dp has indices 0 to n-1; print should be dp[n-1].",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["index error", "array bounds"]
    },
    {
        "type": "debugging",
        "question": "Why does this climbing stairs code fail for n=0?\n\n```python\ndef climbStairs(n):\n  dp = [0]*(n+1)\n  dp[1] = 1\n  dp[2] = 2\n  for i in range(3, n+1):\n    dp[i] = dp[i-1] + dp[i-2]\n  return dp[n]\n\nprint(climbStairs(0))\n```",
        "code": "def climbStairs(n):\n  dp = [0]*(n+1)\n  dp[1] = 1\n  dp[2] = 2\n  for i in range(3, n+1):\n    dp[i] = dp[i-1] + dp[i-2]\n  return dp[n]\n\nprint(climbStairs(0))",
        "answer": "IndexError: dp[1] and dp[2] assignments fail when n < 2; need base case handling.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["index error", "base case"]
    },
    {
        "type": "debugging",
        "question": "Find the bug in this minimum path sum DP code:\n\n```python\ndef minPathSum(grid):\n  m, n = len(grid), len(grid[0])\n  dp = [[0]*n for _ in range(m)]\n  dp[0][0] = grid[0][0]\n  for i in range(1, m):\n    dp[i][0] = dp[i-1][0] + grid[i][0]\n  for j in range(1, n):\n    dp[0][j] = dp[0][j-1] + grid[0][j]\n  for i in range(1, m):\n    for j in range(1, n):\n      dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]\n  return dp[m][n]\n```",
        "code": "def minPathSum(grid):\n  m, n = len(grid), len(grid[0])\n  dp = [[0]*n for _ in range(m)]\n  dp[0][0] = grid[0][0]\n  for i in range(1, m):\n    dp[i][0] = dp[i-1][0] + grid[i][0]\n  for j in range(1, n):\n    dp[0][j] = dp[0][j-1] + grid[0][j]\n  for i in range(1, m):\n    for j in range(1, n):\n      dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]\n  return dp[m][n]",
        "answer": "IndexError: dp[m][n] is out of range; max indices are dp[m-1][n-1]. Should return dp[m-1][n-1].",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["index error", "2d dp"]
    },
    {
        "type": "debugging",
        "question": "Find the bug in this coin change count ways code:\n\n```python\ndef coinChange(coins, amount):\n  dp = [0]*(amount+1)\n  dp[0] = 1\n  for coin in coins:\n    for x in range(coin, amount+1):\n      dp[x] += dp[x-coin]\n  return dp[amount]\n\nprint(coinChange([1,2,5], 5))\n```",
        "code": "def coinChange(coins, amount):\n  dp = [0]*(amount+1)\n  dp[0] = 1\n  for coin in coins:\n    for x in range(coin, amount+1):\n      dp[x] += dp[x-coin]\n  return dp[amount]\n\nprint(coinChange([1,2,5], 5))",
        "answer": "No bug, code correctly computes the number of ways.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["coin change", "count ways"]
    },
    {
        "type": "debugging",
        "question": "Why does this max subsequence sum code fail?\n\n```python\ndef maxSubArray(nums):\n  max_sum = nums[0]\n  current_sum = 0\n  for num in nums:\n    current_sum += num\n    max_sum = max(max_sum, current_sum)\n    if current_sum < 0:\n      current_sum = 0\n  return max_sum\n\nprint(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))\n```",
        "code": "def maxSubArray(nums):\n  max_sum = nums[0]\n  current_sum = 0\n  for num in nums:\n    current_sum += num\n    max_sum = max(max_sum, current_sum)\n    if current_sum < 0:\n      current_sum = 0\n  return max_sum\n\nprint(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))",
        "answer": "No bug, Kadane's algorithm is correctly implemented.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["max subarray", "kadane"]
    },
    {
        "type": "debugging",
        "question": "Bug in this stair climbing code:\n\n```python\ndef climbStairs(n):\n  dp = [0]*(n+1)\n  dp[0] = 1\n  for i in range(1, n+1):\n    dp[i] = dp[i-1] + (dp[i-2] if i > 1 else 0)\n  return dp[n]\n\nprint(climbStairs(3))\n```",
        "code": "def climbStairs(n):\n  dp = [0]*(n+1)\n  dp[0] = 1\n  for i in range(1, n+1):\n    dp[i] = dp[i-1] + (dp[i-2] if i > 1 else 0)\n  return dp[n]\n\nprint(climbStairs(3))",
        "answer": "No bug, handles base cases correctly.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["stairs", "dp"]
    },
    {
        "type": "debugging",
        "question": "Fix this code to find max sum of non-adjacent elements:\n\n```python\ndef maxSum(nums):\n  incl = 0\n  excl = 0\n  for num in nums:\n    new_excl = max(incl, excl)\n    incl = excl + num\n    excl = new_excl\n  return max(incl, excl)\n\nprint(maxSum([3,2,7,10]))\n```",
        "code": "def maxSum(nums):\n  incl = 0\n  excl = 0\n  for num in nums:\n    new_excl = max(incl, excl)\n    incl = excl + num\n    excl = new_excl\n  return max(incl, excl)\n\nprint(maxSum([3,2,7,10]))",
        "answer": "No bug, code implements max sum of non-adjacent correctly.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["max sum", "non-adjacent"]
    },
    {
        "type": "debugging",
        "question": "Find the bug in this code for counting ways to make amount:\n\n```python\ndef countWays(coins, amount):\n  dp = [0]*(amount+1)\n  dp[0] = 1\n  for i in range(1, amount+1):\n    for coin in coins:\n      if coin <= i:\n        dp[i] += dp[i-coin]\n  return dp[amount]\n\nprint(countWays([1,2,3], 4))\n```",
        "code": "def countWays(coins, amount):\n  dp = [0]*(amount+1)\n  dp[0] = 1\n  for i in range(1, amount+1):\n    for coin in coins:\n      if coin <= i:\n        dp[i] += dp[i-coin]\n  return dp[amount]\n\nprint(countWays([1,2,3], 4))",
        "answer": "Bug: order of loops causes duplicate counting; outer loop should iterate coins, inner loop amount.",
        "difficulty": "easy",
        "points": 5,
        "topic": "dynamic programming",
        "tags": ["coin change", "count ways", "duplicate counting"]
    },
    # Medium Debugging
    {
        "type": "debugging",
        "question": "Fix the knapsack code which causes an IndexError:\n\n```python\ndef knapsack(weights, values, W):\n  n = len(weights)\n  dp = [[0]*(W+1) for _ in range(n+1)]\n  for i in range(1, n+1):\n    for w in range(1, W+1):\n      if weights[i] <= w:\n        dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i]] + values[i])\n      else:\n        dp[i][w] = dp[i-1][w]\n  return dp[n][W]\n\nprint(knapsack([1,2,3], [10,20,30], 5))\n```",
        "code": "def knapsack(weights, values, W):\n  n = len(weights)\n  dp = [[0]*(W+1) for _ in range(n+1)]\n  for i in range(1, n+1):\n    for w in range(1, W+1):\n      if weights[i] <= w:\n        dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i]] + values[i])\n      else:\n        dp[i][w] = dp[i-1][w]\n  return dp[n][W]\n\nprint(knapsack([1,2,3], [10,20,30], 5))",
        "answer": "IndexError: weights and values are 0-indexed; use weights[i-1], values[i-1] instead of weights[i], values[i].",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["knapsack", "index error"]
    },
    {
        "type": "debugging",
        "question": "Debug climbing stairs code:\n\n```python\ndef climbStairs(n):\n  dp = [0]*(n+1)\n  dp[0] = 1\n  for i in range(1, n+1):\n    dp[i] = dp[i-1] + dp[i-2]\n  return dp[n]\n\nprint(climbStairs(3))\n```",
        "code": "def climbStairs(n):\n  dp = [0]*(n+1)\n  dp[0] = 1\n  for i in range(1, n+1):\n    dp[i] = dp[i-1] + dp[i-2]\n  return dp[n]\n\nprint(climbStairs(3))",
        "answer": "IndexError: dp[i-2] invalid for i=1; need to handle base cases separately.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["index error", "base cases"]
    },
    {
        "type": "debugging",
        "question": "Fix edit distance code with incorrect string indexing:\n\n```python\ndef editDistance(s1, s2):\n  m, n = len(s1), len(s2)\n  dp = [[0]*(n+1) for _ in range(m+1)]\n  for i in range(m+1):\n    dp[i][0] = i\n  for j in range(n+1):\n    dp[0][j] = j\n  for i in range(1, m+1):\n    for j in range(1, n+1):\n      if s1[i] == s2[j]:\n        dp[i][j] = dp[i-1][j-1]\n      else:\n        dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n  return dp[m][n]\n\nprint(editDistance('horse', 'ros'))\n```",
        "code": "def editDistance(s1, s2):\n  m, n = len(s1), len(s2)\n  dp = [[0]*(n+1) for _ in range(m+1)]\n  for i in range(m+1):\n    dp[i][0] = i\n  for j in range(n+1):\n    dp[0][j] = j\n  for i in range(1, m+1):\n    for j in range(1, n+1):\n      if s1[i] == s2[j]:\n        dp[i][j] = dp[i-1][j-1]\n      else:\n        dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n  return dp[m][n]\n\nprint(editDistance('horse', 'ros'))",
        "answer": "IndexError: s1[i] and s2[j] should be s1[i-1], s2[j-1] due to dp offset by 1.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["edit distance", "index error"]
    },
    {
        "type": "debugging",
        "question": "Find bug in rod cutting DP:\n\n```python\ndef rodCutting(prices, n):\n  dp = [0]*(n+1)\n  for i in range(1, n+1):\n    max_val = -1\n    for j in range(i):\n      max_val = max(max_val, prices[j] + dp[i-j-1])\n    dp[i] = max_val\n  return dp[n]\n\nprint(rodCutting([1,5,8,9], 4))\n```",
        "code": "def rodCutting(prices, n):\n  dp = [0]*(n+1)\n  for i in range(1, n+1):\n    max_val = -1\n    for j in range(i):\n      max_val = max(max_val, prices[j] + dp[i-j-1])\n    dp[i] = max_val\n  return dp[n]\n\nprint(rodCutting([1,5,8,9], 4))",
        "answer": "No bug, code correctly implements rod cutting DP.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["rod cutting"]
    },
    {
        "type": "debugging",
        "question": "Debug longest common subsequence:\n\n```python\ndef lcs(s1, s2):\n  m, n = len(s1), len(s2)\n  dp = [[0]*(n+1) for _ in range(m+1)]\n  for i in range(1, m+1):\n    for j in range(1, n+1):\n      if s1[i-1] == s2[j-1]:\n        dp[i][j] = dp[i-1][j-1] + 1\n      else:\n        dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n  return dp[m][n]\n\nprint(lcs('abcde', 'ace'))\n```",
        "code": "def lcs(s1, s2):\n  m, n = len(s1), len(s2)\n  dp = [[0]*(n+1) for _ in range(m+1)]\n  for i in range(1, m+1):\n    for j in range(1, n+1):\n      if s1[i-1] == s2[j-1]:\n        dp[i][j] = dp[i-1][j-1] + 1\n      else:\n        dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n  return dp[m][n]\n\nprint(lcs('abcde', 'ace'))",
        "answer": "No bug, standard LCS DP implemented correctly.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["lcs"]
    },
    {
        "type": "debugging",
        "question": "Bug in coin change minimum coins:\n\n```python\ndef coinChange(coins, amount):\n  dp = [float('inf')]*(amount+1)\n  dp[0] = 0\n  for i in range(1, amount+1):\n    for coin in coins:\n      if i >= coin:\n        dp[i] = min(dp[i], dp[i-coin] + 1)\n  return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(coinChange([1,2,5], 11))\n```",
        "code": "def coinChange(coins, amount):\n  dp = [float('inf')]*(amount+1)\n  dp[0] = 0\n  for i in range(1, amount+1):\n    for coin in coins:\n      if i >= coin:\n        dp[i] = min(dp[i], dp[i-coin] + 1)\n  return dp[amount] if dp[amount] != float('inf') else -1\n\nprint(coinChange([1,2,5], 11))",
        "answer": "No bug, classic coin change minimum coins implemented correctly.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["coin change", "min coins"]
    },
    {
        "type": "debugging",
        "question": "Why does this longest increasing subsequence fail for empty list?\n\n```python\ndef lengthOfLIS(nums):\n  if not nums:\n    return 0\n  dp = [1]*len(nums)\n  for i in range(len(nums)):\n    for j in range(i):\n      if nums[i] > nums[j]:\n        dp[i] = max(dp[i], dp[j] + 1)\n  return max(dp)\n\nprint(lengthOfLIS([]))\n```",
        "code": "def lengthOfLIS(nums):\n  if not nums:\n    return 0\n  dp = [1]*len(nums)\n  for i in range(len(nums)):\n    for j in range(i):\n      if nums[i] > nums[j]:\n        dp[i] = max(dp[i], dp[j] + 1)\n  return max(dp)\n\nprint(lengthOfLIS([]))",
        "answer": "No bug, handles empty input correctly by returning 0.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["LIS", "empty input"]
    },
    {
        "type": "debugging",
        "question": "Fix matrix chain multiplication bug:\n\n```python\ndef matrixChainOrder(p):\n  n = len(p) - 1\n  dp = [[0]*n for _ in range(n)]\n  for l in range(2, n+1):\n    for i in range(n-l+1):\n      j = i + l - 1\n      dp[i][j] = float('inf')\n      for k in range(i, j):\n        dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k]*p[j])\n  return dp[0][n-1]\n\nprint(matrixChainOrder([1,2,3,4]))\n```",
        "code": "def matrixChainOrder(p):\n  n = len(p) - 1\n  dp = [[0]*n for _ in range(n)]\n  for l in range(2, n+1):\n    for i in range(n-l+1):\n      j = i + l - 1\n      dp[i][j] = float('inf')\n      for k in range(i, j):\n        dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k]*p[j])\n  return dp[0][n-1]\n\nprint(matrixChainOrder([1,2,3,4]))",
        "answer": "Bug: multiplication cost uses p[i]*p[k]*p[j], should be p[i]*p[k+1]*p[j].",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["matrix chain", "multiplication cost"]
    },
    {
        "type": "debugging",
        "question": "Debug subset sum problem code:\n\n```python\ndef isSubsetSum(arr, sum):\n  n = len(arr)\n  dp = [[False]*(sum+1) for _ in range(n+1)]\n  for i in range(n+1):\n    dp[i][0] = True\n  for i in range(1, n+1):\n    for j in range(1, sum+1):\n      if arr[i-1] <= j:\n        dp[i][j] = dp[i-1][j] or dp[i-1][j-arr[i-1]]\n      else:\n        dp[i][j] = dp[i-1][j]\n  return dp[n][sum]\n\nprint(isSubsetSum([3,34,4,12,5,2], 9))\n```",
        "code": "def isSubsetSum(arr, sum):\n  n = len(arr)\n  dp = [[False]*(sum+1) for _ in range(n+1)]\n  for i in range(n+1):\n    dp[i][0] = True\n  for i in range(1, n+1):\n    for j in range(1, sum+1):\n      if arr[i-1] <= j:\n        dp[i][j] = dp[i-1][j] or dp[i-1][j-arr[i-1]]\n      else:\n        dp[i][j] = dp[i-1][j]\n  return dp[n][sum]\n\nprint(isSubsetSum([3,34,4,12,5,2], 9))",
        "answer": "No bug, correct DP solution.",
        "difficulty": "medium",
        "points": 10,
        "topic": "dynamic programming",
        "tags": ["subset sum"]
    }
]

with open('../questions/dp_questions.json', 'w') as f:
    json.dump(questions, f, indent=2) 