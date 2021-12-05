#include <stdio.h>

// linux > gcc -Og -S mstore.c 生成汇编文件
// linux > gcc -Og -c mstore.c 生成目标文件
// objdump 反汇编

/**
 * -Og 表示优化代码结构，使其更易读， -O1, -O2...表示优化代码，使其性能更优，但不易读
 * -S 表示生成汇编语言
 * 
 * 
	pushq	%rbp (被调用者保存寄存器)
	movq	%rsp(指向栈顶), %rbp (将栈顶送至 %rbp 中保存)
	pushq	%rbx (被调用者保护)
	pushq	%rax (返回值)
	movq	%rdx(第三个参数), %rbx (将 第三个参数保存至 %rbx)
	callq	_mult2
	imulq	(%rbx), %rax
	movq	%rax, (%rbx)
	addq	$8, %rsp
	popq	%rbx
  -- 被调用者保存寄存器 %rbp（调用完后恢复该值）
	popq	%rbp
	retq
*/

/**
 * 1. 调用者保存寄存器
 * 2. 被调用者保存寄存器
 * 当函数 A 调用函数 B 时，若函数 B 使用了 函数 A 的值，理论上 A 中的值在调用前后都应保持一致。
 * 策略 1: 调用者保存寄存器，A 进行存值，执行完 B 后，恢复该值
 * 策略 2: 被调用者保存寄存器，B 在使用值之前保存值，使用完之后返回该值
*/

/**
 * 操作码 (movq)
 * 操作数 (%rdi)
 *  1. 立即数 Immediate ($8)
 *  2. 寄存器 Register (%rdi)
 *  3. 内存引用 Memory Reference [(%rdi)]
 */

long mult2(long, long);

// x -> %rdi \  y -> %rsi \ dest -> %rdx
void mulstore(long x, long y, long *dest)
{
  long t = mult2(x, y);
  *dest = t;
}