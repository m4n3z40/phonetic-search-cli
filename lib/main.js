#!/usr/bin/env node


// 1. Read input lines stream

// 2. Turn input lines stream into array of words

// 3. Read command line arguments

// 4. Break words separated by spaces into an array of words

// 5. For each word of the command line arguments, find matches from the input array of words
//    5.1 non-alphabetic chars must be ignored
//    5.2 comparison must NOT be case-sensitive
//    5.3 After first char all the following letters must bee ignored: A, E, I, H, O, U, W, Y
//    5.4 All the follow group of chars are considered equivalents:
//        A, E, I, O, U
//        C, G, J, K, Q, S, X, Y, Z
//        B, F, P, V, W
//        D, T
//        M, N
//        (All others has no equivalents)
//    5.5 Any consecutive occurrence of equivalent chars are considered as an unique occurrence

// 6. Output all the matches in the following format:
// wordFromCl: all, the, matched, word, from, input, stream
"use strict";