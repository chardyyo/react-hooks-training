import { SyntheticEvent, RefObject } from "react";
import { Movie, BaseMovie, RequestParams } from "../types";

export type OnClose = (event: Event | SyntheticEvent) => unknown;
export type ReactDevRef = RefObject<HTMLDivElement>;
export type APIResponse<T> = T extends BaseMovie
  ? Movie
  : T extends RequestParams
  ? Movie[]
  : void;
