import {ReactText} from 'react';

export type WhcbrType =
  | [ReactText, ReactText, string, string, number]
  | [ReactText, ReactText, string, string]
  | [ReactText[], string, string, number]
  | [ReactText[], string, string]
  | [ReactText, ReactText, string[], number]
  | [ReactText, ReactText, string[]]
  | [ReactText[], string[], number]
  | [ReactText[], string[]];
