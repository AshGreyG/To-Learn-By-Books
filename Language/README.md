It's my personal notes when I study different human languages.

+ Only use two whitespaces to organize the structure.
+ `#` is the title.
+ The beginning part of document should be a yaml content.
    ``` yaml
    language: english
    date: 2025-02-06
    ```
+ `+ [content]` is the list, two whitespaces can indent the list structure:
    ```
    + fountain
      + n.
    ```
+ `-> [word]` means that word is derived or related to the upper word.
    ```
    + fountain
      + ...
    + -> fountainous
    ```
+ `(:- [content] )` is the description of a word.
    ```
    + fountain (:- Doubao)
    ```
+ `[content-1] | [content-2]` in upper content is to separate the different descriptions.
+ `|[word]|` means that word is unfamiliar to me.
+ `[[link]]` is a URL link.
    ```
    + powder (:- [wikipedia.org])
    ```
+ `-[content]-` is an example sentence.
+ `'[content]'` is to emphasize the content.
+ `<[book-name]>` is the name of a book.