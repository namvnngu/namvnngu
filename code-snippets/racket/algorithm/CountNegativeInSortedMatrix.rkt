;; Description: Count Negative Numbers in a Sorted Matrix
;; Source: https://youtu.be/skc7FmE_gj8
;; Date: 04/06/2021

(define (count-negatives . grid)
    (length
    (filter negative?
    (flatten grid))))