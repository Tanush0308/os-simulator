# Process P2 — fibonacci sequence
print("P2 starting...")
a, b = 0, 1
for _ in range(8):
    print(f"fib: {a}")
    a, b = b, a + b
print("P2 done.")
