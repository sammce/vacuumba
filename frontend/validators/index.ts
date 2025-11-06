export type Validator = (value: string) => boolean;
export type Validators = Record<string, Validator>;
