function climbStairs(n) {
    if (n <= 2) {
        return n;
    }
    
    let prev1 = 1;
    let prev2 = 2;
    let current = 0;
    
    for (let i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return current;
}

const n1 = 2;
console.log(climbStairs(n1)); // Output: 2

const n2 = 3;
console.log(climbStairs(n2)); // Output: 3
