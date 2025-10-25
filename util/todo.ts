export function TODO(message: string = "Unimplemented error."): never {
  throw new Error(`TODO: ${message}`);
}
