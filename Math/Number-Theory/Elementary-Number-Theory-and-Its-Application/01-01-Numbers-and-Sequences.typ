#import "@preview/ctheorems:1.1.3": *
#show: thmrules.with(qed-symbol: $square$)

#let theorem = thmbox("theorem", "Theorem", fill: rgb("#eeffee"))
#let definition = thmbox("definition", "Definition", fill: rgb("#e8e8f8"))

#let proof = thmproof("proof", "Proof")

= Q1

+ Well ordered. Use $S$ to denote the set of integers greater than 3, we will prove that each subset of $S$ is also the subset of $NN$, and that's easy. Notice that $S subset NN$, so

  $ forall R subset S, R subset NN $

  Because $NN$ has the well-ordering property, then every subset of $NN$ has the smallest element. That's to say, each $R$ has a smallest element, so $S$ is well ordered;

+ Well ordered. Same as 1, we only to prove that this set $S$ is the subset of $NN$;
+ Not well ordered. Consider the subset ${q | q in QQ and q > 1}$, this subset has no smallest element.

+ Well ordered. This set can be written as 

  $ S={p | p = a / 2, a in NN} $

  Consider $forall R subset S$, we have $exists R' subset NN$, satisfying $R={p | p = a \/ 2, a in R'}$. Because $NN$ has the well-ordering property, $R'$ has the smallest element $m$, so $R$ also has the smallest $m\/2$. That's to say $S$ is well ordered.

+ Not well ordered. Same as 3, Consider the subset ${q | q in QQ^+union{0} and q > 1}$.

= Q2

#proof[
  
]