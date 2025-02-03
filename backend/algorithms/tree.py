class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def dfs(root):
    if root:
        print(root.value)
        dfs(root.left)
        dfs(root.right)
