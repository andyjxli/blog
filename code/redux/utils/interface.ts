export interface Action {
  type: symbol | string
  [props: string]: any
}
