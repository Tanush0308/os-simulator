# Process P4 — prime checker
print("P4 starting...")
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0: return False
    return True

for n in range(1, 20):
    if is_prime(n):
        print(f"Prime: {n}")
print("P4 done.")
