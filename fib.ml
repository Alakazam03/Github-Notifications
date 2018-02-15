let rec fib n =
	if n==1 || n==0 then n
	else fib(n-1) + fib(n-2)

print_int fib 5;;