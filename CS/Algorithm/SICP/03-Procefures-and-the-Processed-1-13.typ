= Exercise 1.13

#import "@preview/ctheorems:1.1.3": *
#show: thmrules.with(qed-symbol: $square$)

#let theorem = thmbox("theorem", "Theorem", fill: rgb("#eeffee"))
#let definition = thmbox("definition", "Definition", fill: rgb("#e8e8f8"))

#let proof = thmproof("proof", "Proof")

#theorem(number: "")[
  Prove that $"Fib"(n)$ is the closest integer to $phi^n \/ sqrt(5)$, where $phi=(1+sqrt(5))\/2$.
]

#proof[
  First we will use induction to prove that

  $ "Fib"(n)=1/sqrt(5)[((1+sqrt(5))/2)^n-((1-sqrt(5))/2)^n] $

  We will use $phi$ to denote $(1+sqrt(5))\/2$ and $psi$ to denote $(1-sqrt(5))\/2$ in inline math environment. For $n=0$, we know $"Fib"(0)=(0-0)\/sqrt(5)=0$. For $n=1$

  $ "Fib"(1)=1/sqrt(5)((1+sqrt(5))/2-(1-sqrt(5))/2)=1 $

  For $k, k>=1, k in NN$, we assume that $"Fib"(n)$ is such the form and so on as $"Fib"(k+1)$, now we want to prove that $"Fib"(k+2)$ is also such form:

  $ 
    "Fib"(k+2)&="Fib"(k+1)+"Fib"(k) \
    &=1/sqrt(5)[((1+sqrt(5))/2)^(k+1)-((1-sqrt(5))/2)^(k+1)]\
    &+1/sqrt(5)[((1+sqrt(5))/2)^k-((1-sqrt(5))/2)^k] \
    &=1/sqrt(5)[((1+sqrt(5))/2)^k ((3+sqrt(5))/2)-((1-sqrt(5))/2)^k ((3-sqrt(5))/2)]\
  $

  Where we know that

  $ (3+sqrt(5))/2=((1+sqrt(5))/2)^2,(3-sqrt(5))/2=((1-sqrt(5))/2)^2 $

  So $"Fib"(k+2)$ is also such form. We have proofed that $"Fib"(n)=(phi^n-psi^n)\/sqrt(5)$. Now we want to prove that $"Fib"(n)$ is the closest integer of $phi^n\/sqrt(5)$. And that's to prove

  $ 1/sqrt(5)abs(((1-sqrt(5))/2)^n)=1/sqrt(5)((sqrt(5)-1)/2)^n < 1/2 $

  And that's easy to prove, because $a_n=(-psi)^n\/sqrt(5)$ is a decreasing geometric sequence. So $a_n <= a_1=-psi\/sqrt(5)$. That's to prove

  $ (5-sqrt(5))/10 < 1/2 $

  It's obviously true. So the proposition holds.
]