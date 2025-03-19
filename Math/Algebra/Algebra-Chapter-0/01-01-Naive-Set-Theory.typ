#import "@preview/ctheorems:1.1.3": *
#show: thmrules.with(qed-symbol: $square$)

#let theorem = thmbox("theorem", "Theorem", fill: rgb("#eeffee"))
#let definition = thmbox("definition", "Definition", fill: rgb("#e8e8f8"))

#let proof = thmproof("proof", "Proof")

= Q1

In naive set theory, any collection of some objects that satisfy some property
can be called a set. Let $R$ be the set of all sets that do not contain themselves.
Then, if $R ∉ R$, then by the definition it must be the case that $R ∈ R$. If
$R ∈ R$, then by the definition it must be the case that $R ∉ R$.

= Q4

Because equivalence relation can be equivalently defined from the partition of this
set. We can only count how many partitions can be found on the set ${1,2,3}$:

$ {{1},{2},{3}}, {{1},{2,3}}, {{1,2},{3}}, {{1,3},{2}}, {{1,2,3}} $

Total 5 partitions, and that is total 5 different equivalence relations.

= Q5

Consider this relation defined on the set ${1,2,3}$:

$ {(1,1),(2,2),(3,3),(1,3),(3,1),(1,2),(2,1)} $

Another example is from #link("https://github.com/hooyuser")[\@Hooy]. For $a,b ∈ ZZ$,
define $a ⋄ b$ to be true if and only if $abs(a - b) <= 1$. It is reflexive, since 
$a ⋄ a = abs(a - a) = 0 <= 1$ for any $a ∈ ZZ$. And it is symmetric, since if
$a ⋄ b = abs(a - b) <= 1$, then $abs(b - a) = abs(a - b) <= 1$, that's $b ⋄ a$. But it
isn't transitive, just consider $1 ⋄ 2$, and $2 ⋄ 3$, but $abs(3 - 1) = 2 > 1$.

= Q6

First we will prove that this relation is an equivalence relation:
+ Reflexive: $∀ a ∈ RR, a - a = 0 ∈ ZZ <=> a ∼ a$;
+ Symmetric: For real number $a,b$, if $a ∼ b <=> a - b = k ∈ ZZ$, then $b - a = -(a - b) = -k
  ∈ ZZ$, so $b ∼ a$;
+ Transitive: For real number $a,b,c$, if $a ∼ b ∧ b ∼ c <=> a - b = k, b - c = l ∈ ZZ$,
  then $a - c = (a - b) + (b - c) = k + l ∈ ZZ$, so $a ∼ c$.

An equivalence class $[a]_∼ ∈ RR \/ ∼$ is the set of integers $ZZ$ plus a real number 
$ϵ ∈ [0, 1)$. That is for every set $X ∈ RR \/ ∼$, there is a real number $ϵ ∈ [0, 1)$ such
that $x ∈ X$ is of the form $k + ϵ$ for some integer $k$.

$RR × RR \/ ≈$ is similar.