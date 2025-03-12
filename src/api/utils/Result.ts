export type Result<T> =
  | { status: "ok"; value: T }
  | { status: "error"; error: string };

export type ResultStatus<T> = Result<T>["status"];

export function ResultOk<T>(value: T): Result<T> {
  return { status: "ok", value };
}

export function ResultError<T>(error: string): Result<T> {
  return { status: "error", error };
}
