import sys
import random

ret = ''

for x in range(5):
	x = random.randint(10, 30);
	ret += ',' + str(x)

print(ret)
sys.stdout.flush()