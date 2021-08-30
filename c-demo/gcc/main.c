#include <stdio.h>

/** gcc -Og -o prog main.c mstore.c
 * 预处理器(main.i) => 编译器(main.s) => 汇编器(main.o) => 链接器(prog)
 * -o prog 表示生成目标可执行文件为 prog
 * */
void mulstore(long, long, long *);

int main()
{
  long d;
  mulstore(2, 3, &d);
  printf("2 * 3--> %ld\n", d);
  return 0;
}

long mult2(long x, long y)
{
  long s = x * y;
  return s;
}
